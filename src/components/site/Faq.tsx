import { ChevronDown } from "lucide-react";
import type { ServiceFaq } from "@/lib/services";

// Native <details> so every answer is in the HTML (crawlable) and works without JavaScript.
export default function Faq({ items }: { items: ServiceFaq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f, i) => (
        <details key={f.q} className="group py-1" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-[19px] leading-snug text-ink sm:text-[21px]">{f.q}</h3>
            <ChevronDown
              className="mt-1 h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180"
              strokeWidth={1.5}
            />
          </summary>
          <p className="max-w-3xl pb-6 text-[15px] leading-relaxed text-stone">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
