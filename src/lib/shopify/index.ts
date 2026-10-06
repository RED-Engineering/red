import type { Fulfillment, RedProduct } from "@/content/types";
import { mapVariantTitle, typeFromOptions } from "@/lib/product-options";

export type ShopifyCartLineInput = {
  merchandiseId: string;
  quantity: number;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
};

const API_VERSION = "2025-01";

function shopDomain() {
  return (
    process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/$/, "") ??
    ""
  );
}

function hasStorefrontToken() {
  return Boolean(process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

export function isShopifyConfigured() {
  return Boolean(shopDomain());
}

function variantNumericId(id: string) {
  return id.match(/(\d+)$/)?.[1] ?? id;
}

async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { revalidate?: number; cache?: RequestCache },
): Promise<T> {
  const domain = shopDomain();
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
  | "code"
  | "glb";

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
        media(first: 12) {
          nodes {
            mediaContentType
            ... on Model3d {
              sources {
                url
                format
                mimeType
              }
            }
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
            { namespace: "custom", key: "glb" }
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

type ShopifyMediaNode = {
  mediaContentType?: string;
  sources?: { url: string; format?: string | null; mimeType?: string | null }[];
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
  media?: { nodes: ShopifyMediaNode[] };
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

function productFallbackType(productType: string, metafieldType: string): Fulfillment {
  const value = (metafieldType || productType || "").toUpperCase();
  if (value === "DIGITAL" || value.includes("CAD") || value.includes("FILE")) return "DIGITAL";
  if (value === "PHYSICAL + DIGITAL" || value.includes("BOTH")) return "PHYSICAL + DIGITAL";
  return "PHYSICAL";
}

function glbFromProduct(node: ShopifyProductNode) {
  const fromMeta = meta(node.metafields, "glb");
  if (fromMeta) return fromMeta;
  for (const media of node.media?.nodes ?? []) {
    const source = media.sources?.find((item) => {
      const format = (item.format ?? "").toLowerCase();
      const mime = (item.mimeType ?? "").toLowerCase();
      const url = item.url.toLowerCase();
      return format.includes("glb") || mime.includes("gltf") || url.endsWith(".glb");
    });
    if (source?.url) return source.url;
  }
  return undefined;
}

export function mapShopifyProduct(node: ShopifyProductNode): RedProduct {
  const code = meta(node.metafields, "code") || node.handle.toUpperCase();
  const fallback = productFallbackType(node.productType, meta(node.metafields, "product_type"));
  const images = node.images.nodes.map(toImage).filter((image): image is NonNullable<typeof image> => Boolean(image));
  const image = toImage(node.featuredImage) ?? images[0];
  const description = node.description.trim();
  const options = node.variants.nodes.map((v) => {
    const mapped = mapVariantTitle(v.title, fallback);
    return {
      label: mapped.label,
      price: Number.parseFloat(v.price.amount),
      fulfillment: mapped.fulfillment,
      available: v.availableForSale,
      shopifyVariantId: v.id,
    };
  });

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
    type: typeFromOptions(options),
    source: "shopify",
    available: node.availableForSale,
    image,
    images,
    glb: glbFromProduct(node),
    currencyCode: node.priceRange.minVariantPrice.currencyCode || "EUR",
    shopifyProductId: node.id,
    relatedProductHandles: [],
    options,
  };
}

type PublicShopifyProduct = {
  id: number;
  handle: string;
  title: string;
  body_html: string | null;
  product_type: string;
  tags: string | string[];
  images: { src: string; alt?: string | null; width?: number; height?: number }[];
  variants: {
    id: number;
    title: string;
    price: string;
    available: boolean;
    sku: string | null;
  }[];
};

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

async function fetchPublicShopifyProducts(): Promise<RedProduct[]> {
  const domain = shopDomain();
  if (!domain) return [];

  const [catalogRes, metaRes] = await Promise.all([
    fetch(`https://${domain}/products.json`, { next: { revalidate: 60 } }),
    fetch(`https://${domain}/meta.json`, { next: { revalidate: 3600 } }),
  ]);

  if (!catalogRes.ok) {
    throw new Error(`Shopify catalog failed (${catalogRes.status}).`);
  }

  const catalog = (await catalogRes.json()) as { products: PublicShopifyProduct[] };
  const meta = metaRes.ok
    ? ((await metaRes.json()) as { currency?: string })
    : {};
  const currencyCode = meta.currency || "EUR";

  return catalog.products.map((product) => {
    const description = stripHtml(product.body_html ?? "");
    const tags = Array.isArray(product.tags)
      ? product.tags
      : product.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
    const images = product.images
      .map((image) =>
        image.src
          ? {
              url: image.src,
              alt: image.alt ?? product.title,
              width: image.width ?? 1600,
              height: image.height ?? 1200,
            }
          : undefined,
      )
      .filter((image): image is NonNullable<typeof image> => Boolean(image));
    const sku = product.variants.find((variant) => variant.sku)?.sku;
    const digitalHint =
      product.handle.toLowerCase().includes("digital") ||
      (product.product_type ?? "").toLowerCase().includes("digital") ||
      tags.some((tag) => ["STEP", "STL", "DXF", "CAD"].includes(tag.toUpperCase()));
    const fallback = productFallbackType(
      product.product_type || (digitalHint ? "DIGITAL" : ""),
      "",
    );
    const options = product.variants.map((variant) => {
      const mapped = mapVariantTitle(variant.title, fallback);
      return {
        label: mapped.label,
        price: Number.parseFloat(variant.price),
        fulfillment: mapped.fulfillment,
        available: variant.available,
        shopifyVariantId: `gid://shopify/ProductVariant/${variant.id}`,
      };
    });
    const glb = images.find((image) => image.url.toLowerCase().includes(".glb"))?.url;

    return {
      handle: product.handle,
      productCode: sku || product.handle.toUpperCase(),
      title: product.title,
      short: description ? `${description.split(".")[0]}.` : product.title,
      description,
      included: tags.filter((tag) =>
        ["STEP", "STL", "DXF", "PDF", "PDF DRAWING"].includes(tag.toUpperCase()),
      ),
      processNotes: "",
      revision: "",
      revisionUpdated: "",
      year: "",
      material: "",
      process: "",
      dimensions: "",
      weight: "",
      category: "OBJECT",
      type: typeFromOptions(options),
      source: "shopify" as const,
      available: product.variants.some((variant) => variant.available),
      image: images[0],
      images,
      glb,
      currencyCode,
      shopifyProductId: `gid://shopify/Product/${product.id}`,
      relatedProductHandles: [],
      options,
    };
  });
}

export async function fetchShopifyProducts(): Promise<RedProduct[]> {
  if (hasStorefrontToken()) {
    const data = await storefrontFetch<{ products: { nodes: ShopifyProductNode[] } }>(
      PRODUCTS_QUERY,
      undefined,
      { revalidate: 60 },
    );
    return data.products.nodes.map(mapShopifyProduct);
  }
  return fetchPublicShopifyProducts();
}

export async function fetchShopifyProduct(handle: string) {
  const products = await fetchShopifyProducts();
  return products.find((p) => p.handle === handle) ?? null;
}

function permalinkCheckout(lines: ShopifyCartLineInput[]): ShopifyCart {
  const domain = shopDomain();
  if (!domain || !lines.length) {
    throw new Error("Shopify is not configured.");
  }
  const cart = lines
    .map((line) => `${variantNumericId(line.merchandiseId)}:${line.quantity}`)
    .join(",");
  return {
    id: "permalink",
    checkoutUrl: `https://${domain}/cart/${cart}`,
  };
}

export async function createShopifyCheckout(
  lines: ShopifyCartLineInput[],
): Promise<ShopifyCart> {
  if (!hasStorefrontToken()) {
    return permalinkCheckout(lines);
  }

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
