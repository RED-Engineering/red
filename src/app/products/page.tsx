import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/catalog";
import { isShopifyConfigured } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Shop",
  description: "Physical objects and digital CAD packages from RED. Checkout through Shopify.",
};

export default async function ProductsPage() {
  const configured = isShopifyConfigured();
  const products = await getProducts();
  const [featured, ...rest] = products;

  return (
    <>
      <header className="surface-dark border-b border-paper/10">
        <div className="shell grid gap-10 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="tech text-red">INDEX / SHOP</p>
            <h1 className="section-title mt-5">SHOP.</h1>
          </div>
          <p className="self-end text-lg leading-8 text-mist lg:col-span-3 lg:col-start-10">
            Products, prices and checkout come from Shopify.
          </p>
        </div>
      </header>

      {!configured ? (
        <section className="surface-light py-20 md:py-28">
          <div className="shell max-w-xl">
            <p className="text-lg leading-8 text-[#625e57]">
              Add <span className="text-ink">SHOPIFY_STORE_DOMAIN</span> and{" "}
              <span className="text-ink">SHOPIFY_STOREFRONT_ACCESS_TOKEN</span> to{" "}
              <span className="text-ink">.env.local</span>, then restart the site. Published Shopify
              products will appear here.
            </p>
          </div>
        </section>
      ) : products.length === 0 ? (
        <section className="surface-light py-20 md:py-28">
          <div className="shell max-w-xl">
            <p className="text-lg leading-8 text-[#625e57]">
              No products are published in Shopify yet.
            </p>
          </div>
        </section>
      ) : (
        <>
          {featured ? (
            <section className="surface-light material-noise py-20 md:py-28">
              <div className="shell grid items-end gap-12 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <ProductCard product={featured} />
                </div>
                <div className="lg:col-span-3 lg:col-start-10">
                  {featured.revision ? (
                    <p className="tech text-red">FEATURED / {featured.revision}</p>
                  ) : (
                    <p className="tech text-red">FEATURED</p>
                  )}
                  <h2 className="mt-4 text-4xl tracking-[-0.045em]">{featured.title}</h2>
                  {featured.description ? (
                    <p className="mt-5 leading-7 text-[#625e57]">{featured.description}</p>
                  ) : null}
                </div>
              </div>
            </section>
          ) : null}

          {rest.length > 0 ? (
            <section className="surface-graphite py-20 md:py-28">
              <div className="shell">
                <div className="mb-12 flex items-end justify-between border-b border-paper/10 pb-5">
                  <h2 className="text-3xl tracking-[-0.04em]">
                    CATALOG / {String(products.length).padStart(2, "0")}
                  </h2>
                </div>
                <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
                  {rest.map((product, index) => (
                    <div key={product.handle} className={index % 2 ? "md:mt-24" : ""}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </>
      )}
    </>
  );
}
