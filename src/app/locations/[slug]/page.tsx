import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { PageShell } from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import SectionHeading from "@/components/site/SectionHeading";
import ServiceCard from "@/components/site/ServiceCard";
import Faq from "@/components/site/Faq";
import JsonLd from "@/components/site/JsonLd";
import { LOCATIONS, getLocation } from "@/lib/locations";
import { SERVICES } from "@/lib/services";
import { breadcrumbSchema, faqSchema, locationBusinessSchema } from "@/lib/schema";
import { SITE, SITE_URL, telLink, whatsappLink } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};

  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    keywords: loc.keywords,
    alternates: { canonical: `/locations/${loc.slug}` },
    openGraph: {
      title: `${loc.metaTitle} | ${SITE.name}`,
      description: loc.metaDescription,
      url: `/locations/${loc.slug}`,
      images: [{ url: `${SITE_URL}/images/shiv-band-brass-band-procession.jpg`, alt: loc.h1 }],
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas Served", path: "/locations" },
    { name: loc.name, path: `/locations/${loc.slug}` },
  ];

  const nearbyLocations = LOCATIONS.filter((l) => l.slug !== loc.slug).slice(0, 4);
  const featuredServices = SERVICES.slice(0, 4);

  const locWhatsAppLink = whatsappLink(
    `Hello Shiv Band, I am planning a wedding in ${loc.name} and would like to check availability and package options.`
  );

  return (
    <PageShell>
      <JsonLd
        data={[
          locationBusinessSchema(loc),
          breadcrumbSchema(crumbs),
          faqSchema(loc.faqs),
        ]}
      />

      {/* Hero Section */}
      <section className="container pb-16 pt-10 sm:pt-14">
        <Breadcrumbs items={crumbs} />

        <div className="mt-8 max-w-4xl">
          <p className="eyebrow mb-5 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" />
            <span>{loc.shortRegion}</span>
          </p>

          <h1 className="font-display text-[36px] leading-[1.08] tracking-[-0.015em] text-ink sm:text-[48px] lg:text-[56px]">
            {loc.h1}
          </h1>

          <p lang="hi" className="mt-4 font-hindi text-[18px] text-maroon sm:text-[20px]">
            {loc.hindi}
          </p>

          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-stone">
            {loc.tagline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={locWhatsAppLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsAppIcon className="h-4 w-4" /> Book for {loc.name} via WhatsApp
            </a>
            <a href={telLink(0)} className="btn-outline">
              <Phone className="h-4 w-4 text-maroon" /> Call {SITE.phones[0].display}
            </a>
          </div>
        </div>
      </section>

      {/* Coverage & Famous Venues Strip */}
      <section className="border-y border-sand-dark bg-sand/40 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-maroon mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                <span>Popular Wedding Venues in {loc.name}</span>
              </h2>
              <ul className="space-y-2 text-xs text-stone">
                {loc.popularVenues.map((v) => (
                  <li key={v} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <span className="font-semibold text-ink">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-maroon mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                <span>Colonies &amp; Sectors Covered</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {loc.coverageAreas.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink border border-sand-dark shadow-2xs"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services for this Area */}
      <section className="container py-16 sm:py-20">
        <SectionHeading
          eyebrow="Baraat Services"
          title={`Baraat Services Available in ${loc.name}`}
          intro="Everything coordinated under one trusted house. No brokers, no subcontracting."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service, idx) => (
            <ServiceCard key={service.slug} service={service} index={idx} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-maroon hover:text-gold transition-colors"
          >
            <span>Explore all 9 wedding services</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Localized FAQ Section */}
      <section className="bg-sand/30 border-t border-sand-dark py-16 sm:py-20">
        <div className="container max-w-3xl">
          <SectionHeading
            eyebrow="Questions & Answers"
            title={`Booking Shiv Band in ${loc.name}`}
            intro="Common questions from families planning weddings in this area."
          />

          <div className="mt-10">
            <Faq items={loc.faqs} />
          </div>
        </div>
      </section>

      {/* Nearby Location Links */}
      <section className="container py-16">
        <h2 className="text-center font-display text-2xl text-ink sm:text-3xl">
          Also Serving Neighboring Delhi NCR Areas
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {nearbyLocations.map((n) => (
            <Link
              key={n.slug}
              href={`/locations/${n.slug}`}
              className="rounded-2xl border border-sand-dark bg-white p-5 text-center transition-all hover:border-gold hover:shadow-md group"
            >
              <div className="font-display text-base font-bold text-ink group-hover:text-maroon transition-colors">
                {n.name}
              </div>
              <div className="mt-1 text-[11px] text-stone">{n.shortRegion}</div>
              <div className="mt-3 text-[11px] font-semibold text-gold flex items-center justify-center gap-1">
                <span>View services</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
