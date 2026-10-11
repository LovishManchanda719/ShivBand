import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { PageHeader, PageShell } from "@/components/site/PageShell";
import BookingForm from "@/components/site/BookingForm";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE, telLink, whatsappLink } from "@/lib/site";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        eyebrow="Contact & booking"
        title={
          <>
            Book Shiv Band for your <em className="italic text-maroon">date</em>
          </>
        }
        intro={`Call or WhatsApp the owner, ${SITE.owner}, or send your date below. No account needed.`}
      />

      <section id="book" className="container scroll-mt-20 pb-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="rounded-3xl border border-line bg-white p-6 sm:p-10 lg:col-span-7">
            <h2 className="mb-8 font-display text-3xl text-ink">Check availability</h2>
            <BookingForm />
          </div>

          <aside className="space-y-4 lg:col-span-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a href={telLink(0)} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-gold">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-maroon text-ivory">
                  <Phone className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="eyebrow block">Call</span>
                  <span className="font-display text-xl text-ink">{SITE.phones[0].display}</span>
                </span>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-gold"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="eyebrow block">WhatsApp</span>
                  <span className="font-display text-xl text-ink">Message us</span>
                </span>
              </a>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <ul className="space-y-5 text-[15px]">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <span className="text-stone">
                    <span className="block font-medium text-ink">{SITE.name}</span>
                    {SITE.address.street}, {SITE.address.locality}, {SITE.address.city} {SITE.address.postalCode}
                  </span>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <span className="text-stone">
                    <a href={telLink(0)} className="hover:text-ink">
                      {SITE.phones[0].display}
                    </a>
                    <span className="mx-2">/</span>
                    <a href={telLink(1)} className="hover:text-ink">
                      {SITE.phones[1].display}
                    </a>
                  </span>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <a href={`mailto:${SITE.email}`} className="break-all text-stone hover:text-ink">
                    {SITE.email}
                  </a>
                </li>
                <li className="flex gap-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <span className="text-stone">{SITE.hours.label}</span>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl border border-line bg-white">
              <iframe
                src={SITE.mapsEmbed}
                title="Map to Shiv Band & Light House, Krishna Nagar, Delhi"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-t border-line py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-ink hover:bg-sand/50"
              >
                <Navigation className="h-4 w-4" strokeWidth={1.5} /> Get directions
              </a>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
