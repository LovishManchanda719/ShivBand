# Shiv Band & Light House — SEO & GEO Documentation

This document records the **mistakes we caught and fixed** (so we never repeat them) and the **long-term SEO & GEO direction** for `https://shivband.in`.

---

## 1. Mistakes We Made & Must Avoid in the Future

### Technical, Metadata & Schema Mistakes
1. **Duplicate Brand Suffix in `<title>`**
   - *Mistake*: Putting `| Shiv Band` inside a page's `metadata.title` (e.g., `/packages`) when `src/app/layout.tsx` already applies `template: "%s | Shiv Band"`. That rendered `... | Shiv Band | Shiv Band`.
   - *Rule*: Never add `| Shiv Band` to subpage `metadata.title` values. Keep titles concise (~50–60 characters).

2. **Putting Generic Topic URLs Inside `sameAs` (`src/lib/schema.ts`)**
   - *Mistake*: `localBusinessSchema` included generic Wikipedia/Wikidata topic URLs (`Brass_band`, `Baraat`, `Dhol`, `Q10886`, etc.) inside `sameAs`.
   - *Rule*: `sameAs` strictly means *"this business IS that exact entity"* — only include Shiv Band's own official profiles (Instagram, Facebook, YouTube, Google Maps). Use `knowsAbout` for service/topic concepts.

3. **Duplicate `LocalBusiness` Entities on Location Pages (`src/lib/schema.ts`)**
   - *Mistake*: Emitting `@type: ["LocalBusiness", "EntertainmentBusiness"]` with the exact same Krishna Nagar street address and `geo` coordinates on every `/locations/[slug]` page.
   - *Rule*: Model service-area pages as `Service` + `areaServed` referencing `provider: { "@id": BUSINESS_ID }`, keeping `LocalBusiness` anchored to the single physical shop in Krishna Nagar.

4. **Using `data-nosnippet="true"` on the Homepage Hero (`src/components/site/Hero.tsx`)**
   - *Mistake*: Placing `data-nosnippet="true"` on the outer `<section>` wrapping the homepage `<h1>` (`Shiv Band & Light House`), which discourages Google from using hero text in snippets.
   - *Rule*: Never wrap primary headings or core brand copy in `data-nosnippet`.

5. **Client-Only Content on SEO Pages (`src/components/Reviews.tsx`)**
   - *Mistake*: Rendering only a client-side Firebase list on `/reviews` meant non-JS crawlers and AI scrapers saw minimal page text.
   - *Rule*: Always include server-rendered (SSR) copy, summaries, and internal links on every public route.

6. **Splitting Authority With a Legacy `.vercel.app` Domain**
   - *Mistake*: Having `https://shiv-band.vercel.app/` indexed alongside `https://shivband.in`.
   - *Rule*: Always enforce a permanent `301` redirect from any legacy domain to `https://shivband.in`.

---

### Content, Location & Internal Linking Mistakes
7. **Creating Micro-Location Doorway Pages**
   - *Mistake to avoid*: Creating separate `/locations/*` pages for tiny neighboring colonies 1–2 km from Krishna Nagar (e.g., Geeta Colony, Chandar Nagar, Gandhi Nagar, Jagatpuri). Overlapping thin pages risk `Crawled - currently not indexed` or doorway flags.
   - *Rule*: Fold nearby colonies into `krishna-nagar` (`coverageAreas`, `popularVenues`, `keywords`). Only create standalone `/locations/[slug]` pages for **major, distinct Delhi NCR wedding belts** (e.g., `north-delhi-gt-karnal-road`, `west-delhi`, `south-delhi`, `noida`, `gurugram`, `faridabad`, `ghaziabad`, `rohini`).

8. **Missing Hinglish, Pricing & Spelling Variants**
   - *Mistake*: Writing copy purely in formal English while real Delhi NCR buyers search Hinglish and pricing terms (`shadi band price`, `band booking for marriage price`, `phool wali baggi`, `safed ghodi`, `chhatar light`, `nashik dhol`, `dj on wheels`, `cold pyro`, `21 piece`, `Chhatarpur` vs `Chattarpur`).
   - *Rule*: Include natural Hinglish terms, non-hyphenated troop sizes (`21 piece`, `31 piece`), and common spelling variants in `keywords`, FAQs, `hindiFaqs`, and `llms.txt`.

---

### Image, Video & Build Mistakes
9. **Generic Numbered Image Filenames & Missing Brand `alt` Text**
   - *Mistake*: Shipping images named `102.jpg`, `106.jpg`, `108.jpg`, `110.jpg` without `"Shiv Band"` in their `title`/`alt` text, and reusing identical images across different services (`Cold Pyro & Smoke` sharing `Vintage Car`'s photo; `Nashik Dhol` sharing `Dhol Wale`'s photo).
   - *Rule*: Every image in `public/images/` must have a descriptive filename (`shiv-band-*.jpg`), unique visual per service, and `"Shiv Band"` + Delhi/service context in its `alt`/`title`.

