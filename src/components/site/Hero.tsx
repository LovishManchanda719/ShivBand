import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, ChevronDown, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import { SITE, telLink } from "@/lib/site";
import { SERVICES } from "@/lib/services";

// Framed full-bleed photo with the name set large in the centre — the "invitation" look.
export default function Hero() {
  const quick = SERVICES.slice(0, 5);
  return (
    <section className="p-2 sm:p-3 lg:p-4">
      <div className="relative isolate flex h-[calc(100svh-1rem)] min-h-[600px] max-h-[960px] flex-col overflow-hidden rounded-[22px] bg-ink ring-1 ring-gold/60 sm:h-[calc(100svh-1.5rem)] sm:rounded-frame lg:h-[calc(100svh-2rem)]">
        <Image
          src={SITE.heroImage.desktop}
          alt="Shiv Band & Light House brass band leading a night baraat in Delhi"
          fill
          priority
          sizes="100vw"
          className="photo-grade -z-20 hidden scale-[1.02] object-cover md:block"
        />
        <Image
          src={SITE.heroImage.mobile}
          alt="Shiv Band musicians walking with crystal chhatri lights in a Delhi baraat"
          fill
          priority
          sizes="100vw"
          className="photo-grade -z-20 object-cover md:hidden"
        />
        {/* Readability + warm tone */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/30 to-black/75" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-[#4a2412]/25 mix-blend-multiply" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-3 -z-10 rounded-[16px] border border-white/15 sm:inset-4 sm:rounded-[20px]"
          aria-hidden="true"
        />

        <Navbar variant="overlay" />

        <div className="flex flex-1 flex-col items-center justify-center px-6 pt-16 text-center text-white">
          <p className="animate-fade-up text-[11px] font-medium uppercase tracking-[0.32em] text-white/80 sm:text-[12px]">
            Since {SITE.foundingYear} <span className="mx-2 text-gold-light">·</span> Krishna Nagar, Delhi
          </p>
          <h1 className="mt-5 animate-fade-up [animation-delay:120ms]">
            <span className="block font-display text-[64px] leading-[0.95] tracking-[-0.02em] sm:text-[104px] lg:text-[136px]">
              Shiv Band
            </span>
            <span className="mt-1 block font-display text-[30px] italic leading-tight text-white/95 sm:text-[48px] lg:text-[60px]">
              &amp; Light House
            </span>
            <span className="mt-6 block text-[11px] font-medium uppercase tracking-[0.26em] text-white/85 sm:text-[13px]">
              Wedding band · Ghodi · Baggi · Dhol wale · Lights
            </span>
          </h1>

          <div className="mt-9 flex w-full max-w-sm animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:max-w-none sm:w-auto sm:flex-row">
            <Link href="/contact#book" className="btn-ghost-light">
              <CalendarCheck className="h-4 w-4" strokeWidth={1.5} /> Check your date
            </Link>
            <a href={telLink()} className="btn-light hidden sm:inline-flex">
              <Phone className="h-4 w-4" strokeWidth={1.5} /> {SITE.phones[0].display}
            </a>
          </div>
        </div>

        <nav aria-label="Services" className="hidden pb-8 md:block">
          <ul className="flex items-center justify-center gap-5 text-[11px] font-medium uppercase tracking-[0.24em] text-white/75">
            {quick.map((s, i) => (
              <li key={s.slug} className="flex items-center gap-5">
                {i > 0 && <span className="h-px w-6 bg-white/40" aria-hidden="true" />}
                <Link href={`/services/${s.slug}`} className="transition-colors hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#about" aria-label="Scroll down" className="mx-auto mb-6 text-white/70 md:hidden">
          <ChevronDown className="h-6 w-6 animate-bounce" strokeWidth={1.25} />
        </a>
      </div>
    </section>
  );
}
