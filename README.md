# Shiv Band & Light House — website

Next.js 15 (App Router) + Tailwind + Firebase site for Shiv Band & Light House, Krishna Nagar, Delhi.

## Run locally

```bash
npm install
npm run dev
```

## Where things live

- `src/lib/site.ts` — business details (phones, address, hours, socials, hero photos). Change them here once.
- `src/lib/services.ts` — every service page (`/services/[slug]`): copy, photos, FAQ and SEO fields.
- `src/lib/schema.ts` — structured data (LocalBusiness, Service, FAQ, Breadcrumbs).
- `src/components/site/*` — redesigned UI (hero, booking form, reviews, FAQ, page shell).

## SEO checklist after deploying

1. Set `NEXT_PUBLIC_SITE_URL` in Vercel to the final domain (e.g. `https://www.shivbandlighthouse.in`).
2. Submit `/sitemap.xml` in Google Search Console.
3. Keep the Google Business Profile name, address and phone exactly the same as in `src/lib/site.ts`.
4. Add the production domain to Firebase → Authentication → Settings → Authorized domains (needed for Google sign-in).

## Bing

- Verify in Bing Webmaster Tools (import from Google Search Console, or set `NEXT_PUBLIC_BING_SITE_VERIFICATION`).
- IndexNow key file: `/public/b8f4d9e2a1c647389012abcdef345678.txt`. Admin → Photos → **Notify Bing of site changes** submits every page.
