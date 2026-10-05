# RED website — session handoff

Last updated: 2026-10-05. Read this before continuing work.

## What this project is

Custom Next.js frontend for **RED** (independent engineering / CAD / product design / manufacturing). Shopify is catalog + checkout only. The Next.js site owns branding, layout, portfolio, engineering, About, and product presentation.

Brand is **RED**, not “RED by David”. Do not add “by David” back.

## Live links

- Site: https://red-umber.vercel.app
- Shop: https://red-umber.vercel.app/products
- GitHub: https://github.com/RED-Engineering/red (`master`)
- Vercel project: `red-133a/red` (account team RED / `tothdavidtz24-3648`)
- Shopify store: `xa7k6h-dc.myshopify.com` (Romania, RON)

Local: `C:\Users\RED\Projects\red` — `npm run dev` → http://localhost:3000

## What was done

- Built the full site (Next.js 16.3.8, React 19, Tailwind v4, Motion). Logo: `public/brand/red-mark.png`. Fonts: Barlow, Barlow Condensed, IBM Plex Mono. Accent `#FF3131`.
- Navbar: **Start a Project** first, then **Shop**. No bag/cart drawer. Checkout is Shopify.
- Removed placeholder projects, fake metrics/testimonials, and “by David”. Work is empty until real photos are added.
- Git init, first commits, GitHub repo created as **RED-Engineering/red**, Vercel production deploy.
- Shopify store domain set on Vercel and in gitignored `.env.local`. Shop lists live products. Buy uses Shopify cart permalinks (`/{shop}/cart/{variantId}:{qty}`) when no Storefront token is set.
- Verified live shop shows **Suport scule Abkant** (handle `digital-product`, 50 RON). Product page: `/products/digital-product`.

Commits on `master`: initial launch (`909611d`), Shopify catalog connection (`ebf33d4`).

## Shopify — current vs intended

**Working now:** `SHOPIFY_STORE_DOMAIN=xa7k6h-dc.myshopify.com` → public `products.json` catalog + cart permalink checkout.

**Not done:** Storefront API GraphQL (`cartCreate`, metafields). That needs `SHOPIFY_STOREFRONT_ACCESS_TOKEN` (`shpst_` / Storefront token from the app credentials page).

A Shopify app client ID + `shpss_` secret were provided in chat. Those are OAuth credentials, **not** a Storefront token. Token exchange failed with `app_not_installed`. Do not store that secret in the repo. It was exposed in chat — rotate it in Shopify if the conversation is not private.

When a Storefront token exists, `src/lib/shopify/index.ts` uses GraphQL; otherwise it falls back to the public catalog.

Optional metafields (namespace `custom`): `material`, `process`, `revision`, `year`, `dimensions`, `product_type`, `weight`, `code`.

## What still needs to be done

1. **Vercel ↔ GitHub auto-deploy:** `vercel git connect` failed until GitHub is linked on https://vercel.com/account/settings/authentication (Connect next to GitHub, authorize **RED-Engineering**). Until then, deploy with `npx vercel --prod` (or after linking, push to `master`).
2. **Storefront API token:** install the Shopify app on the store, copy the Storefront access token, put it in `.env.local` and Vercel env `SHOPIFY_STOREFRONT_ACCESS_TOKEN`. Do not use the client secret as the token.
3. **Real work/portfolio:** drop photos in `public/work/{slug}/` and add entries in `src/content/projects.ts`. Array is empty on purpose.
4. **Contact email:** `/api/contact` only logs. Wire Resend (or similar) plus `site.email` in `src/lib/site.ts`.
5. **Social / contact details:** `site.email` and `site.social` are empty.
6. **Custom domain:** still `red-umber.vercel.app`.
7. **Contact form attachments / CAD delivery:** digital CAD files must be delivered after purchase through Shopify, never placed in `public/`.

## Constraints for later sessions

- No fake testimonials, client logos, or invented metrics.
- Do not copy GrahaPrime assets.
- Do not commit `.env.local`, tokens, or Shopify secrets.
- Windows PowerShell: sandbox is unreliable — use full permissions for git/gh/vercel.
- Next.js 16 APIs may differ from training data — read `node_modules/next/dist/docs/` before adding Next APIs.
- Do not restore a local cart bag. Buy goes to Shopify.

## Env

`.env.example` and gitignored `.env.local`:

```
SHOPIFY_STORE_DOMAIN
SHOPIFY_STOREFRONT_ACCESS_TOKEN   # optional until GraphQL cart is needed
NEXT_PUBLIC_SITE_URL
```

Vercel already has `SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SITE_URL=https://red-umber.vercel.app`.
