import React from "react";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  tone?: "dark" | "light";
  className?: string;
}

export default function SectionHeading({ eyebrow, title, intro, align = "left", as = "h2", tone = "dark", className = "" }: Props) {
  const Tag = as;
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-4 flex items-center gap-3 ${center ? "justify-center" : ""} ${tone === "light" ? "text-gold-light" : ""}`}>
          <span className={`h-px w-8 ${tone === "light" ? "bg-gold-light/60" : "bg-gold"}`} aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Tag
        className={`font-display text-[34px] leading-[1.08] tracking-[-0.01em] sm:text-[44px] lg:text-[52px] ${
          tone === "light" ? "text-ivory" : "text-ink"
        }`}
      >
        {title}
      </Tag>
      {intro && (
        <p className={`mt-5 text-[16px] leading-relaxed sm:text-[17px] ${tone === "light" ? "text-ivory/70" : "text-stone"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
