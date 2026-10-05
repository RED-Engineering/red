import type { RedProduct } from "@/content/types";

export type ShopifyCartLineInput = {
  merchandiseId: string;
  quantity: number;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
};

const API_VERSION = "2025-01";

export function isShopifyConfigured() {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN &&
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  );
}

async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { revalidate?: number; cache?: RequestCache },
): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) {
    throw new Error("Shopify Storefront API is not configured.");
  }

  const response = await fetch(
    `https://${domain}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
      cache: options?.cache,
      next: options?.revalidate === undefined ? undefined : { revalidate: options.revalidate },
    },
  );

  if (!response.ok) {
    throw new Error(`Shopify request failed (${response.status}).`);
  }

  const json = (await response.json()) as {
    data: T;
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  return json.data;
}

type MetafieldKey =
  | "material"
  | "process"
  | "revision"
  | "year"
  | "dimensions"
  | "product_type"
  | "weight"
  | "code";

const PRODUCTS_QUERY = /* GraphQL */ `
  query RedProducts {
    products(first: 50) {
      nodes {
        id
        handle
        title
        description
        availableForSale
        productType
        tags
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 20) {
          nodes {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
        featuredImage {
          url
          altText
          width
          height
        }
        images(first: 8) {
          nodes {
            url
            altText
            width
            height
          }
        }
        metafields(
          identifiers: [
            { namespace: "custom", key: "material" }
            { namespace: "custom", key: "process" }
            { namespace: "custom", key: "revision" }
            { namespace: "custom", key: "year" }
            { namespace: "custom", key: "dimensions" }
            { namespace: "custom", key: "product_type" }
            { namespace: "custom", key: "weight" }
            { namespace: "custom", key: "code" }
          ]
        ) {
          key
          value
        }
      }
    }
  }
`;

const CART_CREATE = /* GraphQL */ `
  mutation RedCartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  productType: string;
  tags: string[];
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: {
    nodes: {
      id: string;
      title: string;
      availableForSale: boolean;
      price: { amount: string; currencyCode: string };
    }[];
  };
  featuredImage: ShopifyImage | null;
  images: { nodes: ShopifyImage[] };
  metafields: ({ key: string; value: string } | null)[];
};

function meta(
  nodes: ShopifyProductNode["metafields"],
  key: MetafieldKey,
) {
  return nodes.find((m) => m?.key === key)?.value ?? "";
}

function toImage(image: ShopifyImage | null | undefined): RedProduct["image"] {
  if (!image?.url) return undefined;
  return {
    url: image.url,
    alt: image.altText ?? "",
    width: image.width ?? 1600,
    height: image.height ?? 1200,
  };
}

export function mapShopifyProduct(node: ShopifyProductNode): RedProduct {
  const code = meta(node.metafields, "code") || node.handle.toUpperCase();
  const typeValue = (meta(node.metafields, "product_type") ||
    node.productType ||
    "PHYSICAL") as RedProduct["type"];
  const images = node.images.nodes.map(toImage).filter((image): image is NonNullable<typeof image> => Boolean(image));
  const image = toImage(node.featuredImage) ?? images[0];
  const description = node.description.trim();

  return {
    handle: node.handle,
    productCode: code,
    title: node.title,
    short: description ? `${description.split(".")[0]}.` : node.title,
    description,
    included: node.tags.filter((t) =>
      ["STEP", "STL", "DXF", "PDF", "PDF DRAWING"].includes(t.toUpperCase()),
    ),
    processNotes: meta(node.metafields, "process"),
    revision: meta(node.metafields, "revision"),
    revisionUpdated: meta(node.metafields, "year"),
    year: meta(node.metafields, "year"),
    material: meta(node.metafields, "material"),
    process: meta(node.metafields, "process"),
    dimensions: meta(node.metafields, "dimensions"),
    weight: meta(node.metafields, "weight"),
    category: "OBJECT",
    type:
      typeValue === "DIGITAL" ||
      typeValue === "PHYSICAL" ||
      typeValue === "PHYSICAL + DIGITAL"
        ? typeValue
        : "PHYSICAL",
    available: node.availableForSale,
    image,
    images,
    currencyCode: node.priceRange.minVariantPrice.currencyCode || "EUR",
    shopifyProductId: node.id,
    relatedProductHandles: [],
    options: node.variants.nodes.map((v) => ({
      label: v.title === "Default Title" ? "STANDARD" : v.title.toUpperCase(),
      price: Number.parseFloat(v.price.amount),
      fulfillment:
        v.title.toLowerCase().includes("digital") ? "DIGITAL" : "PHYSICAL",
      available: v.availableForSale,
      shopifyVariantId: v.id,
    })),
  };
}

export async function fetchShopifyProducts(): Promise<RedProduct[]> {
  const data = await storefrontFetch<{ products: { nodes: ShopifyProductNode[] } }>(
    PRODUCTS_QUERY,
    undefined,
    { revalidate: 60 },
  );
  return data.products.nodes.map(mapShopifyProduct);
}

export async function fetchShopifyProduct(handle: string) {
  const products = await fetchShopifyProducts();
  return products.find((p) => p.handle === handle) ?? null;
}

export async function createShopifyCheckout(
  lines: ShopifyCartLineInput[],
): Promise<ShopifyCart> {
  const data = await storefrontFetch<{
    cartCreate: {
      cart: ShopifyCart | null;
      userErrors: { message: string }[];
    };
  }>(CART_CREATE, { lines }, { cache: "no-store" });

  if (data.cartCreate.userErrors.length || !data.cartCreate.cart) {
    throw new Error(
      data.cartCreate.userErrors.map((e) => e.message).join("; ") ||
        "Could not create checkout.",
    );
  }

  return data.cartCreate.cart;
}
