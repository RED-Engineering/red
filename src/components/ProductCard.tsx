import Link from "next/link";
import { MediaFrame } from "@/components/MediaFrame";
import { formatPrice } from "@/lib/format";
import { hasFreeFile } from "@/lib/product-options";
import type { RedProduct } from "@/content/types";

export function ProductCard({
  product,
  layout = "stack",
}: {
  product: RedProduct;
  layout?: "stack" | "brick";
}) {
  const freeFile = hasFreeFile(product.options);
  const priced = product.options.filter((o) => o.price > 0);
  const display = priced.find((o) => o.fulfillment === "PHYSICAL") ?? priced[0];
  const from =
    priced.length > 1 &&
    Math.min(...priced.map((o) => o.price)) !== Math.max(...priced.map((o) => o.price));
  const price =
    freeFile && !display
      ? "FREE"
      : !product.available || !display
        ? "—"
        : `${from || freeFile ? "FROM " : ""}${formatPrice(
            from ? Math.min(...priced.map((o) => o.price)) : display.price,
            product.currencyCode,
          )}`;
  const brick = layout === "brick";

  return (
    <article>
      <Link href={`/products/${product.handle}`} className="group block">
        <div
          className={`glass-media relative overflow-hidden transition-[border-color,background-color] duration-300 ${
            brick ? "rounded-[2px]" : "rounded-[8px]"
          }`}
        >
          <MediaFrame
            tight
            src={product.image?.url}
            alt={product.image?.alt || product.title}
            className={brick ? "rounded-[inherit]" : "rounded-[8px]"}
            sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
          />
          {brick ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent px-4 pt-16 pb-4">
              <h3 className="text-xl tracking-[-0.03em]">{product.title}</h3>
              <p className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-mist">{price}</p>
            </div>
          ) : null}
        </div>
        {brick ? null : (
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <h3 className="text-xl tracking-[-0.03em]">{product.title}</h3>
            <p className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-mist">{price}</p>
          </div>
        )}
      </Link>
    </article>
  );
}
