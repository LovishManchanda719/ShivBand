import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Crown,
  Phone,
} from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { PageShell } from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import SectionHeading from "@/components/site/SectionHeading";
import Faq from "@/components/site/Faq";
import JsonLd from "@/components/site/JsonLd";
import PackageBuilder from "@/components/site/PackageBuilder";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { SITE, SITE_URL, telLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wedding Band Packages in Delhi | Baraat Budget & Shadi Band Price",
  description:
    "Explore Shiv Band's 2026 wedding band packages in Delhi NCR. Traditional Baraat, Grand Celebration & Royal Maharaja VIP tiers. Transparent Zero-Surge shadi band price & custom quote.",
  alternates: { canonical: "/packages" },
  keywords: [
    "wedding band packages Delhi",
    "wedding band cost Delhi",
    "shadi band price",
    "band booking for marriage price",
    "baraat band rates",
    "baraat band price list Delhi",
    "ghodi baggi package rates",
    "wedding brass band rates Delhi NCR",
    "Shiv Band packages",
  ],
  openGraph: {
    title: `Wedding Band Packages & Baraat Budget Planner | ${SITE.name}`,
    description:
      "Customized baraat packages with brass band, groom ghodi, flower baggi rath, Punjabi dhol and crystal chhatri lights across Delhi NCR.",
    url: "/packages",
    images: [{ url: `${SITE_URL}/images/shiv-band-brass-band-procession.jpg`, alt: "Shiv Band Wedding Packages" }],
  },
};

const PACKAGE_FAQS = [
  {
    q: "How much does a wedding band cost in Delhi?",
    a: "Wedding band charges at Shiv Band are calculated purely based on what you need: the size of the musical troop (11 to 31+ players), vehicle selection (calm white ghodi, royal flower baggi, or vintage car), lighting arrangements, and venue travel distance. We operate on a strict zero-surge pricing policy — our rates remain fair and transparent year-round with no peak date markups.",
  },
  {
    q: "Is booking a package cheaper than booking ghodi, band, and dhol separately?",
    a: "Yes. Bundling your wedding services with Shiv Band saves approximately 20% to 30%. Because all musicians, dhol players, the decorated ghodi, and the lighting crew arrive together on our dedicated company transport, transit and coordination overheads are minimized.",
  },
  {
    q: "Can we customize an existing package?",
    a: "Absolutely. You can add extra dholis, substitute a flower baggi for a vintage car, upgrade trumpet sections, or add safa/turban tying. Our packages are completely flexible.",
  },
  {
    q: "Do you charge higher rates during wedding season or on auspicious (Saya) dates?",
    a: "Never. Shiv Band believes in honest, family-first pricing. We do not practice seasonal price hikes or surge charging on auspicious dates. We ask for your wedding date solely to verify artist and troop availability for your evening, as we only accept a limited number of bookings per night to ensure our highest performance quality.",
  },
];

