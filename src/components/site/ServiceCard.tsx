import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/services";
import ServiceIcon from "./ServiceIcon";

// Arch-topped photo with a large serif number, inspired by invitation "save the date" cards.
export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const img = service.images[0];
  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <div className="relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-2xl bg-sand">
          {img ? (
            <>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 48vw"
                style={img.focus ? { objectPosition: img.focus } : undefined}
                className="photo-grade object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" aria-hidden="true" />
            </>
          ) : (
            // No real photo yet: a clean maroon arch with the service icon (never a stock or fake photo)
            <div className="absolute inset-0 flex items-center justify-center bg-maroon transition-colors duration-500 group-hover:bg-maroon-deep">
              <div className="absolute inset-3 rounded-t-[999px] rounded-b-xl border border-gold/40" aria-hidden="true" />
              <ServiceIcon name={service.icon} className="h-14 w-14 text-gold-light sm:h-20 sm:w-20" strokeWidth={1} />
            </div>
          )}
        </div>
        <span
          className="absolute -bottom-4 right-2 font-display text-[44px] italic leading-none text-gold sm:-bottom-6 sm:right-4 sm:text-[72px]"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-6 pr-8 sm:mt-8 sm:pr-16">
        <h3 className="flex items-center gap-1.5 font-display text-[19px] leading-tight text-ink sm:gap-2 sm:text-[26px]">
          {service.name}
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-gold transition-transform sm:h-5 sm:w-5 duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.5}
          />
        </h3>
        <p className="mt-2 hidden text-[15px] leading-relaxed text-stone sm:block">{service.tagline}</p>
      </div>
    </Link>
  );
}
