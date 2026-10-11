import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "./Breadcrumbs";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  );
}

interface HeaderProps {
  title: React.ReactNode;
  eyebrow?: string;
  intro?: React.ReactNode;
  crumbs?: { name: string; path: string }[];
  children?: React.ReactNode;
}

// Simple, airy page header used on every inner page.
export function PageHeader({ title, eyebrow, intro, crumbs, children }: HeaderProps) {
  return (
    <header className="container pb-12 pt-10 sm:pb-16 sm:pt-14">
      {crumbs && <Breadcrumbs items={crumbs} />}
      <div className="mt-8 max-w-3xl">
        {eyebrow && (
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-[40px] leading-[1.05] tracking-[-0.015em] text-ink sm:text-[56px] lg:text-[68px]">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-stone">{intro}</p>}
      </div>
      {children}
    </header>
  );
}
