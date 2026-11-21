# Shiv Band & Light House — Project Documentation

## 1. Overview & Concept

**Shiv Band & Light House** is a web application designed for a heritage wedding brass band and event lighting service based in Krishna Nagar, East Delhi (established in 1996). 

### The Core Concept
Traditional Indian wedding service providers (brass bands, dhol players, ghodi/baggi rentals, wedding lighting) often rely purely on word-of-mouth or unverified local listings. The Shiv Band platform modernizes this business model by offering:

- **Direct Customer Trust & Transparency:** Clear service breakdowns, authentic photos/videos from real baraat processions, and verifiable Google and platform reviews.
- **High-Intent Lead Generation:** Direct frictionless booking touchpoints via WhatsApp click-to-chat, direct phone calls, and an interactive online booking inquiry form.
- **Hyper-Local & Intent-Based SEO:** Comprehensive Schema.org structured data, dedicated service pages, bilingual Hindi/English headings, and wedding planning guides tailored for Delhi NCR search queries.
- **Owner Control & Real-time Analytics:** A password-protected admin dashboard providing custom cookieless visitor analytics, lead monitoring, content updates, and instant search-engine notification via IndexNow.

---

## 2. Key Features

### Customer Experience
- **Interactive Landing Page:** Hero section, trust badges (serving since 1996), service highlights, customer testimonials, and interactive FAQ.
- **Dedicated Service Catalog (`/services/[slug]`):** Individual detail pages for core wedding offerings:
  - Wedding Brass Band & Baraat Band
  - Decorated Ghodi (Mare) for Groom Entry
  - Royal Flower Baggi & Rath
  - Traditional Punjabi Dhol
  - Chhatri & Procession Lighting
  - Bagpiper Band & Shehnai Vadak
  - Vintage Car for Groom Entrance
  - All-inclusive Baraat Packages
- **Delhi Wedding Guides (`/guides/[slug]`):** SEO-optimized long-form articles (such as baraat checklists and Delhi 10 PM sound regulation tips) to capture organic search traffic.
- **Reviews & Ratings System (`/reviews`):** Live customer reviews backed by Firebase Firestore with upvoting and sentiment tracking.
- **Photo & Video Gallery (`/gallery`):** Visual proof showcasing authentic performances, costumes, and equipment.
- **Authentication & User Profile:** Firebase-powered login (Google Sign-In and Email/Password) allowing customers to manage feedback and view booking inquiries.

### Business & Administration
- **Lead Notification Pipeline:** Automated email alerts to the business owner via the Resend API when new booking inquiries are submitted.
- **Admin Dashboard (`/admin`):** Real-time visitor logs, referral sources, geo-locations, popular pages, lead management, and review moderation.
- **Bing IndexNow Integration:** Single-click re-indexing trigger to inform Bing and Yandex of new or updated site content instantly.

---

## 3. Technology Stack

### Frontend & Core Framework
- **[Next.js 15](https://nextjs.org/) (App Router):** Server-Side Rendering (SSR), React Server Components (RSC), and static page generation for optimal speed and SEO performance.
- **[React 19](https://react.dev/):** Modern UI architecture leveraging latest hooks, transitions, and concurrent rendering.
- **[TypeScript](https://www.typescriptlang.org/):** Strict type safety across the entire application, configuration files, and API contracts.

### Styling & UI Components
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first styling with custom wedding-themed palette (maroon, gold, stone, ivory).
- **[Radix UI](https://www.radix-ui.com/):** Accessible, unstyled primitives for dialogs, dropdowns, and interactive modals.
- **[Framer Motion](https://www.framer.com/motion/):** Fluid page transitions, subtle scroll reveals, and micro-interactions.
- **[Lucide React](https://lucide.dev/) & [Heroicons](https://heroicons.com/):** Modern iconography for services, controls, and contact buttons.
- **[Sonner](https://sonner.emilkowal.ski/):** Toast notification system for user feedback and form submissions.

### Backend, Database & Authentication
- **[Firebase Firestore](https://firebase.google.com/docs/firestore):** Real-time NoSQL database storing customer reviews, user reactions, bookings, and analytics events.
- **[Firebase Authentication](https://firebase.google.com/docs/auth):** Secure client-side authentication supporting both Google OAuth and Email/Password credentials.
- **Firebase Security Rules (`firestore.rules`):** Granular security policies ensuring read/write protection and data integrity.

### APIs & External Services
- **[Resend API](https://resend.com/):** Transactional email routing (`/api/notify`) with rate-limiting to alert the owner of incoming leads.
- **[IndexNow API](https://www.indexnow.org/):** Instant URL submission endpoint (`/api/admin/indexnow`) for real-time search engine indexing.
- **Google Maps & WhatsApp API:** Embeds and deep links facilitating immediate contact and physical store visits.

### SEO Architecture
- **Schema.org Structured Data (`JSON-LD`):** Comprehensive schema generators for `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, and `ItemList`.
- **Dynamic Metadata & Social Previews:** Auto-generated `sitemap.xml`, `robots.txt`, OpenGraph cards (`opengraph-image.tsx`), web app manifest, and apple touch icons.

---

## 4. Project Directory Structure

```text
ShivBand/
├── public/                 # Static images, icons, and Bing verification tokens
├── src/
│   ├── app/                # Next.js App Router pages and API routes
│   │   ├── admin/          # Business analytics & management dashboard
│   │   ├── api/            # Serverless API routes (notify, geo, indexnow)
│   │   ├── guides/         # Wedding checklist & guide pages
│   │   ├── reviews/        # Customer review board
│   │   ├── services/       # Dynamic service catalog ([slug])
│   │   ├── layout.tsx      # Root layout with providers, navbar & footer
│   │   └── page.tsx        # Homepage
│   ├── components/
│   │   ├── admin/          # Admin-specific control components
│   │   ├── site/           # Reusable site modules (Hero, BookingForm, Faq)
│   │   └── ui/             # Radix + Tailwind base components
│   ├── context/            # Global React context (AuthContext, ThemeContext)
│   └── lib/
│       ├── analytics.ts    # Custom visitor analytics engine
│       ├── firebase.ts     # Firestore queries and database actions
│       ├── schema.ts       # Structured JSON-LD SEO schemas
│       ├── services.ts     # Master data for all band & wedding services
│       └── site.ts         # Single source of truth for business NAP data
├── firestore.rules         # Security rules for Cloud Firestore
├── next.config.ts          # Next.js runtime & image optimization config
└── tailwind.config.ts      # Custom theme colors and styling rules
```
