import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { PageShell } from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import SectionHeading from "@/components/site/SectionHeading";
import JsonLd from "@/components/site/JsonLd";
import { LOCATIONS } from "@/lib/locations";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE, SITE_URL, telLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Areas Served in Delhi NCR | Wedding Band, Ghodi & Dhol | Shiv Band",
  description:
    "Shiv Band serves all of Delhi NCR including Krishna Nagar, Preet Vihar, Laxmi Nagar, Shahdara, Noida, Gurugram, South Delhi, Rohini, Ghaziabad & Faridabad. Book now.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: `Areas Served Across Delhi NCR | ${SITE.name}`,
    description:
      "Wedding brass band, groom ghodi, flower baggi rath, Punjabi dhol and chhatri lights across Delhi, Noida, Gurugram, Ghaziabad and Faridabad.",
    url: "/locations",
  },
};

export default function LocationsIndexPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas Served", path: "/locations" },
  ];

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Shiv Band Areas Served in Delhi NCR",
            description: "Coverage areas and regional booking hubs for Shiv Band across Delhi NCR.",
            itemListElement: LOCATIONS.map((loc, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: loc.name,
              url: `${SITE_URL}/locations/${loc.slug}`,
              description: loc.metaDescription,
            })),
          },
        ]}
      />

      <section className="container pb-16 pt-10 sm:pt-14">
        <Breadcrumbs items={crumbs} />

        <div className="mt-8 max-w-3xl">
          <p className="eyebrow mb-4 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" />
            <span>Operational Coverage</span>
          </p>
          <h1 className="font-display text-[38px] leading-[1.06] tracking-[-0.015em] text-ink sm:text-[50px] lg:text-[58px]">
            Areas We Serve Across Delhi NCR
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-stone">
            From our Krishna Nagar headquarters established in 1996, Shiv Band brings synchronized brass music, trained white ghodis, illuminated chhatri lights, and authentic Punjabi dhol players to weddings, banquets, and farmhouses across the National Capital Region.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsAppIcon className="h-4 w-4" /> Check Availability on WhatsApp
            </a>
            <a href={telLink(0)} className="btn-outline">
              <Phone className="h-4 w-4 text-maroon" /> {SITE.phones[0].display}
            </a>
          </div>
        </div>
      </section>

      {/* Grid of Locations */}
      <section className="border-t border-sand-dark bg-sand/30 py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Local Hubs"
            title="Explore Local Wedding Services by Region"
            intro="Click your locality to view nearby banquet hall coverage, travel estimates, and direct WhatsApp booking."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group flex flex-col justify-between rounded-3xl border border-sand-dark bg-white p-7 shadow-xs transition-all hover:border-gold hover:shadow-lg"
              >
                <div>
                  <div>
                    <span className="rounded-full bg-sand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-maroon">
                      {loc.shortRegion}
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-bold text-ink group-hover:text-maroon transition-colors">
                    {loc.name}
                  </h2>

                  <p lang="hi" className="mt-1 font-hindi text-sm text-gold-dark">
                    {loc.hindi}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-stone line-clamp-2">
                    {loc.tagline}
                  </p>

                  <div className="mt-5 border-t border-sand-dark pt-4">
                    <div className="text-[11px] font-bold uppercase text-stone tracking-wider mb-2">
                      Key Venues & Colonies:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.coverageAreas.slice(0, 3).map((area) => (
                        <span
                          key={area}
                          className="rounded-md bg-sand/60 px-2 py-0.5 text-[10px] text-ink font-medium"
                        >
                          {area}
                        </span>
                      ))}
                      {loc.coverageAreas.length > 3 && (
                        <span className="text-[10px] text-stone font-bold self-center">
                          +{loc.coverageAreas.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-sand-dark pt-4 text-xs font-bold text-maroon group-hover:text-gold transition-colors">
                  <span>View Services in {loc.name}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
