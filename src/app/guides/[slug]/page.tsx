import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle, Phone } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import ServiceCard from "@/components/site/ServiceCard";
import JsonLd from "@/components/site/JsonLd";
import { GUIDES, getGuide } from "@/lib/guides";
import { SERVICES } from "@/lib/services";
import { BUSINESS_ID, breadcrumbSchema } from "@/lib/schema";
import { SITE, SITE_URL, telLink, whatsappLink } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: {
      type: "article",
      title: g.title,
      description: g.description,
      url: `/guides/${g.slug}`,
      publishedTime: g.published,
      modifiedTime: g.updated,
      images: [{ url: g.image.src, alt: g.image.alt }],
    },
  };
}

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: g.title.split(":")[0], path: `/guides/${g.slug}` },
  ];
  const related = SERVICES.filter((s) => g.related.includes(s.slug));
  const heroSrc = g.image.src;

  return (
    <PageShell>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: g.title,
            description: g.description,
            image: `${SITE_URL}${g.image.src}`,
            datePublished: g.published,
            dateModified: g.updated,
            author: { "@type": "Organization", name: SITE.name, url: SITE_URL },
            publisher: { "@id": BUSINESS_ID },
            mainEntityOfPage: `${SITE_URL}/guides/${g.slug}`,
            inLanguage: "en-IN",
          },
          breadcrumbSchema(crumbs),
        ]}
      />

      <article>
        <header className="container max-w-3xl pb-10 pt-10 sm:pt-14">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-8 font-display text-[36px] leading-[1.08] tracking-[-0.015em] text-ink sm:text-[50px]">{g.title}</h1>
          <p className="eyebrow mt-6">
            {SITE.name} · Updated {fmt(g.updated)} · {g.readMinutes} min read
          </p>
        </header>

        <div className="container max-w-4xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-sand">
            <Image src={heroSrc} alt={g.image.alt} fill priority sizes="(min-width: 1024px) 900px, 95vw" className="photo-grade object-cover" />
          </div>
        </div>

        <div className="container max-w-3xl py-14">
          <p className="text-[19px] leading-[1.75] text-ink/85">{g.intro}</p>
          {g.sections.map((sec) => (
            <section key={sec.heading} className="mt-12">
              <h2 className="font-display text-[28px] leading-tight text-ink">{sec.heading}</h2>
              {sec.paragraphs?.map((p) => (
                <p key={p.slice(0, 30)} className="mt-4 text-[17px] leading-[1.8] text-stone">
                  {p}
                </p>
              ))}
              {sec.list && (
                <ul className="mt-5 space-y-3">
                  {sec.list.map((li) => (
                    <li key={li} className="flex gap-3 text-[17px] leading-[1.7] text-stone">
                      <Check className="mt-1.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <aside className="mt-16 rounded-3xl bg-maroon p-8 text-ivory sm:p-10">
            <p className="font-display text-3xl">Planning a baraat in Delhi NCR?</p>
            <p className="mt-3 text-ivory/75">Talk to the owner directly — band, ghodi, baggi, dhol and lights from one family-run house.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={telLink()} className="btn-light">
                <Phone className="h-4 w-4" strokeWidth={1.5} /> {SITE.phones[0].display}
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost-light">
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </article>

      <section className="container pb-24">
        <h2 className="mb-12 font-display text-3xl text-ink">Related services</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3">
          {related.map((s) => (
            <ServiceCard key={s.slug} service={s} index={SERVICES.indexOf(s)} />
          ))}
        </div>
        <p className="mt-14">
          <Link href="/guides" className="link-underline">
            All guides
          </Link>
        </p>
      </section>
    </PageShell>
  );
}
