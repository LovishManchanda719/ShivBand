import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Clock, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import Hero from "@/components/site/Hero";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/site/SectionHeading";
import ServiceCard from "@/components/site/ServiceCard";
import ServiceIcon from "@/components/site/ServiceIcon";
import ReviewsList from "@/components/site/ReviewsList";
import BookingForm from "@/components/site/BookingForm";
import Faq from "@/components/site/Faq";
import JsonLd from "@/components/site/JsonLd";
import { SERVICES } from "@/lib/services";
import { AREAS_SERVED, SITE, telLink, whatsappLink, yearsServing } from "@/lib/site";
import { HOME_FAQS, faqSchema } from "@/lib/schema";


const STEPS = [
  { title: "Call or WhatsApp", text: "Tell us your date, venue and which services you are thinking of." },
  { title: "We plan it with you", text: "Route, band size, ghodi or baggi, lights — confirmed directly with the owner." },
  { title: "We arrive on time", text: "One team, in uniform, ready before the baraat leaves." },
];

// Shown at their natural shape (no cropping). Width/height are the real file sizes.
const GALLERY = [
  { src: "/images/groom-ghodi-chhatri-lights.jpg", w: 1254, h: 1254, alt: "Groom on a decorated ghodi with chhatri lights in a Delhi baraat" },
  { src: "/images/brass-band-chhatri-lights.jpg", w: 941, h: 1672, alt: "Shiv Band brass band player with chhatri lights at a night baraat" },
  { src: "/images/shiv-band-brass-band-procession.jpg", w: 1672, h: 941, alt: "Shiv Band brass band procession with SHIV BAND drum signs" },
  { src: "/images/vintage-car/red-vintage-car-groom.jpg", w: 1086, h: 1448, alt: "Groom in a decorated red vintage car during a Delhi baraat" },
  { src: "/images/dhol-wale-baraat.jpg", w: 941, h: 1671, alt: "Dhol players before a night baraat" },
  { src: "/images/2.jpg", w: 736, h: 981, alt: "Decorated white wedding ghodi by Shiv Band" },
];

// Three highlighted services on the home page; the rest are listed as links.
const FEATURED = ["wedding-band", "ghodi-for-wedding", "baraat-package"];

