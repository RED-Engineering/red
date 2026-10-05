import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductInfo } from "@/components/ProductInfo";
import { getProduct, getProducts } from "@/lib/catalog";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Product" };
  return {
    title: product.title,
    description: product.short,
    alternates: { canonical: `/products/${product.handle}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();
  const related = (await getProducts()).filter(
    (item) =>
      item.handle !== product.handle &&
      (product.relatedProductHandles.includes(item.handle) ||
        product.relatedProductHandles.length === 0),
  ).slice(0, 2);

  return (
    <>
      <div className="shell py-16 md:py-24">
        <ProductInfo product={product} />
      </div>

      {(product.included.length > 0 || product.processNotes || product.revision) && (
        <div className="surface-light material-noise py-20 md:py-28">
          <div className="shell">
            {product.included.length > 0 ? (
              <section className="grid gap-10 border-t border-black/15 pt-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="tech text-red">SPECIFICATION / 01</p>
                  <h2 className="mt-3 text-3xl tracking-[-0.035em]">WHAT’S INCLUDED</h2>
                </div>
                <ul className="lg:col-span-8">
                  {product.included.map((item) => (
                    <li key={item} className="border-b border-black/15 py-4 font-mono text-[12px] tracking-[0.14em]">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {product.processNotes ? (
              <section className="mt-20 grid gap-10 border-t border-black/15 pt-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="tech text-red">MANUFACTURING / 02</p>
                  <h2 className="mt-3 text-3xl tracking-[-0.035em]">PROCESS</h2>
                </div>
                <p className="max-w-2xl text-xl leading-9 text-[#625e57] lg:col-span-8">
                  {product.processNotes}
                </p>
              </section>
            ) : null}

            {product.revision ? (
              <section className="mt-20 grid gap-4 border-t border-black/15 pt-10 lg:grid-cols-12">
                <h2 className="text-3xl tracking-[-0.035em] lg:col-span-4">REVISION</h2>
                <p className="font-mono text-sm tracking-[0.14em] lg:col-span-8">
                  <span className="text-red">{product.revision}</span>
                  {product.revisionUpdated ? (
                    <span className="ml-6 text-[#69655e]">UPDATED {product.revisionUpdated}</span>
                  ) : null}
                </p>
              </section>
            ) : null}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <section className="surface-graphite py-20 md:py-28">
          <div className="shell">
            <h2 className="tech mb-8 text-red">RELATED PRODUCTS</h2>
            <div className="grid gap-10 md:grid-cols-2">
              {related.map((item) => (
                <ProductCard key={item.handle} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="shell py-10">
        <Link href="/products" className="tech link-line inline-block py-2 hover:text-red">
          ← SHOP
        </Link>
      </div>
    </>
  );
}
