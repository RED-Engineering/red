"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ProductViewer } from "@/components/ProductViewer";
import { RedButton } from "@/components/RedButton";
import { TechnicalMeta } from "@/components/TechnicalMeta";
import { formatPrice } from "@/lib/format";
import { hasFreeFile } from "@/lib/product-options";
import { createCheckoutAction } from "@/lib/shopify/checkout-action";
import type { RedProduct } from "@/content/types";

export function ProductInfo({ product }: { product: RedProduct }) {
  const offersFreeFile = hasFreeFile(product.options);
  const purchasable = product.options.filter((o) => o.price > 0);
  const [selected, setSelected] = useState(
    product.options[0]?.label ?? purchasable[0]?.label,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [claimed, setClaimed] = useState(false);
  const option = useMemo(
    () => product.options.find((o) => o.label === selected) ?? product.options[0],
    [product.options, selected],
  );
  const optionIsFree = option?.fulfillment === "FREE";
  const isQuote = !optionIsFree && (!option || option.price <= 0);
  const specs = [
    { label: "MATERIAL", value: product.material },
    { label: "PROCESS", value: product.process },
    { label: "DIMENSIONS", value: product.dimensions },
    { label: "WEIGHT", value: product.weight },
    { label: "REVISION", value: product.revision },
    { label: "YEAR", value: product.year },
  ].filter((item) => item.value);

  useEffect(() => {
    if (!offersFreeFile) return;
    let cancelled = false;
    void fetch(`/api/free/status?handle=${encodeURIComponent(product.handle)}`)
      .then((response) => response.json())
      .then((data: { claimed?: boolean }) => {
        if (!cancelled && data.claimed) setClaimed(true);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [offersFreeFile, product.handle]);

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

  async function claim(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/free/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, handle: product.handle }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error || "The email could not be saved.");
        setBusy(false);
        return;
      }
      setClaimed(true);
    } catch {
      setError("The email could not be saved. Try again.");
    }
    setBusy(false);
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <ProductViewer
          title={product.title}
          images={product.images.length ? product.images : product.image ? [product.image] : []}
          glb={product.glb}
        />
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
            {optionIsFree
              ? "FREE"
              : isQuote
                ? "REQUEST QUOTE"
                : formatPrice(option.price, product.currencyCode)}
          </p>
        ) : null}
        <p className="tech mt-2">
          {product.available && option?.available ? "AVAILABLE" : "CURRENTLY UNAVAILABLE"}
        </p>

        {product.options.length > 1 ? (
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
                <span>
                  {item.fulfillment === "FREE"
                    ? "FREE"
                    : item.price > 0
                      ? formatPrice(item.price, product.currencyCode)
                      : "QUOTE"}
                </span>
              </button>
            ))}
          </div>
        ) : product.options.length === 1 ? (
          <p className="tech mt-6 text-mist">{product.options[0].label}</p>
        ) : null}

        <div className="mt-6">
          {optionIsFree ? (
            claimed ? (
              <>
                <RedButton href={`/api/free/download?handle=${encodeURIComponent(product.handle)}`}>
                  DOWNLOAD FILE
                </RedButton>
                <p className="tech mt-3">The file is ready on this device.</p>
              </>
            ) : (
              <form onSubmit={(event) => void claim(event)} className="space-y-3">
                <label className="block">
                  <span className="tech text-mist">EMAIL</span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-2 h-12 w-full rounded-[2px] border border-paper/15 bg-ink px-4 font-mono text-[12px] tracking-[0.06em] text-paper outline-none focus:border-red"
                    placeholder="you@studio.com"
                  />
                </label>
                <RedButton type="submit" disabled={busy || !product.available}>
                  {busy ? "SAVING" : "GET THE FILE"}
                </RedButton>
                <p className="tech text-mist">Email is stored only for this download.</p>
              </form>
            )
          ) : isQuote ? (
            <RedButton href="/contact">REQUEST ENGINEERING</RedButton>
          ) : (
            <>
              <RedButton
                disabled={!product.available || !option?.available || busy || !option?.shopifyVariantId}
                onClick={() => void buy()}
              >
                {busy ? "OPENING SHOPIFY" : "BUY ON SHOPIFY"}
              </RedButton>
              <p className="tech mt-3">Paid files and parts check out through Shopify.</p>
            </>
          )}
          {error ? <p className="mt-3 font-mono text-[12px] text-red">{error}</p> : null}
        </div>

        <p className="mt-8 max-w-sm border-t border-paper/10 pt-6 text-sm leading-6 text-mist">
          Need a different size, material, or fit?{" "}
          <Link href="/contact" className="text-paper underline decoration-red/70 underline-offset-4 hover:text-red">
            Tell us what the part has to do — we&apos;ll make that version.
          </Link>
        </p>

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
