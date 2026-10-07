"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";

const nav = [
  { href: "/work", label: "WORK", note: "Finished objects" },
  { href: "/products", label: "SHOP", note: "Files and parts" },
  { href: "/engineering", label: "SERVICES", note: "What we make" },
  { href: "/about", label: "ABOUT", note: "The studio" },
  { href: "/#process", label: "PROCESS", note: "How a job runs" },
  { href: "/contact", label: "CONTACT", note: "Talk to us" },
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

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <>
    <header
      className={`fixed top-0 right-0 left-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        menu || compact
          ? "border-paper/10 bg-ink/92 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`shell relative z-50 transition-[padding] duration-300 ${
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
            <span className="hidden h-9 items-center font-mark text-[36px] font-bold leading-none tracking-[-0.02em] text-paper sm:flex">
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
              aria-controls="site-menu"
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
      </div>
    </header>

      {menu && (
        <div className="fixed inset-0 z-30 overflow-y-auto overscroll-contain bg-ink lg:hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,49,49,0.2),transparent_42%)]" />
          <nav
            id="site-menu"
            className="shell relative flex min-h-full flex-col gap-2 pt-24 pb-10"
            aria-label="Mobile"
          >
            {nav.map((item, index) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    window.setTimeout(() => setMenu(false), 0);
                  }}
                  data-active={active}
                  className={`glass-media group flex items-center gap-4 rounded-[8px] px-4 py-4 transition-[border-color,background-color] hover:border-paper/30 hover:bg-paper/10 ${
                    active ? "border-red/50 bg-red/10" : ""
                  }`}
                >
                  <span className="w-8 font-display text-lg font-bold text-red">
                    0{index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-3xl leading-none tracking-[-0.03em]">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm text-mist">{item.note}</span>
                  </span>
                  <span
                    aria-hidden
                    className="font-display text-xl text-red transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => {
                window.setTimeout(() => setMenu(false), 0);
              }}
              className="mt-3 inline-flex h-14 items-center justify-between rounded-[2px] bg-red px-5 font-display text-sm font-bold tracking-[0.08em] text-warm-white"
            >
              START A PROJECT
              <span aria-hidden>→</span>
            </Link>
            <p className="mt-6 text-center font-display text-sm font-bold tracking-[0.18em] text-mist">
              DRAW IT · MAKE IT · HOLD IT
            </p>
          </nav>
        </div>
      )}
    </>
  );
}
