"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { RedProduct } from "@/content/types";

function matches(product: RedProduct, query: string) {
  const haystack = [
    product.title,
    product.short,
    product.description,
    product.productCode,
    product.category,
    product.material,
    product.process,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export function ShopCatalog({ products }: { products: RedProduct[] }) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const visible = useMemo(
    () => (needle ? products.filter((product) => matches(product, needle)) : products),
    [needle, products],
  );

  return (
    <>
      <div className="text-center">
        <h1 className="display">SHOP</h1>
        <label className="mx-auto mt-10 block max-w-md">
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="SEARCH"
            autoComplete="off"
            spellCheck={false}
            className="w-full border-0 border-b border-paper/20 bg-transparent py-3 text-center font-display text-2xl font-bold tracking-[0.08em] text-paper outline-none placeholder:text-mist/45 focus:border-red"
          />
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-lg text-mist">
          {products.length === 0 ? "No products yet." : "No matches."}
        </p>
      ) : (
        <div className="shop-wall mt-16 pb-16">
          {visible.map((product) => (
            <ProductCard key={product.handle} product={product} layout="brick" />
          ))}
        </div>
      )}
    </>
  );
}
