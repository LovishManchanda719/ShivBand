import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import SectionHeading from "@/components/site/SectionHeading";
import ServiceCard from "@/components/site/ServiceCard";
import ServiceIcon from "@/components/site/ServiceIcon";
import BookingForm from "@/components/site/BookingForm";
import Faq from "@/components/site/Faq";
import JsonLd from "@/components/site/JsonLd";
import { SERVICES, getService } from "@/lib/services";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { SITE, SITE_URL, telLink, whatsappLink } from "@/lib/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    keywords: s.keywords,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: `${s.metaTitle} | ${SITE.name}`,
      description: s.metaDescription,
      url: `/services/${s.slug}`,
      ...(s.images[0] ? { images: [{ url: s.images[0].src, alt: s.images[0].alt }] } : {}),
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const base = getService(slug);
  if (!base) notFound();
  const s = base;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: s.name, path: `/services/${s.slug}` },
  ];
  const related = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);
  const [lead, ...more] = s.images;

  return (
    <PageShell>
      <JsonLd
        data={[
          serviceSchema(s),
          breadcrumbSchema(crumbs),
          faqSchema(s.faqs),
          ...(s.videos || []).map((v) => ({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: `${v.title} — ${SITE.name}`,
            description: `${v.title} at a baraat in Delhi by ${SITE.name}.`,
            thumbnailUrl: `${SITE_URL}${v.poster}`,
            contentUrl: `${SITE_URL}${v.src}`,
            uploadDate: "2026-10-11",
          })),
        ]}
      />

      {/* Header: text left, arch photo right */}
      <section className="container pb-16 pt-10 sm:pt-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 flex items-center gap-3">
              <ServiceIcon name={s.icon} className="h-4 w-4 text-gold" />
              {SITE.name}
            </p>
            <h1 className="font-display text-[38px] leading-[1.06] tracking-[-0.015em] text-ink sm:text-[52px] lg:text-[60px]">
              {s.h1}
            </h1>
            <p lang="hi" className="mt-4 font-hindi text-[18px] text-maroon sm:text-[20px]">
              {s.hindi}
            </p>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-stone">{s.tagline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#book" className="btn-primary">
                Check availability
              </a>
              <a href={telLink()} className="btn-outline">
                <Phone className="h-4 w-4" strokeWidth={1.5} /> {SITE.phones[0].display}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-t-[999px] rounded-b-3xl bg-sand ring-1 ring-gold/50 ring-offset-4 ring-offset-ivory">
              {lead ? (
                <Image src={lead.src} alt={lead.alt} fill priority sizes="(min-width: 1024px) 36vw, 90vw" style={lead.focus ? { objectPosition: lead.focus } : undefined} className="photo-grade object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-maroon">
                  <ServiceIcon name={s.icon} className="h-24 w-24 text-gold-light" strokeWidth={0.9} />
                </div>
              )}
            </div>
            {s.illustrativeImages && lead && (
              <p className="mt-3 text-center text-[12px] text-stone-light">Illustrative image</p>
            )}
          </div>
        </div>
      </section>

      {/* About + includes */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="font-display text-[30px] leading-tight text-ink sm:text-[38px]">About this service</h2>
            <div className="mt-6 space-y-5 text-[16px] leading-[1.8] text-stone">
              {s.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <h3 className="eyebrow mt-10">Perfect for</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.occasions.map((o) => (
                <li key={o} className="rounded-full border border-line px-4 py-1.5 text-[14px] text-ink">
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-3xl border border-line bg-ivory p-8">
              <h2 className="font-display text-2xl text-ink">What&apos;s included</h2>
              <ul className="mt-6 space-y-4">
                {s.includes.map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                    {it}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-line pt-6 text-[14px] text-stone">
                Prices depend on date, size and combination. Call or WhatsApp for an exact quote.
              </p>
              <a
                href={whatsappLink(`Hello Shiv Band, I would like a quote for ${s.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-5 w-full bg-white"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> Get a quote on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="container py-20" aria-label={`${s.name} photos`}>
          <div className={`grid gap-4 ${more.length > 1 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {more.map((im) => (
              <div key={im.src} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
                <Image src={im.src} alt={im.alt} fill sizes="(min-width: 640px) 33vw, 90vw" className="photo-grade object-cover" />
              </div>
            ))}
          </div>
          {s.illustrativeImages && (
            <p className="mt-4 text-[12px] text-stone-light">Illustrative images. Ask us for photos and videos from recent events.</p>
          )}
          <div className="mt-8">
            <Link href="/gallery/photos" className="link-underline">
              More photos <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </section>
      )}

      {s.videos && s.videos.length > 0 && (
        <section className="container pb-20" aria-label={`${s.name} videos`}>
          <h2 className="mb-8 font-display text-[30px] leading-tight text-ink sm:text-[38px]">See it at a real baraat</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {s.videos.map((v) => (
              <figure key={v.src}>
                <video
                  src={v.src}
                  poster={v.poster}
                  controls
                  muted
                  playsInline
                  loop
                  preload="none"
                  className="aspect-[3/4] w-full rounded-2xl bg-ink object-cover"
                />
                <figcaption className="mt-2 text-[13px] text-stone">{v.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className={`container ${more.length > 0 ? "pb-20" : "py-20"}`}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title={`${s.name}: common questions`} />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={s.faqs} />
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="scroll-mt-20 bg-sand/60 py-20 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Book"
              title={`Book ${s.name} for your date`}
              intro="Send your date and venue. We will call you back to confirm — no account needed."
            />
          </div>
          <div className="rounded-3xl border border-line bg-white p-6 sm:p-10 lg:col-span-7">
            <BookingForm defaultService={s.name} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="container py-20 sm:py-24">
        <SectionHeading eyebrow="Add to your baraat" title="Other services" className="mb-14" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3">
          {related.map((r) => (
            <ServiceCard key={r.slug} service={r} index={SERVICES.indexOf(r)} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
