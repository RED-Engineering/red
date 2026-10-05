"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MediaFrame } from "@/components/MediaFrame";
import { RedButton } from "@/components/RedButton";
import { TechnicalMeta } from "@/components/TechnicalMeta";
import { formatPrice } from "@/lib/format";
import { createCheckoutAction } from "@/lib/shopify/checkout-action";
import type { RedProduct } from "@/content/types";

export function ProductInfo({ product }: { product: RedProduct }) {
  const purchasable = product.options.filter((o) => o.price > 0);
  const [selected, setSelected] = useState(purchasable[0]?.label ?? product.options[0]?.label);
  const [activeImage, setActiveImage] = useState(product.image?.url ?? product.images[0]?.url);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const option = useMemo(
    () => product.options.find((o) => o.label === selected) ?? product.options[0],
    [product.options, selected],
  );
  const isQuote = !option || option.price <= 0;
  const specs = [
    { label: "MATERIAL", value: product.material },
    { label: "PROCESS", value: product.process },
    { label: "DIMENSIONS", value: product.dimensions },
    { label: "WEIGHT", value: product.weight },
    { label: "REVISION", value: product.revision },
    { label: "YEAR", value: product.year },
  ].filter((item) => item.value);

  async function buy() {
    if (!option?.shopifyVariantId) {
      setError("This product is not available for Shopify checkout yet.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const cart = await createCheckoutAction([
        { merchandiseId: option.shopifyVariantId, quantity: 1 },
      ]);
      window.location.href = cart.checkoutUrl;
    } catch {
      setError("Checkout could not start. Check the Shopify connection and try again.");
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <MediaFrame src={activeImage} alt={product.image?.alt || product.title} tall />
        {product.images.length > 1 ? (
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.images.map((image) => (
              <button
                key={image.url}
                type="button"
                onClick={() => setActiveImage(image.url)}
                className={`overflow-hidden rounded-[4px] border ${
                  activeImage === image.url ? "border-red" : "border-paper/10"
                }`}
              >
                <MediaFrame src={image.url} alt={image.alt || product.title} compact />
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="lg:col-span-4 lg:col-start-9">
        <div className="flex items-center gap-3">
          <span className="red-led" aria-hidden />
          <p className="tech text-red">{product.productCode.replace("-", " / ")}</p>
        </div>
        <h1 className="mt-5 text-5xl tracking-[-0.055em] md:text-6xl">{product.title}</h1>
        {product.short ? (
          <p className="mt-5 max-w-md text-lg leading-8 text-mist">{product.short}</p>
        ) : null}
        {option ? (
          <p className="mt-8 font-mono text-2xl">
            {isQuote ? "REQUEST QUOTE" : formatPrice(option.price, product.currencyCode)}
          </p>
        ) : null}
        <p className="tech mt-2">
          {product.available && option?.available ? "AVAILABLE" : "CURRENTLY UNAVAILABLE"}
        </p>

        {product.options.length > 0 ? (
          <div className="mt-8 space-y-2 border-t border-paper/10 pt-5">
            {product.options.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setSelected(item.label)}
                className={`flex w-full items-center justify-between rounded-[2px] border px-4 py-3 text-left font-mono text-[11px] tracking-[0.12em] transition-colors ${
                  selected === item.label
                    ? "border-red bg-red/[0.035] text-paper"
                    : "border-paper/10 text-mute hover:border-paper/25"
                }`}
              >
                <span>{item.label}</span>
                <span>{item.price > 0 ? formatPrice(item.price, product.currencyCode) : "QUOTE"}</span>
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-6">
          {isQuote ? (
            <RedButton href="/contact">REQUEST ENGINEERING</RedButton>
          ) : (
            <RedButton
              disabled={!product.available || !option?.available || busy || !option?.shopifyVariantId}
              onClick={() => void buy()}
            >
              {busy ? "OPENING SHOPIFY" : "BUY ON SHOPIFY"}
            </RedButton>
          )}
          <p className="tech mt-3">Checkout is handled by Shopify.</p>
          {error ? <p className="mt-3 font-mono text-[12px] text-red">{error}</p> : null}
        </div>

        {specs.length > 0 ? (
          <div className="mt-12 border-t border-paper/10 pt-6">
            <TechnicalMeta items={specs} />
          </div>
        ) : null}

        {product.relatedProjectSlug && (
          <p className="mt-10 border-t border-paper/15 pt-6">
            <span className="tech block">DESIGN STORY</span>
            <Link href={`/work/${product.relatedProjectSlug}`} className="mt-2 inline-block hover:text-red">
              SEE HOW THIS WAS MADE →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
