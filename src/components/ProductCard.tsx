import Link from "next/link";
import { MediaFrame } from "@/components/MediaFrame";
import { formatPrice } from "@/lib/format";
import type { RedProduct } from "@/content/types";

export function ProductCard({ product }: { product: RedProduct }) {
  const priced = product.options.filter((o) => o.price > 0);
  const physical = priced.find((o) => o.fulfillment === "PHYSICAL");
  const display = physical ?? priced[0];
  const from =
    priced.length > 1 &&
    Math.min(...priced.map((o) => o.price)) !== Math.max(...priced.map((o) => o.price));

  return (
    <article>
      <Link href={`/products/${product.handle}`} className="group block">
        <div className="relative overflow-hidden rounded-[8px] shadow-[0_28px_65px_rgba(0,0,0,0.18)]">
          <MediaFrame src={product.image?.url} alt={product.image?.alt || product.title} />
          <span className="absolute top-5 right-5 rounded-[2px] bg-red px-2 py-1 font-mono text-[8px] tracking-[0.15em] text-warm-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            OPEN
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="tech text-red">{product.productCode.replace("-", " / ")}</p>
            <h3 className="mt-2 text-2xl tracking-[-0.035em] transition-transform duration-300 group-hover:translate-x-1">
              {product.title}
            </h3>
            <p className="tech mt-2">{product.type}</p>
          </div>
          <p className="text-right font-mono text-sm">
            {!product.available || !display ? (
              "UNAVAILABLE"
            ) : (
              <>
                {from ? <span className="tech block text-mute">FROM</span> : null}
                {formatPrice(
                  from ? Math.min(...priced.map((o) => o.price)) : display.price,
                  product.currencyCode,
                )}
              </>
            )}
          </p>
        </div>
      </Link>
    </article>
  );
}
