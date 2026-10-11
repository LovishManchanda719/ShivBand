"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { CalendarCheck, CircleUser, LogOut, Menu, MessageCircle, Phone, ShieldCheck, UserRound, X } from "lucide-react";
import Logo from "./Logo";
import { auth } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import { ADMIN_EMAIL } from "@/lib/analytics";
import { NAV_LINKS, SITE, telLink, whatsappLink } from "@/lib/site";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  /** "overlay" sits transparently on top of the home hero photo. */
  variant?: "solid" | "overlay";
  // Legacy props kept so older pages keep compiling; the site is light-only now.
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ variant = "solid" }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const overlay = variant === "overlay";
  const isAdmin = !!user?.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/services" ? pathname.startsWith("/services") : href === "/gallery/photos" ? pathname.startsWith("/gallery") : pathname === href;

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  const linkTone = overlay ? "text-white/85 hover:text-white" : "text-stone hover:text-ink";

  const AccountButton = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={user ? "Account menu" : "Sign in"}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
            overlay ? "text-white hover:bg-white/10" : "text-ink hover:bg-sand"
          }`}
        >
          {user?.photoURL && !user.isAnonymous ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.photoURL} alt="" className="h-7 w-7 rounded-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <CircleUser className="h-5 w-5" strokeWidth={1.5} />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl border-line bg-white p-1.5 text-ink shadow-xl">
        {user && !user.isAnonymous ? (
          <>
            <DropdownMenuLabel className="px-2 py-1.5">
              <div className="truncate text-sm font-medium">{user.displayName || "Your account"}</div>
              <div className="truncate text-xs font-normal text-stone">{user.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-line" />
            {isAdmin && (
              <DropdownMenuItem onClick={() => router.push("/admin")} className="cursor-pointer gap-2 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-gold" strokeWidth={1.5} /> Admin dashboard
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer gap-2 rounded-lg">
              <UserRound className="h-4 w-4" strokeWidth={1.5} /> My bookings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer gap-2 rounded-lg">
              <LogOut className="h-4 w-4" strokeWidth={1.5} /> Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={() => router.push("/login")} className="cursor-pointer rounded-lg">
              Sign in
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/signup")} className="cursor-pointer rounded-lg">
              Create account
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      <header
        className={
          overlay
            ? "absolute inset-x-0 top-0 z-40"
            : "sticky top-0 z-40 border-b border-line/80 bg-ivory/90 backdrop-blur-md"
        }
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8 ${
            overlay ? "h-20 sm:h-24" : "h-16 sm:h-[72px]"
          }`}
        >
          <Link href="/" aria-label="Shiv Band & Light House — home" className="shrink-0">
            <Logo tone={overlay ? "light" : "dark"} />
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-[12px] font-medium uppercase tracking-[0.2em] transition-colors ${
                    isActive(l.href) ? (overlay ? "text-white" : "text-ink") : linkTone
                  }`}
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/contact#book"
              className={`hidden items-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors md:inline-flex ${
                overlay
                  ? "border-white/70 text-white hover:bg-white/10"
                  : "border-ink/20 text-ink hover:border-ink/50"
              }`}
            >
              <CalendarCheck className="h-4 w-4" strokeWidth={1.5} />
              Check date
            </Link>
            {AccountButton}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden ${
                overlay ? "text-white" : "text-ink"
              }`}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* Rendered into <body> so they always sit above page content (the home hero is its own stacking context). */}
      {mounted &&
        createPortal(
          <>
      {/* Mobile full-screen menu */}
          <div
            className={`fixed inset-0 z-50 flex flex-col bg-ivory transition-[opacity,visibility] duration-300 md:hidden ${
              open ? "visible opacity-100" : "invisible opacity-0"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="inline-flex h-10 w-10 items-center justify-center">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
              {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block py-2 font-display text-[40px] leading-tight text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-line px-8 py-6">
              <p className="eyebrow">{SITE.hours.label}</p>
              <a href={telLink()} className="block font-display text-2xl text-ink">
                {SITE.phones[0].display}
              </a>
            </div>
          </div>
    
          {/* Mobile bottom action bar — only the two actions that matter */}
          <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-ivory/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
            <a href={telLink()} className="btn-primary py-3">
              <Phone className="h-4 w-4" strokeWidth={1.75} /> Call
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-outline bg-white py-3">
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} /> WhatsApp
            </a>
          </div>
          </>,
          document.body
        )}
    </>
  );
};

export default Navbar;