export default async function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQS)} />
      <Hero />

      <main>
        {/* Intro */}
        <section id="about" className="container scroll-mt-24 py-20 sm:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-6">
              <SectionHeading
                eyebrow="Wedding band in Delhi"
                title={
                  <>
                    Baraat ki <em className="italic text-maroon">shaan</em>, from Krishna Nagar since {SITE.foundingYear}.
                  </>
                }
              />
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-10">
              <p className="text-[17px] leading-relaxed text-stone">
                Shiv Band &amp; Light House is a family-run wedding band from New Govindpura, Krishna Nagar. For{" "}
                {yearsServing()} years we have led baraats across East Delhi and Delhi NCR with a live brass band,
                decorated ghodi, flower baggi, dhol wale and crystal chhatri lights — all from one house, booked
                directly with the owner.
              </p>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
                <div>
                  <dt className="eyebrow">Since</dt>
                  <dd className="mt-2 font-display text-3xl text-ink">{SITE.foundingYear}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Owner</dt>
                  <dd className="mt-2 font-display text-xl leading-tight text-ink">{SITE.owner}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Open</dt>
                  <dd className="mt-2 font-display text-xl leading-tight text-ink">Every day</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-white py-20 sm:py-28" aria-labelledby="services-title">
          <div className="container">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="What we bring"
                title={<span id="services-title">Everything your baraat needs</span>}
                intro="Book a single service or the complete baraat. Every service is our own — no outsourcing, no middlemen."
              />
              <Link href="/services" className="link-underline shrink-0">
                All services <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
            <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0">
              {SERVICES.filter((s) => FEATURED.includes(s.slug)).map((s, i) => (
                <div key={s.slug} className="w-[72vw] max-w-[300px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                  <ServiceCard service={s} index={i} />
                </div>
              ))}
            </div>
            <div className="mt-14 border-t border-line pt-8">
              <p className="eyebrow mb-4">Also available</p>
              <ul className="flex flex-wrap gap-2">
                {SERVICES.filter((s) => !FEATURED.includes(s.slug)).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[14px] text-ink transition-colors hover:border-gold hover:bg-ivory"
                    >
                      <ServiceIcon name={s.icon} className="h-4 w-4 text-gold" />
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How booking works */}
        <section className="relative overflow-hidden bg-maroon py-20 text-ivory sm:py-28">
          <div className="container">
            <SectionHeading
              tone="light"
              eyebrow="How booking works"
              title={
                <>
                  Three steps to a <em className="italic text-gold-light">grand</em> entry
                </>
              }
            />
            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {STEPS.map((s, i) => (
                <li key={s.title} className="border-t border-ivory/20 pt-6">
                  <span className="font-display text-[56px] italic leading-none text-gold-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ivory/70">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-14 flex flex-col gap-3 sm:flex-row">
              <a href={telLink()} className="btn-light">
                <Phone className="h-4 w-4" strokeWidth={1.5} /> Call {SITE.phones[0].display}
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost-light">
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> WhatsApp us
              </a>
            </div>
          </div>
        </section>

        {/* Gallery preview */}
        <section className="container py-20 sm:py-28" aria-labelledby="gallery-title">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Gallery" title={<span id="gallery-title">From our baraats</span>} />
            <Link href="/gallery/photos" className="link-underline shrink-0">
              View all photos <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="mt-12 columns-2 gap-3 md:columns-3 md:gap-4">
            {GALLERY.map((g, i) => (
              <div key={g.src} className={`mb-3 break-inside-avoid overflow-hidden rounded-2xl bg-sand md:mb-4 ${i >= 4 ? "hidden md:block" : ""}`}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={g.w}
                  height={g.h}
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="photo-grade h-auto w-full"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-sand/60 py-20 sm:py-28" aria-labelledby="reviews-title">
          <div className="container">
            <SectionHeading
              eyebrow="Reviews"
              title={<span id="reviews-title">Words from our families</span>}
              className="mb-12"
            />
            <ReviewsList limit={3} />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={SITE.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <ExternalLink className="h-4 w-4" strokeWidth={1.75} /> Review us on Google
              </a>
              <a href={SITE.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Read Google reviews
              </a>
            </div>
          </div>
        </section>

        {/* FAQ + areas */}
        <section className="container py-20 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Good to know" title="Questions families ask" />
              <details className="group mt-12 lg:hidden">
                <summary className="eyebrow flex cursor-pointer list-none items-center justify-between border-y border-line py-4 [&::-webkit-details-marker]:hidden">
                  Areas we serve
                  <ChevronDown className="h-4 w-4 text-gold transition-transform group-open:rotate-180" strokeWidth={1.5} />
                </summary>
                <p className="pt-4 text-[15px] leading-loose text-stone">{AREAS_SERVED.join(" · ")}</p>
              </details>
              <div className="hidden lg:block">
                <h3 className="eyebrow mt-12">Areas we serve</h3>
                <p className="mt-4 text-[15px] leading-loose text-stone">
                  {AREAS_SERVED.map((a, i) => (
                    <span key={a}>
                      {a}
                      {i < AREAS_SERVED.length - 1 && <span className="mx-2 text-gold">·</span>}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Faq items={HOME_FAQS} />
            </div>
          </div>
        </section>

        {/* Booking */}
        <section id="book" className="scroll-mt-20 bg-white py-20 sm:py-28" aria-labelledby="book-title">
          <div className="container grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Book"
                title={<span id="book-title">Check your date</span>}
                intro="Send your date and we will confirm availability. Prefer talking? Call or WhatsApp the owner directly."
              />
              <ul className="mt-10 space-y-5 text-[15px]">
                <li className="flex gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <span>
                    <a href={telLink(0)} className="text-ink hover:text-maroon">
                      {SITE.phones[0].display}
                    </a>
                    <span className="mx-2 text-line">/</span>
                    <a href={telLink(1)} className="text-ink hover:text-maroon">
                      {SITE.phones[1].display}
                    </a>
                  </span>
                </li>
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-stone hover:text-ink">
                    {SITE.shortAddress}
                  </a>
                </li>
                <li className="flex gap-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <span className="text-stone">{SITE.hours.label}</span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-line bg-ivory p-6 sm:p-10 lg:col-span-7">
              <BookingForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
