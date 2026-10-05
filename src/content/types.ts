export type DrawingId = "control" | "mount" | "fixture" | "hinge";

export type Fulfillment = "DIGITAL" | "PHYSICAL" | "PHYSICAL + DIGITAL";

export type ProductOption = {
  label: string;
  price: number;
  fulfillment: Fulfillment;
  available: boolean;
  shopifyVariantId?: string;
};

export type ShopImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type RedProduct = {
  handle: string;
  productCode: string;
  title: string;
  short: string;
  description: string;
  included: string[];
  processNotes: string;
  revision: string;
  revisionUpdated: string;
  year: string;
  material: string;
  process: string;
  dimensions: string;
  weight: string;
  category: string;
  type: Fulfillment;
  available: boolean;
  options: ProductOption[];
  relatedProjectSlug?: string;
  relatedProductHandles: string[];
  drawing?: DrawingId;
  image?: ShopImage;
  images: ShopImage[];
  currencyCode: string;
  shopifyProductId?: string;
};

export type ProjectRevision = {
  rev: string;
  note: string;
};

export type ProjectFigure = {
  src: string;
  caption: string;
};

export type RedProject = {
  slug: string;
  code: string;
  title: string;
  year: string;
  oneLiner: string;
  role: string;
  process: string;
  material: string;
  status: string;
  featuredSize: "large" | "medium" | "small";
  cover: string;
  gallery: ProjectFigure[];
  problem: string;
  idea: string;
  cad: string;
  prototype: string;
  manufacturing: string;
  result: string;
  revisions: ProjectRevision[];
  relatedProductHandle?: string;
};
