# RED website — session handoff

Last updated: 2026-10-07. Read this before continuing work.

## What this project is

Custom Next.js frontend for **RED** (independent engineering / CAD / product design / manufacturing). Shopify is catalog + checkout only. This Next.js app owns branding, layout, work, engineering, About, contact, and product presentation.

Brand is **RED**, not “RED by David”. David Toth appears only as the engineer on the contact card (`RED Engineer`), not in the brand name.

## Live links

- Site: https://red-umber.vercel.app
- Shop: https://red-umber.vercel.app/products
- Start a project: https://red-umber.vercel.app/contact
- GitHub: https://github.com/RED-Engineering/red (`master`)
- Vercel project: `red-133a/red` (account team RED / `tothdavidtz24-3648`)
- Shopify store: `xa7k6h-dc.myshopify.com` (Romania, RON)

Local: `C:\Users\RED\Projects\red` — `npm run dev` → http://localhost:3000

## What was done (through 2026-10-07)

### Site and brand

- Custom Next.js 16.3.8 / React 19 / Tailwind v4 / Motion site. Mark: `public/brand/red-mark.png`. Fonts: Barlow, Barlow Condensed, IBM Plex Mono, Oswald wordmark. Accent `#FF3131`.
- Navbar: **Start a Project** first, then Shop. No cart drawer. Checkout stays on Shopify.
- No fake testimonials, invented metrics, client logos, or placeholder portfolio pieces. Work stays empty until real photos exist.

### Homepage

Rewritten to be shorter and readable:

1. Hero: “ENGINEERING THAT FEELS HUMAN.” plus one line on what RED does. CTAs: Start a Project / Shop.
2. Process ticker (IDEA → OBJECT).
3. **What we do** — five glass cards (CAD, mechanical, sheet metal, prototyping, manufacturing).
4. **How a project runs** — six glass cards (idea → deliver). `id="process"` for the nav link.
5. **Shop** — centered letterpress **SHOP**, heading **GET THE FILE OR THE PART.**, featured product card. Shopify/email essay copy removed.
6. Three FAQs in glass rows.
7. Final glass CTA.

Removed from the homepage: long about block, fake stats, “why RED” list, credibility grid, numbered INDEX fluff.

### Shop

- Catalog in `src/lib/catalog.ts`: Shopify products plus optional local free files from `src/content/free-products.ts`. A free file and a Shopify physical product merge when handles match (`shopifyHandle`).
- Paid checkout still uses Storefront GraphQL if `SHOPIFY_STOREFRONT_ACCESS_TOKEN` is set; otherwise public `products.json` + `/cart/{variantId}:{qty}` permalinks.
- Variants map from titles: CAD FILE / PHYSICAL / CAD + PHYSICAL (`src/lib/product-options.ts`). Product page has an option picker, GLB viewer (`ProductViewer` + `@google/model-viewer`), and a custom-engineering CTA.
- Shop index (`/products`): search, brick-wall glass cards, photos `object-cover` inside the tile, title/price on the glass. Organic blob shapes were dropped.
- **Free files** are not Shopify. Flow: email → `/api/free/claim` → cookie → `/api/free/download`. Packages live in `private/free/{handle}/` (gitignored except README). Previews (JPG/PNG/GLB) in `public/shop/free/{handle}/`. Needs `DATABASE_URL` (Neon) in `.env.local` and Vercel; table SQL in `src/lib/db/free-downloads.sql`.

### Contact

- `/contact` (“Start an engineering project”): glass **EngineerContact** card with David Toth, RED Engineer, `tothdavidtz24@outlook.com`, `+40 727 857 763`, EMAIL / CALL, portrait clipped to `public/brand/portrait-mask.png`.
- Intake form is a compact glass card (sentence-case labels). `/api/contact` still only logs — it does not send mail yet.
- Footer: email above “RED — engineering, design and manufacturing.”
- Contact values live in `src/lib/site.ts`.

### Privacy

- Privacy copy mentions free-file emails stored to release the download, not for marketing.

## How the shop catalog works

```
src/content/free-products.ts  →  RED free file (email download)
src/lib/shopify/index.ts      →  Shopify paid product (permalink or Storefront cart)
src/lib/catalog.ts            →  merge by handle / shopifyHandle
```

To add a **free file**:

1. Previews in `public/shop/free/{handle}/`
2. Zip in `private/free/{handle}/package.zip`
3. Entry in `src/content/free-products.ts`
4. Optional: same-handle Shopify product with a PHYSICAL variant

Never put CAD packages in `public/`.

## Shopify — current vs intended

**Working now:** `SHOPIFY_STORE_DOMAIN=xa7k6h-dc.myshopify.com` → public `products.json` + cart permalinks. Live product: **Suport scule Abkant** (`digital-product`, 50 RON).

**Not done:** Storefront API GraphQL (`cartCreate`, metafields). Needs `SHOPIFY_STOREFRONT_ACCESS_TOKEN` (`shpst_`, from the app credentials page after the app is **installed** on the store).

A Shopify app client ID + `shpss_` secret were pasted in an earlier chat. Those are OAuth credentials, **not** a Storefront token. Do not put them in the repo. Rotate the secret if that chat is not private.

Optional metafields (namespace `custom`): `material`, `process`, `revision`, `year`, `dimensions`, `product_type`, `weight`, `code`.

## What should be done next

1. **Vercel ↔ GitHub auto-deploy:** link GitHub on https://vercel.com/account/settings/authentication (authorize **RED-Engineering**). Until then, production is `npx vercel --prod` after push.
2. **Storefront token:** install the Shopify app, copy the Storefront access token into `.env.local` and Vercel as `SHOPIFY_STOREFRONT_ACCESS_TOKEN`. Do not use the client secret.
3. **Shopify variants:** on each product, titles `CAD FILE` / `PHYSICAL` / `CAD + PHYSICAL` so the option picker maps correctly.
4. **Neon `DATABASE_URL`:** required on Vercel (and locally) before live free downloads work. Run `src/lib/db/free-downloads.sql` if the table is not created automatically.
5. **Wire `/api/contact` to email** (Resend or similar) so intake actually arrives at `tothdavidtz24@outlook.com`. The address is already in `site.email`.
6. **Real work photos:** `public/work/{slug}/` + entries in `src/content/projects.ts`. Leave the array empty until then.
7. **Free catalog entries:** add real free products in `src/content/free-products.ts` when files exist.
8. **Social:** `site.social` Instagram / YouTube / LinkedIn still empty.
9. **Custom domain:** still `red-umber.vercel.app`.
10. **Rotate** the Shopify `shpss_` secret if it was exposed in chat.

## Constraints for later sessions

- No fake testimonials, client logos, or invented metrics.
- Do not copy GrahaPrime assets.
- Do not commit `.env.local`, tokens, or Shopify secrets.
- Never put CAD files in `public/`.
- Windows PowerShell: use full permissions for git / gh / vercel. Do not run `git config --global`.
- Next.js 16 APIs may differ from training data — read `node_modules/next/dist/docs/` before adding Next APIs.
- Do not restore a local cart bag. Buy goes to Shopify.

## Env

`.env.example` and gitignored `.env.local`:

```
SHOPIFY_STORE_DOMAIN
SHOPIFY_STOREFRONT_ACCESS_TOKEN   # optional until GraphQL cart is needed
NEXT_PUBLIC_SITE_URL
DATABASE_URL                      # Neon, for free-file emails
```

Vercel already has `SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SITE_URL=https://red-umber.vercel.app`. Add `DATABASE_URL` before free downloads go live.
