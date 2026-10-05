"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";

const nav = [
  { href: "/work", label: "WORK" },
  { href: "/products", label: "SHOP" },
  { href: "/engineering", label: "SERVICES" },
  { href: "/about", label: "ABOUT" },
  { href: "/#process", label: "PROCESS" },
  { href: "/contact", label: "CONTACT" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 right-0 left-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        compact
          ? "border-paper/10 bg-ink/92 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`shell transition-[padding] duration-300 ${
          compact ? "py-2.5" : "py-4"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="RED — Home"
          >
            <BrandMark priority className="h-9 w-9 transition-transform group-hover:scale-105" />
            <span className="hidden font-display text-2xl font-black tracking-[-0.03em] text-red sm:block">
              RED
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={active}
                  className={`link-line py-2 font-display text-sm font-semibold tracking-[0.08em] transition-colors ${
                    active ? "text-paper" : "text-mist hover:text-paper"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/contact"
              className="inline-flex rounded-[2px] bg-red px-3 py-2.5 font-display text-xs font-bold tracking-[0.07em] text-warm-white transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,49,49,0.15)] sm:px-4 sm:py-3 sm:text-sm"
            >
              <span className="sm:hidden">START</span>
              <span className="hidden sm:inline">START A PROJECT</span>
              <span className="ml-2 sm:ml-4">→</span>
            </Link>
            <Link
              href="/products"
              className="font-display text-sm font-semibold tracking-[0.08em] text-paper transition-colors hover:text-red lg:hidden"
            >
              SHOP
            </Link>
            <button
              type="button"
              className="font-display text-sm font-semibold tracking-[0.08em] text-paper lg:hidden"
              aria-expanded={menu}
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
      </div>

      {menu && (
        <div className="min-h-[calc(100svh-61px)] border-t border-paper/10 bg-panel lg:hidden">
          <nav className="shell flex flex-col py-8" aria-label="Mobile">
            {nav.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenu(false)}
                className="group flex items-center justify-between border-b border-paper/10 py-5 text-4xl tracking-[-0.04em]"
              >
                <span>{item.label}</span>
                <span className="tech text-mute transition-colors group-hover:text-red">
                  0{index + 1}
                </span>
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenu(false)}
              className="mt-10 inline-flex w-fit rounded-[2px] bg-red px-4 py-3 font-display text-sm font-bold tracking-[0.07em] text-warm-white"
            >
              START A PROJECT <span className="ml-4">→</span>
            </Link>
            <div className="mt-auto flex items-center gap-3 pt-12">
              <span className="red-led" aria-hidden />
              <p className="tech">RED / ENGINEERING + DESIGN</p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
