import type { RedProduct } from "@/content/types";
import {
  getFreeProduct,
  getFreeProductEntries,
  shopifyHandleForFree,
  toFreeProduct,
} from "@/content/free-products";
import { typeFromOptions } from "@/lib/product-options";
import {
  fetchShopifyProduct,
  fetchShopifyProducts,
  isShopifyConfigured,
} from "@/lib/shopify";

async function shopifyProducts(): Promise<RedProduct[]> {
  if (!isShopifyConfigured()) return [];
  try {
    return await fetchShopifyProducts();
  } catch (error) {
    console.error("Shopify products unavailable.", error);
    return [];
  }
}

function attachPhysical(free: RedProduct, shop?: RedProduct): RedProduct {
  if (!shop) return free;
  const physical = shop.options.filter(
    (option) =>
      option.fulfillment === "PHYSICAL" || option.fulfillment === "PHYSICAL + DIGITAL",
  );
  const options = [...free.options, ...physical];
  return {
    ...free,
    shopifyProductId: shop.shopifyProductId,
    currencyCode: shop.currencyCode || free.currencyCode,
    images: free.images.length ? free.images : shop.images,
    image: free.image ?? shop.image,
    glb: free.glb ?? shop.glb,
    material: free.material || shop.material,
    process: free.process || shop.process,
    dimensions: free.dimensions || shop.dimensions,
    weight: free.weight || shop.weight,
    revision: free.revision || shop.revision,
    year: free.year || shop.year,
    options,
    type: typeFromOptions(options),
    available: options.some((option) => option.available),
  };
}

export async function getProducts(): Promise<RedProduct[]> {
  const paid = await shopifyProducts();
  const byHandle = new Map(paid.map((product) => [product.handle, product]));
  const taken = new Set<string>();
  const free = getFreeProductEntries().map((entry) => {
    const shopHandle = entry.shopifyHandle ?? entry.handle;
    const shop = byHandle.get(shopHandle);
    if (shop) taken.add(shop.handle);
    return attachPhysical(toFreeProduct(entry), shop);
  });
  return [...paid.filter((product) => !taken.has(product.handle)), ...free];
}

export async function getProduct(handle: string) {
  const paid = isShopifyConfigured()
    ? await fetchShopifyProduct(handle).catch((error) => {
        console.error("Shopify product unavailable.", error);
        return null;
      })
    : null;

  const free = getFreeProduct(handle);
  if (free) {
    const linked = shopifyHandleForFree(handle);
    const shop =
      (paid && paid.handle === (linked ?? handle) ? paid : null) ??
      (linked && linked !== handle
        ? await fetchShopifyProduct(linked).catch(() => null)
        : paid);
    return attachPhysical(free, shop ?? undefined);
  }

  return paid;
}

export async function getFeaturedProduct() {
  const products = await getProducts();
  return products[0] ?? null;
}
