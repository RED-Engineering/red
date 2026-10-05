# RED

Official website for **RED** — engineering, product design, CAD and manufacturing.

Live: [https://red-umber.vercel.app](https://red-umber.vercel.app) · GitHub: [RED-Engineering/red](https://github.com/RED-Engineering/red)

Session handoff (what shipped and what’s left): [`STATUS.md`](./STATUS.md).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Projects

Put photos in `public/work/{slug}/`, then add an entry in `src/content/projects.ts`. The homepage, work index and project pages pick it up automatically.

## Shopify

The site is a custom Next.js frontend. Shopify is the catalog and checkout.

1. Create products in Shopify (price, variants, inventory, images).
2. Optional Storefront metafields: `custom.material`, `custom.process`, `custom.revision`, `custom.year`, `custom.dimensions`, `custom.product_type`, `custom.weight`, `custom.code`.
3. Copy `.env.example` to `.env.local` and set:

```
SHOPIFY_STORE_DOMAIN
SHOPIFY_STOREFRONT_ACCESS_TOKEN
NEXT_PUBLIC_SITE_URL
```

Restart `npm run dev`. `SHOPIFY_STORE_DOMAIN` is enough to list published products and send Buy to Shopify checkout. Add `SHOPIFY_STOREFRONT_ACCESS_TOKEN` later for Storefront GraphQL (carts, metafields).

Digital CAD files must be delivered after purchase through Shopify. Do not put private files in `public/`.

## Contact

`/api/contact` currently logs intake data on the server. Connect email (Resend, etc.) when you want inquiries in your inbox.

## Stack

Next.js, React, TypeScript, Tailwind CSS, Motion. Hosted wherever Node is supported — Vercel is the intended default.