10. **Portrait Photos in Landscape Containers (`/guides`)**
    - *Mistake*: Using tall portrait photos inside `aspect-[16/10]` / `aspect-[16/9]` guide containers with center `object-cover`, which cropped subjects' heads.
    - *Rule*: Always pair landscape containers with landscape photos (and `object-[50%_25%]` focal positioning).

11. **Incomplete `sitemap.ts` (Missing Gallery Images & Videos)**
    - *Mistake*: Only attaching `images` to `/services/[slug]` in `src/app/sitemap.ts` while omitting `/` and `/gallery/photos` images and video entries (`0 Discovered videos` in GSC).
    - *Rule*: Keep `HOME_IMAGES`, `LOCAL_PHOTOS`, and video entries updated in `src/app/sitemap.ts`.

12. **Immutable Image Cache Collision**
    - *Mistake*: Replacing a file in `public/images/` under the **same filename**. Because `next.config.ts` sets `Cache-Control: public, max-age=31536000, immutable` on `/images/:path*`, browsers and `/_next/image` keep serving the cached old image.
    - *Rule*: Whenever replacing an image in `public/images/`, always save it under a **new filename** and update the reference.

13. **Running `npm run build` While `npm run dev` Is Running**
    - *Mistake*: Running `next build` while `next dev` is active overwrites `.next` and breaks the running dev server (`ENOENT: .next/routes-manifest.json`).
    - *Rule*: Use `npx tsc --noEmit` to verify types while `next dev` is running, or stop `next dev` before running `npm run build`.

---

## 2. Our SEO & GEO Direction Going Forward

### Core Positioning
- **Own the Brand & Beat Aggregators Organically**: Never rely on paid shared-lead directories (like Justdial, where 71% of app-based enquiries went unresponded and leads are shared with competitors). Build `https://shivband.in` + **Google Business Profile** as owned, zero-recurring-fee assets where every lead goes straight to Call or WhatsApp.
- **Zero-Surge Differentiation**: Use our **Zero-Surge Pricing Guarantee** (since 1996, direct with owner Manish Kumar, zero middlemen) as the primary CTR hook in titles, meta descriptions, and guides (`wedding-band-cost-delhi`, `shubh-vivah-wedding-dates-delhi-2026-2027`).

### Architecture & Content Strategy
1. **Single Source of Truth (NAP)**: Keep `src/lib/site.ts` (`Shiv Band & Light House`, `D-96, Parwana Road, New Govindpura, Krishna Nagar, New Delhi 110051`, `+91 98186 26259`) identical across schema, footer, `llms.txt`, Google Business Profile, and social profiles.
2. **Location-First Conversion Funnel**:
   - ~80% of traffic is mobile, and real bookings come from **Google Search → `/locations/[slug]` → one-tap Call / WhatsApp** (proven by our first organic booking via `/locations/mayur-vihar`).
   - Keep Call & WhatsApp CTAs prominent on all location, service, package, and guide pages.
   - Maintain strong internal cross-linking between `/guides/*`, `/services/*`, and `/locations/*`.
3. **GEO (AI Search Readiness)**:
   - Keep `public/llms.txt` and `public/llms-full.txt` updated whenever services, locations, or guides are added.
   - Maintain `robots.ts` allowances for AI crawlers (`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`, `Applebot-Extended`).
   - Keep entity disambiguation clear in `HOME_FAQS` (independent from Shiv Mohan Band).
4. **Google Images & YouTube Watch Pages**:
   - Ensure `/gallery/photos` stays indexed with descriptive filenames and `"Shiv Band"` titles so our photos push down unrelated results in Google Images.
   - Use YouTube (`@shivbanddelhi`) for video watch-page rankings in Google Search/Video: put `https://shivband.in` on line 1 of every description and include exact venue/area names in titles (e.g., GT Karnal Road, Krishna Nagar, East Delhi).

---

## 3. Standard Release & Post-Deploy Workflow
1. Verify types (`npx tsc --noEmit`) or run a clean `npm run build` (with `next dev` stopped) to confirm all static pages and `sitemap.xml` generate cleanly.
2. Push and deploy to Vercel (`https://shivband.in`).
3. Open `https://shivband.in/admin` and click **Notify Bing & Search Bots** (IndexNow).
4. In **Google Search Console** (`sc-domain:shivband.in`), run **URL Inspection → Request Indexing** on any newly added or updated priority URLs, and monitor **Performance** (Web + Image) and **Indexing → Pages**.
