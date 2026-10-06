import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { nav, site } from "@/lib/site";

const legal = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/shipping", label: "Shipping" },
  { href: "/legal/returns", label: "Returns" },
];

const social = [
  { href: site.social.instagram, label: "INSTAGRAM" },
  { href: site.social.youtube, label: "YOUTUBE" },
  { href: site.social.linkedin, label: "LINKEDIN" },
].filter((item) => item.href.startsWith("http") && item.href.replace(/\/$/, "").split("/").length > 3);

export function Footer() {
  return (
    <footer className="mt-auto border-t border-paper/10 bg-panel">
      <div className="shell grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <div className="flex items-center gap-5">
            <BrandMark className="h-20 w-20" />
            <p className="h-20 font-mark text-[80px] font-bold leading-none tracking-[-0.02em] text-red">RED</p>
          </div>
          {site.email ? (
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-block font-display text-xl font-semibold text-paper hover:text-red"
            >
              {site.email}
            </a>
          ) : (
            <Link
              href="/contact"
              className="mt-8 inline-block font-display text-xl font-semibold text-paper hover:text-red"
            >
              START A PROJECT
            </Link>
          )}
          <p className="mt-3 max-w-sm text-sm leading-6 text-mist">
            RED — engineering, design and manufacturing.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="tech mb-4">INDEX</p>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-mist hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="text-mist hover:text-paper">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        {social.length > 0 ? (
          <div className="md:col-span-2">
            <p className="tech mb-4">NETWORK</p>
            <ul className="space-y-2">
              {social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-mist hover:text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="md:col-span-2">
          <p className="tech mb-4">LEGAL</p>
          <ul className="space-y-2">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-mist hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="shell flex flex-col gap-3 py-5 font-mono text-[9px] tracking-[0.14em] text-mute md:flex-row md:items-center md:justify-between">
          <p>© 2026 RED</p>
          <p>ENGINEERING / DESIGN / MANUFACTURING</p>
        </div>
      </div>
    </footer>
  );
}
