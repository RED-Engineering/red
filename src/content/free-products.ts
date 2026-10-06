import type { RedProduct, ShopImage } from "@/content/types";

export type FreeProductEntry = {
  handle: string;
  productCode: string;
  title: string;
  short: string;
  description: string;
  included?: string[];
  material?: string;
  process?: string;
  dimensions?: string;
  revision?: string;
  year?: string;
  images: ShopImage[];
  glb?: string;
  downloadName: string;
  downloadPath: string;
  downloadUrl?: string;
  /** Shopify handle for the paid physical version. Defaults to `handle`. */
  shopifyHandle?: string;
};

const entries: FreeProductEntry[] = [
  // {
  //   handle: "example-bracket",
  //   shopifyHandle: "example-bracket",
  //   productCode: "FREE / 01",
  //   title: "EXAMPLE BRACKET",
  //   short: "A free CAD file, with a manufactured part on Shopify.",
  //   description: "Download the file here. Buy the physical part through Shopify.",
  //   images: [
  //     { url: "/shop/free/example-bracket/01.jpg", alt: "Example bracket", width: 1600, height: 1200 },
  //   ],
  //   glb: "/shop/free/example-bracket/preview.glb",
  //   downloadName: "example-bracket.zip",
  //   downloadPath: "example-bracket/package.zip",
  // },
];

export function getFreeProductEntries() {
  return entries;
}

export function toFreeProduct(entry: FreeProductEntry): RedProduct {
  const image = entry.images[0];
  return {
    handle: entry.handle,
    productCode: entry.productCode,
    title: entry.title,
    short: entry.short,
    description: entry.description,
    included: entry.included ?? [],
    processNotes: "",
    revision: entry.revision ?? "",
    revisionUpdated: "",
    year: entry.year ?? "",
    material: entry.material ?? "",
    process: entry.process ?? "",
    dimensions: entry.dimensions ?? "",
    weight: "",
    category: "OBJECT",
    type: "FREE",
    source: "red",
    available: true,
    options: [
      {
        label: "FREE FILE",
        price: 0,
        fulfillment: "FREE",
        available: true,
      },
    ],
    relatedProductHandles: [],
    image,
    images: entry.images,
    glb: entry.glb,
    downloadName: entry.downloadName,
    downloadPath: entry.downloadPath,
    downloadUrl: entry.downloadUrl,
    currencyCode: "RON",
  };
}

export function getFreeProducts(): RedProduct[] {
  return entries.map(toFreeProduct);
}

export function getFreeProduct(handle: string) {
  const entry = entries.find(
    (item) => item.handle === handle || item.shopifyHandle === handle,
  );
  return entry ? toFreeProduct(entry) : null;
}

export function shopifyHandleForFree(handle: string) {
  const entry = entries.find(
    (item) => item.handle === handle || item.shopifyHandle === handle,
  );
  return entry?.shopifyHandle ?? entry?.handle;
}
