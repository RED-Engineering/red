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
      <div className="shell pt-28 pb-12 md:pt-36 md:pb-16">
        <ProductInfo product={product} />
      </div>

      {(product.included.length > 0 || product.processNotes || product.revision) && (
        <div className="shell grid gap-3 pb-8">
          {product.included.length > 0 ? (
            <section className="glass-media rounded-[8px] p-6 md:p-8">
              <p className="font-display text-lg font-bold text-red">01</p>
              <h2 className="mt-4 text-3xl tracking-[-0.035em]">What’s included</h2>
              <ul className="mt-6 divide-y divide-paper/10">
                {product.included.map((item) => (
                  <li key={item} className="py-4 font-mono text-[12px] tracking-[0.12em] text-mist">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {product.processNotes ? (
            <section className="glass-media rounded-[8px] p-6 md:p-8">
              <p className="font-display text-lg font-bold text-red">02</p>
              <h2 className="mt-4 text-3xl tracking-[-0.035em]">Process</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-mist">{product.processNotes}</p>
            </section>
          ) : null}

          {product.revision ? (
            <section className="glass-media rounded-[8px] p-6 md:p-8">
              <p className="font-display text-lg font-bold text-red">03</p>
              <h2 className="mt-4 text-3xl tracking-[-0.035em]">Revision</h2>
              <p className="mt-4 font-mono text-sm tracking-[0.14em]">
                <span className="text-red">{product.revision}</span>
                {product.revisionUpdated ? (
                  <span className="ml-6 text-mist">UPDATED {product.revisionUpdated}</span>
                ) : null}
              </p>
            </section>
          ) : null}
        </div>
      )}

      {related.length > 0 && (
        <section className="shell py-12 md:py-16">
          <h2 className="text-4xl tracking-[-0.04em]">Also in the shop.</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <ProductCard key={item.handle} product={item} />
            ))}
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
