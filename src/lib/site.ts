export const site = {
  name: "RED",
  fullName: "RED",
  title: "RED — Engineering for any manufacturing process",
  description:
    "RED designs mechanical parts and assemblies for sheet metal, machining, laser, welding, printing, molding, and the other process the part needs.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",
  statement: "ENGINEERED TO EXIST.",
  email: "david@redstudio.engineering",
  phone: "+40727857763",
  contactName: "David Toth",
  contactRole: "RED Engineer",
  social: {
    instagram: "https://www.instagram.com/redstudio.engineering/",
    tiktok: "https://www.tiktok.com/@redstudio.engineering",
    youtube: "https://www.youtube.com/@REDEngineering-p5y",
  },
} as const;

export const nav = [
  { href: "/work", label: "WORK" },
  { href: "/products", label: "SHOP" },
  { href: "/engineering", label: "SERVICES" },
  { href: "/about", label: "ABOUT" },
] as const;
