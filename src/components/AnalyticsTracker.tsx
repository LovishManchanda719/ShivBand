"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackAnalyticsEvent } from "@/lib/analytics";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);
  const scrollTrackedPath = useRef<string | null>(null);

  // Track route page_view and 30-second active engagement
  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || lastTrackedPath.current === pathname) {
      return;
    }
    lastTrackedPath.current = pathname;

    trackAnalyticsEvent("page_view", {
      page_title: typeof document !== "undefined" ? document.title : pathname,
    });

    const timer = setTimeout(() => {
      trackAnalyticsEvent("engaged_30s", { page_path: pathname });
    }, 30000);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Track 75% scroll depth per page
  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    const handleScroll = () => {
      if (scrollTrackedPath.current === pathname) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (docHeight > 200 && scrollTop / docHeight >= 0.75) {
        scrollTrackedPath.current = pathname;
        trackAnalyticsEvent("scroll_75_percent", { page_path: pathname });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Global listener for high-intent conversion clicks (Call, WhatsApp, Social links)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (anchor && anchor.href) {
        const href = anchor.href.toLowerCase();
        if (href.startsWith("tel:")) {
          trackAnalyticsEvent("phone_call_click", {
            phone_number: href.replace("tel:", ""),
          });
        } else if (href.includes("wa.me") || href.includes("whatsapp.com")) {
          trackAnalyticsEvent("whatsapp_inquiry_click", {
            destination: "whatsapp_link",
          });
        } else if (
          href.includes("instagram.com") ||
          href.includes("facebook.com") ||
          href.includes("youtube.com")
        ) {
          trackAnalyticsEvent("social_link_click", {
            platform: href,
          });
        }
      }

      const button = target.closest("button");
      if (button) {
        const titleOrText = (
          (button.getAttribute("title") || "") +
          " " +
          (button.textContent || "")
        ).toLowerCase();
        if (titleOrText.includes("whatsapp")) {
          trackAnalyticsEvent("whatsapp_inquiry_click", {
            destination: "whatsapp_button",
          });
        }
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