export default function PackagesPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Packages & Pricing", path: "/packages" },
  ];

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          faqSchema(PACKAGE_FAQS),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Wedding Band & Baraat Packages in Delhi",
            description: "Bespoke wedding brass band, ghodi, flower baggi, dhol and lighting packages with Zero-Surge Pricing Guarantee across Delhi NCR.",
            itemListElement: [
              {
                "@type": "Offer",
                name: "Traditional Baraat Package",
                description: "11-15 brass musicians, decorated ghodi with handler, 2 Punjabi dhol players, crystal chhatri lanterns, and generator trolley.",
                priceCurrency: "INR",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "INR",
                  description: "Zero-Surge fair family pricing based on troop formation and travel distance.",
                },
                url: `${SITE_URL}/packages`,
              },
              {
                "@type": "Offer",
                name: "Grand Celebration Package",
                description: "21-piece brass orchestra, decorated white mare, 2-horse luxury flower baggi, 4 Punjabi dholis, crystal chhatri & vintage jhumar lighting.",
                priceCurrency: "INR",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "INR",
                  description: "Zero-Surge fair family pricing based on troop formation and travel distance.",
                },
                url: `${SITE_URL}/packages`,
              },
              {
                "@type": "Offer",
                name: "Royal Maharaja VIP Package",
                description: "31+ piece grand brass symphony, 4-horse royal rath or vintage car, 6 Punjabi dhol masters, full chhatri, jhumar and road lighting.",
                priceCurrency: "INR",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "INR",
                  description: "Zero-Surge fair family pricing based on troop formation and travel distance.",
                },
                url: `${SITE_URL}/packages`,
              },
            ],
          },
        ]}
      />

      {/* Hero Section */}
      <section className="container pb-16 pt-10 sm:pt-14">
        <Breadcrumbs items={crumbs} />

        <div className="mt-8 max-w-3xl">
          <p className="eyebrow mb-4">
            Baraat Packages • Direct Booking
          </p>

          <h1 className="font-display text-[38px] leading-[1.06] tracking-[-0.015em] text-ink sm:text-[52px] lg:text-[60px]">
            Wedding Band Packages &amp; Custom Budget Planner
          </h1>

          <p className="mt-6 text-[17px] leading-relaxed text-stone">
            Every wedding in Delhi has its own rhythm, crowd size, and route. Rather than forcing one flat fee, Shiv Band designs three structured package tiers that adapt to your exact venue, date, and family preferences.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#builder"
              className="btn-primary"
            >
              <span>Build Custom Package</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={telLink(0)} className="btn-outline">
              <Phone className="h-4 w-4 text-maroon" /> {SITE.phones[0].display}
            </a>
          </div>
        </div>
      </section>

      {/* The 3 Package Tiers */}
      <section className="border-t border-sand-dark bg-sand/30 py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Tier Comparisons"
            title="Our 3 Signature Baraat Packages"
            intro="Full transparency on every musical instrument, uniform, and procession element included."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Tier 1: Traditional Baraat */}
            <div className="flex flex-col justify-between rounded-3xl border border-sand-dark bg-white p-7 sm:p-8 shadow-xs">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-stone">
                  Tier 1 • Community &amp; Colony Weddings
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                  Traditional Baraat
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone">
                  Ideal for intimate family ghudchadi processions, residential colonies, and local banquet entries.
                </p>

                <div className="mt-6 border-t border-sand-dark pt-5">
                  <div className="text-xs font-bold uppercase text-maroon tracking-wider mb-3">
                    What&apos;s Included:
                  </div>
                  <ul className="space-y-2.5 text-xs text-stone">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>11 to 15 Uniformed Brass Musicians</strong> (Trumpets, Clarinets, Bass &amp; Side Drums)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>2 Punjabi Dhol Players</strong> for high-energy bhangra beats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Calm Decorated White Ghodi</strong> with velvet chatt &amp; experienced handler</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span>Mobile trolley battery lighting setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span>Classic Bollywood &amp; Punjabi wedding playlist</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-sand-dark pt-5">
                <a
                  href={whatsappLink(
                    "Hello Manish Ji, I would like to check availability and get a quote for the Traditional Baraat Package."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full justify-center text-center text-xs py-3"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Request Quote on WhatsApp
                </a>
              </div>
            </div>

            {/* Tier 2: Grand Celebration (Highlighted) */}
            <div className="relative flex flex-col justify-between rounded-3xl border-2 border-gold bg-white p-7 sm:p-8 shadow-xl">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[11px] font-black uppercase tracking-wider text-ink shadow-sm">
                <span>Most Popular Choice</span>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-gold-dark mt-1">
                  Tier 2 • Banquet Halls &amp; Grand Avenues
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                  Grand Celebration
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone">
                  Our premier balanced package for banquet halls and road processions across Delhi NCR.
                </p>

                <div className="mt-6 border-t border-sand-dark pt-5">
                  <div className="text-xs font-bold uppercase text-maroon tracking-wider mb-3">
                    What&apos;s Included:
                  </div>
                  <ul className="space-y-2.5 text-xs text-stone">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>17 to 21 Master Brass Artists</strong> with synchronized melody &amp; harmony</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>2 to 4 Punjabi Dhol Players</strong> in matching royal kurtas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Choice of White Ghodi OR Fresh Floral Decorated Baggi</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Mobile Crystal Chhatri Lights</strong> with silent generator unit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span>Grand entry fanfare and family favorite tunes</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-sand-dark pt-5">
                <a
                  href={whatsappLink(
                    "Hello Manish Ji, I would like to check availability and get a quote for the Grand Celebration Package."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center text-center text-xs py-3"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Request Quote on WhatsApp
                </a>
              </div>
            </div>

            {/* Tier 3: Royal Maharaja VIP */}
            <div className="flex flex-col justify-between rounded-3xl border border-sand-dark bg-white p-7 sm:p-8 shadow-xs">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-stone">
                  Tier 3 • Luxury Farmhouses &amp; Resorts
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink flex items-center gap-2">
                  <span>Royal Maharaja VIP</span>
                  <Crown className="h-5 w-5 text-gold" />
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone">
                  The ultimate royal entry for Chattarpur, Gurugram, and destination-style farmhouse celebrations.
                </p>

                <div className="mt-6 border-t border-sand-dark pt-5">
                  <div className="text-xs font-bold uppercase text-maroon tracking-wider mb-3">
                    What&apos;s Included:
                  </div>
                  <ul className="space-y-2.5 text-xs text-stone">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>25 to 31+ Grand Brass Orchestra</strong> in royal velvet attire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>4 to 6 Master Punjabi Dholis</strong> with live bhangra choreographies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Royal Chariot Rath OR Chauffeured Vintage Car</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Dual-Flank Crystal Chhatri Lights</strong> + road chandelier lighting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span><strong>Safa / Turban Tying Crew</strong> for key family members</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-sand-dark pt-5">
                <a
                  href={whatsappLink(
                    "Hello Manish Ji, I would like to check availability and get a quote for the Royal Maharaja VIP Package."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full justify-center text-center text-xs py-3"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Request Quote on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Builder Anchor */}
      <section id="builder" className="container py-16 sm:py-20">
        <PackageBuilder />
      </section>

      {/* Why Prices Vary Section */}
      <section className="border-t border-sand-dark bg-sand/30 py-16">
        <div className="container max-w-4xl">
          <SectionHeading
            eyebrow="Budgeting Guide"
            title="Why Are Band Prices Not Fixed on the Internet?"
            intro="Honest advice for families budgeting for their Delhi wedding."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-sand-dark bg-white p-6 shadow-2xs">
              <h4 className="font-bold text-sm text-ink mb-2">1. Zero Surge Pricing (No Season Hikes)</h4>
              <p className="text-xs text-stone leading-relaxed">
                Unlike aggregators who inflate fees during peak wedding dates, Shiv Band charges honest family rates with no seasonal surge markups. Your quote depends solely on the musicians, vehicles, and equipment you choose.
              </p>
            </div>

            <div className="rounded-2xl border border-sand-dark bg-white p-6 shadow-2xs">
              <h4 className="font-bold text-sm text-ink mb-2">2. Route &amp; Distance Logistics</h4>
              <p className="text-xs text-stone leading-relaxed">
                A 45-minute baraat in nearby Krishna Nagar involves minimal transit. Farmhouse corridors in Chattarpur, Sohna Road, or Greater Noida require specialized animal carriers and transport vans.
              </p>
            </div>

            <div className="rounded-2xl border border-sand-dark bg-white p-6 shadow-2xs">
              <h4 className="font-bold text-sm text-ink mb-2">3. Package Bundling Advantage</h4>
              <p className="text-xs text-stone leading-relaxed">
                Hiring separate vendors for ghodi, dhol, brass band, and lights multiplies your coordination headaches and costs. Shiv Band bundles all services under one roof, saving up to 30%.
              </p>
            </div>

            <div className="rounded-2xl border border-sand-dark bg-white p-6 shadow-2xs">
              <h4 className="font-bold text-sm text-ink mb-2">4. Direct Owner Booking</h4>
              <p className="text-xs text-stone leading-relaxed">
                Unlike third-party portal aggregators who charge 40% to 50% commission, you speak directly with owner Manish Kumar. You get genuine family rates and guaranteed accountability.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/guides/wedding-band-cost-delhi"
              className="inline-flex items-center gap-2 text-xs font-bold text-maroon hover:text-gold transition-colors"
            >
              <span>Read our complete 2026 Delhi Wedding Band Budget Guide</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-16 sm:py-20 max-w-3xl">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Baraat Packages &amp; Pricing FAQ"
          intro="Answers to common questions regarding wedding band booking in Delhi."
        />

        <div className="mt-10">
          <Faq items={PACKAGE_FAQS} />
        </div>
      </section>
    </PageShell>
  );
}
