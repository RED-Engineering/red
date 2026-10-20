"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BrandMark } from "@/components/BrandMark";

const nav = [
  { href: "/work", label: "WORK", note: "Finished objects" },
  { href: "/products", label: "SHOP", note: "Files and parts" },
  { href: "/engineering", label: "SERVICES", note: "What we make" },
  { href: "/about", label: "ABOUT", note: "The studio" },
  { href: "/#process", label: "PROCESS", note: "How a job runs" },
  { href: "/contact", label: "CONTACT", note: "Talk to us" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [compact, setCompact] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [wide, setWide] = useState(false);
  const onContact = pathname === "/contact";
  const centered = scrolled;
  const instant = reduce === true;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 24);
      setScrolled(y > 160);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const apply = () => setWide(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  const showProject = scrolled && !menu && !onContact;
  const showMenuControl = !wide || centered || menu;

  useEffect(() => {
    document.body.style.paddingBottom = showProject ? "5rem" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [showProject]);

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
        <div className={`shell relative z-50 transition-[padding] duration-500 ${compact ? "py-2.5" : "py-4"}`}>
          <div className="relative h-11 sm:h-12">
            <motion.div
              className="absolute z-10"
              initial={false}
              animate={{
                top: "50%",
                y: "-50%",
                left: centered ? "50%" : "0%",
                x: centered ? "-50%" : "0%",
              }}
              transition={{
                duration: instant ? 0 : 0.72,
                delay: instant || !centered ? 0 : 0.08,
                ease,
              }}
            >
              <Link href="/" className="group flex items-center" aria-label="RED — Home">
                <BrandMark
                  priority
                  className={`transition-[width,height,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${
                    centered ? "h-8 w-8" : "h-9 w-9"
                  }`}
                />
                <span
                  className={`overflow-hidden font-mark text-[32px] font-bold leading-none tracking-[-0.02em] whitespace-nowrap text-paper transition-[max-width,opacity,margin] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:ml-3 sm:max-w-24 sm:opacity-100 ${
                    centered ? "ml-2.5 max-w-24 opacity-100" : "ml-0 max-w-0 opacity-0"
                  }`}
                >
                  RED
                </span>
              </Link>
            </motion.div>

            <div
              className={`absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block ${
                centered ? "pointer-events-none" : ""
              }`}
            >
              <motion.nav
                aria-label="Primary"
                aria-hidden={centered}
                className="flex items-center gap-8"
                initial={false}
                animate={{ opacity: centered ? 0 : 1, y: centered ? -8 : 0 }}
                transition={{
                  duration: instant ? 0 : 0.28,
                  delay: instant || centered ? 0 : 0.36,
                  ease,
                }}
              >
                {nav.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      tabIndex={centered ? -1 : undefined}
                      data-active={active}
                      className={`link-line py-2 font-display text-sm font-semibold tracking-[0.08em] transition-colors ${
                        active ? "text-paper" : "text-mist hover:text-paper"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </motion.nav>
            </div>

            <div className="absolute top-1/2 right-0 z-10 flex -translate-y-1/2 items-center">
              <div
                className={`grid transition-[grid-template-columns,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  centered ? "pointer-events-none grid-cols-[0fr] opacity-0" : "grid-cols-[1fr] opacity-100"
                }`}
                aria-hidden={centered}
              >
                <div className="min-w-0 overflow-hidden">
                  <Link
                    href="/contact"
                    tabIndex={centered ? -1 : undefined}
                    className="inline-flex rounded-[2px] bg-red px-3 py-2.5 font-display text-xs font-bold tracking-[0.07em] whitespace-nowrap text-warm-white transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,49,49,0.15)] sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <span className="sm:hidden">START</span>
                    <span className="hidden sm:inline">START A PROJECT</span>
                    <span className="ml-2 sm:ml-4">→</span>
                  </Link>
                </div>
              </div>

              <div
                className={`grid transition-[grid-template-columns,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
                  centered ? "pointer-events-none grid-cols-[0fr] opacity-0" : "grid-cols-[1fr] opacity-100"
                }`}
                aria-hidden={centered}
              >
                <div className="min-w-0 overflow-hidden">
                  <Link
                    href="/products"
                    tabIndex={centered ? -1 : undefined}
                    className="inline-flex px-3 font-display text-sm font-semibold tracking-[0.08em] whitespace-nowrap text-paper transition-colors hover:text-red sm:px-5"
                  >
                    SHOP
                  </Link>
                </div>
              </div>

              <div
                className={`grid transition-[grid-template-columns,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  centered || menu
                    ? "grid-cols-[1fr] opacity-100"
                    : "pointer-events-none grid-cols-[0fr] opacity-0 max-lg:pointer-events-auto max-lg:grid-cols-[1fr] max-lg:opacity-100"
                }`}
                style={{ transitionDelay: centered ? "160ms" : "0ms" }}
                aria-hidden={!showMenuControl}
              >
                <div className="min-w-0 overflow-hidden">
                  <button
                    type="button"
                    className="px-1 font-display text-sm font-semibold tracking-[0.08em] whitespace-nowrap text-paper"
                    aria-expanded={menu}
                    aria-controls="site-menu"
                    tabIndex={showMenuControl ? 0 : -1}
                    onClick={() => setMenu((open) => !open)}
                  >
                    {menu ? "CLOSE" : "MENU"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 z-30 overflow-y-auto overscroll-contain bg-ink">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,49,49,0.2),transparent_42%)]" />
          <nav
            id="site-menu"
            className="relative mx-auto flex min-h-full w-[min(100%-2.5rem,42rem)] flex-col gap-2 pt-24 pb-10"
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
                  <span className="w-8 font-display text-lg font-bold text-red">0{index + 1}</span>
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

      <div
        className={`project-cta fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-6 sm:bottom-6 ${
          showProject
            ? "translate-y-0 opacity-100"
            : "project-cta-out pointer-events-none translate-y-4 opacity-0"
        }`}
        aria-hidden={!showProject}
      >
        <span className="project-cta-shadow" aria-hidden />
        <Link
          href="/contact"
          tabIndex={showProject ? undefined : -1}
          className="project-cta-float inline-flex items-center rounded-[2px] bg-red px-5 py-3 font-display text-sm font-bold tracking-[0.08em] text-warm-white transition-colors duration-200 hover:bg-[#ff4141]"
        >
          START A PROJECT
          <span className="project-cta-arrow ml-3" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </>
  );
}
