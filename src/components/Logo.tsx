import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "inline" | "badge";
  tone?: "dark" | "light";
  className?: string;
  onClick?: () => void;
}

// SB monogram + wordmark. "tone" switches text colour for use over photos.
export const Logo: React.FC<LogoProps> = ({ size = "md", variant = "inline", tone = "dark", className = "", onClick }) => {
  const mark = {
    sm: "h-8 w-8 text-[13px]",
    md: "h-9 w-9 text-[14px]",
    lg: "h-14 w-14 text-xl",
    xl: "h-24 w-24 text-4xl",
  }[size];

  const Monogram = (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full bg-maroon font-display font-semibold tracking-tight text-gold-light ring-1 ring-gold/70 ring-offset-2 ${
        tone === "light" ? "ring-offset-transparent" : "ring-offset-ivory"
      } ${mark}`}
      aria-hidden="true"
    >
      SB
    </span>
  );

  if (variant === "badge" || variant === "full") {
    return (
      <div onClick={onClick} className={`flex flex-col items-center text-center ${className}`}>
        {Monogram}
        <span className={`mt-3 font-display text-2xl ${tone === "light" ? "text-white" : "text-ink"}`}>Shiv Band</span>
        <span className={`eyebrow mt-1 ${tone === "light" ? "text-white/70" : ""}`}>&amp; Light House</span>
      </div>
    );
  }

  return (
    <span onClick={onClick} className={`inline-flex min-w-0 items-center gap-3 ${className}`}>
      {Monogram}
      <span className="flex min-w-0 flex-col leading-none">
        <span className={`font-display text-[19px] tracking-tight ${tone === "light" ? "text-white" : "text-ink"}`}>
          Shiv Band
        </span>
        <span
          className={`mt-1 text-[9.5px] font-medium uppercase tracking-[0.28em] ${
            tone === "light" ? "text-white/75" : "text-stone"
          }`}
        >
          &amp; Light House
        </span>
      </span>
    </span>
  );
};

export default Logo;
