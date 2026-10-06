import type { Metadata } from "next";
import { ShopCatalog } from "@/components/ShopCatalog";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description: "CAD files, manufactured parts, and free downloads from RED.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="relative min-h-[80vh] overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,49,49,0.14),transparent_36%),radial-gradient(circle_at_88%_18%,rgba(241,238,230,0.06),transparent_32%)]" />
      <div className="shell relative pt-32 pb-28">
        <ShopCatalog products={products} />
      </div>
    </div>
  );
}
