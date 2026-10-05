import type { RedProduct } from "@/content/types";
import {
  fetchShopifyProduct,
  fetchShopifyProducts,
  isShopifyConfigured,
} from "@/lib/shopify";

export async function getProducts(): Promise<RedProduct[]> {
  if (!isShopifyConfigured()) return [];
  try {
    return await fetchShopifyProducts();
  } catch (error) {
    console.error("Shopify products unavailable.", error);
    return [];
  }
}

export async function getProduct(handle: string) {
  if (!isShopifyConfigured()) return null;
  try {
    return (await fetchShopifyProduct(handle)) ?? null;
  } catch (error) {
    console.error("Shopify product unavailable.", error);
    return null;
  }
}

export async function getFeaturedProduct() {
  const products = await getProducts();
  return products[0] ?? null;
}
