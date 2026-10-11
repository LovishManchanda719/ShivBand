import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items, tone = "dark" }: { items: { name: string; path: string }[]; tone?: "dark" | "light" }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] ${tone === "light" ? "text-white/70" : "text-stone"}`}>
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3 w-3 opacity-60" strokeWidth={1.5} />}
            {i === items.length - 1 ? (
              <span aria-current="page" className={tone === "light" ? "text-white" : "text-ink"}>
                {it.name}
              </span>
            ) : (
              <Link href={it.path} className="hover:underline">
                {it.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
