"use server";

import { createShopifyCheckout, isShopifyConfigured } from "@/lib/shopify";

export async function createCheckoutAction(
  lines: { merchandiseId: string; quantity: number }[],
) {
  if (!isShopifyConfigured()) {
    throw new Error("Shopify is not configured.");
  }
  return createShopifyCheckout(lines);
}
