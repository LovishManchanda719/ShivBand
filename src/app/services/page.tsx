import type { Metadata } from "next";
import { PageHeader, PageShell } from "@/components/site/PageShell";
import ServiceCard from "@/components/site/ServiceCard";
import JsonLd from "@/components/site/JsonLd";
import { SERVICES } from "@/lib/services";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";


export const metadata: Metadata = {
  title: "Wedding Band, Ghodi, Baggi, Dhol Wale & Lights — Services",
  description:
    "All Shiv Band & Light House services in Delhi: wedding band and baraat band, ghodi for wedding, flower baggi and rath, dhol wale, chhatri lights and complete baraat packages.",
  alternates: { canonical: "/services" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default async function ServicesPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: SERVICES.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.h1,
              url: `${SITE_URL}/services/${s.slug}`,
            })),
          },
        ]}
      />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Services"
        title={
          <>
            Band, ghodi, baggi, <em className="italic text-maroon">dhol</em> &amp; lights
          </>
        }
        intro="Everything for the baraat from one family-run house in Krishna Nagar. Book any service on its own, or combine them into a complete baraat."
      />
      <section className="container pb-24 sm:pb-32">
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
