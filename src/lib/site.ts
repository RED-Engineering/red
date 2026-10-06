export const site = {
  name: "RED",
  fullName: "RED",
  title: "RED — Engineering, Design & Manufacturing",
  description: "Independent engineering studio. CAD, product design and manufacturing.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",
  statement: "ENGINEERED TO EXIST.",
  email: "tothdavidtz24@outlook.com",
  phone: "+40727857763",
  contactName: "David Toth",
  contactRole: "RED Engineer",
  social: {
    instagram: "",
    youtube: "",
    linkedin: "",
  },
} as const;

export const nav = [
  { href: "/work", label: "WORK" },
  { href: "/products", label: "SHOP" },
  { href: "/engineering", label: "ENGINEERING" },
  { href: "/about", label: "ABOUT" },
] as const;
