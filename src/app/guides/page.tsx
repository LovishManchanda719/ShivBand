import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, PageShell } from "@/components/site/PageShell";
import JsonLd from "@/components/site/JsonLd";
import { GUIDES } from "@/lib/guides";
import { breadcrumbSchema } from "@/lib/schema";


export const metadata: Metadata = {
  title: "Baraat Planning Guides",
  description:
    "Practical guides for planning a baraat in Delhi — booking a wedding band, ghodi, baggi, dhol and lights, and the questions to ask before you book.",
  alternates: { canonical: "/guides" },
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
];

export default async function GuidesPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Guides"
        title={
          <>
            Planning your <em className="italic text-maroon">baraat</em>
          </>
        }
        intro="Straightforward advice from a family that has led baraats in Delhi since 1996."
      />
      <section className="container pb-24">
        <div className="grid gap-10 md:grid-cols-2">
          {GUIDES.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-sand">
                <Image src={g.image.src} alt={g.image.alt} fill sizes="(min-width: 768px) 45vw, 90vw" className="photo-grade object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <p className="eyebrow mt-5">{g.readMinutes} min read</p>
              <h2 className="mt-2 flex items-start gap-2 font-display text-2xl leading-snug text-ink">
                {g.title}
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-stone">{g.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
