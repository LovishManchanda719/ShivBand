import React from "react";
import Link from "next/link";
import { Clock, ExternalLink, Facebook, Instagram, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import Logo from "./Logo";
import { SERVICES } from "@/lib/services";
import { SITE, telLink, whatsappLink } from "@/lib/site";

interface FooterProps {
  // Legacy prop kept so older pages keep compiling.
  isDarkMode?: boolean;
}

const Footer: React.FC<FooterProps> = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink pb-28 pt-16 text-ivory/80 md:pb-10 md:pt-20">
      <div className="container">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12 md:gap-12">
          <div className="col-span-2 md:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-ivory/60">
              Wedding band, ghodi, baggi, dhol wale and chhatri lights from one family-run house in Krishna Nagar,
              Delhi. Since {SITE.foundingYear}.
            </p>
            <p className="mt-3 font-hindi text-[15px] text-gold-light/90" lang="hi">
              {SITE.hindiName}
            </p>
            <a
              href={SITE.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/60 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.16em] text-gold-light transition-colors hover:bg-gold/10"
            >
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} /> Review us on Google
            </a>
            <div className="mt-5 flex gap-2">
              {[
                { href: SITE.social.instagram, label: "Instagram", Icon: Instagram },
                { href: SITE.social.facebook, label: "Facebook", Icon: Facebook },
                { href: SITE.social.youtube, label: "YouTube", Icon: Youtube },
                { href: whatsappLink(), label: "WhatsApp", Icon: MessageCircle },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 transition-colors hover:border-gold hover:text-gold-light"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Services" className="col-span-1 md:col-span-3">
            <h2 className="eyebrow text-ivory/50">Services</h2>
            <ul className="mt-5 space-y-3 text-[14px]">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="transition-colors hover:text-gold-light">
                    {s.name === "Full Baraat" ? "Complete baraat package" : s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore" className="col-span-1 md:col-span-2">
            <h2 className="eyebrow text-ivory/50">Explore</h2>
            <ul className="mt-5 space-y-3 text-[14px]">
              {[
                ["/gallery/photos", "Photos"],
                ["/gallery/videos", "Videos"],
                ["/reviews", "Reviews"],
                ["/guides", "Baraat guides"],
                ["/feedback", "Write a review"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-gold-light">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="col-span-2 not-italic md:col-span-3">
            <h2 className="eyebrow text-ivory/50">Visit or call</h2>
            <ul className="mt-5 space-y-4 text-[14px]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">
                  {SITE.address.street}, {SITE.address.locality}, {SITE.address.city} {SITE.address.postalCode}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                <span>
                  <a href={telLink(0)} className="hover:text-gold-light">
                    {SITE.phones[0].display}
                  </a>
                  <br />
                  <a href={telLink(1)} className="hover:text-gold-light">
                    {SITE.phones[1].display}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                <span>{SITE.hours.label}</span>
              </li>
            </ul>
          </address>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-[12px] text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. Owner: {SITE.owner}.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-ivory">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ivory">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
