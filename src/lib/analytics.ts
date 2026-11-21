"use client";

import { logEvent, setConsent } from "firebase/analytics";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth, initFirebaseAnalytics } from "./firebaseConfig";

import { ADMIN_EMAIL } from "./admin";
export { ADMIN_EMAIL };

export const ANALYTICS_CONSENT_KEY = "sb_analytics_consent";

// Known admin visitor IDs or suffixes (e.g. Guest #c318bc, Guest #3195cf) that must never be tracked or counted
export const ADMIN_EXCLUDED_VISITOR_IDS: string[] = ["c318bc", "3195cf"];

export const isExcludedVisitorId = (visitorId?: string | null): boolean => {
  if (!visitorId) return false;
  const vid = visitorId.toLowerCase();
  return ADMIN_EXCLUDED_VISITOR_IDS.some((id) => {
    const target = id.toLowerCase();
    return vid.endsWith(target) || vid.includes(target);
  });
};

export type AnalyticsEventName =
  | "page_view"
  | "phone_call_click"
  | "whatsapp_inquiry_click"
  | "booking_submitted"
  | "review_submitted"
  | "gallery_photo_view"
  | "gallery_video_play"
  | "social_link_click"
  | "engaged_30s"
  | "scroll_75_percent";

export interface GeoLocationInfo {
  city: string;
  region: string;
  country: string;
  postal: string;
  isp: string;
  ip: string;
  latitude: number | null;
  longitude: number | null;
}

export interface VisitorProfile {
  visitorId: string;
  sessionId: string;
  isReturningVisitor: boolean;
  visitCount: number;
  userId: string;
  userEmail: string;
  userName: string;
  deviceType: "mobile" | "tablet" | "desktop";
  os: string;
  browser: string;
  screenResolution: string;
  connectionType: string;
  language: string;
  timezone: string;
  trafficSource: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

const generateId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "sb_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
};

const detectDeviceType = (ua: string): "mobile" | "tablet" | "desktop" => {
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

const detectOS = (ua: string): string => {
  if (/windows nt/i.test(ua)) return "Windows";
  if (/android/i.test(ua)) return "Android";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/macintosh|mac os x/i.test(ua)) return "macOS";
  if (/linux/i.test(ua)) return "Linux";
  return "Other";
};

const detectBrowser = (ua: string): string => {
  if (/Instagram/i.test(ua)) return "Instagram In-App";
  if (/FBAN|FBAV/i.test(ua)) return "Facebook In-App";
  if (/Edg\//i.test(ua)) return "Microsoft Edge";
  if (/OPR\//i.test(ua)) return "Opera";
  if (/Chrome\//i.test(ua)) return "Google Chrome";
  if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) return "Apple Safari";
  if (/Firefox\//i.test(ua)) return "Mozilla Firefox";
  return "Other";
};

const classifyTrafficSource = (ref: string, utmSource: string): string => {
  const s = (utmSource || ref || "").toLowerCase();
  if (!s) return "Direct";
  if (s.includes("google.")) return "Google Search";
  if (s.includes("bing.") || s.includes("msn.")) return "Bing Search";
  if (s.includes("instagram.")) return "Instagram";
  if (s.includes("facebook.") || s.includes("fb.")) return "Facebook";
  if (s.includes("youtube.") || s.includes("youtu.be")) return "YouTube";
  if (s.includes("wa.me") || s.includes("whatsapp.")) return "WhatsApp";
  if (s.includes("justdial.")) return "Justdial";
  if (s.includes("indiamart.")) return "IndiaMART";
  if (s.includes("github.")) return "GitHub";
  return "Referral";
};

let geoPromise: Promise<GeoLocationInfo> | null = null;

export const getVisitorGeoLocation = async (): Promise<GeoLocationInfo> => {
  const defaultGeo: GeoLocationInfo = {
    city: "Unknown",
    region: "Unknown",
    country: "India",
    postal: "",
    isp: "",
    ip: "",
    latitude: null,
    longitude: null,
  };
  if (typeof window === "undefined") return defaultGeo;

  try {
    const cached = sessionStorage.getItem("sb_geo_info");
    if (cached) return JSON.parse(cached) as GeoLocationInfo;
  } catch {
    // ignore storage errors
  }

  // Approximate city comes from our own server (hosting provider's location headers).
  // The IP address is never sent to third parties or stored.
  if (!geoPromise) {
    geoPromise = fetch("/api/geo", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { city?: string; region?: string; country?: string } | null) => {
        const info: GeoLocationInfo = {
          ...defaultGeo,
          city: d?.city || "Unknown",
          region: d?.region || "Unknown",
          country: d?.country || "India",
        };
        try {
          sessionStorage.setItem("sb_geo_info", JSON.stringify(info));
        } catch {
          // ignore
        }
        return info;
      })
      .catch(() => defaultGeo);
  }
  return geoPromise;
};

export const getVisitorProfile = (): VisitorProfile | null => {
  if (typeof window === "undefined") return null;

  try {
    let visitorId = localStorage.getItem("sb_visitor_id");
    let isReturningVisitor = true;
    if (!visitorId) {
      visitorId = generateId();
      localStorage.setItem("sb_visitor_id", visitorId);
      isReturningVisitor = false;
    }

    // Automatically silence analytics if this visitor is identified as the admin
    if (isExcludedVisitorId(visitorId)) {
      try {
        localStorage.setItem("sb_analytics_opt_out", "true");
        localStorage.setItem("sb_is_admin", "true");
      } catch {
        // ignore
      }
    }

    let sessionId = sessionStorage.getItem("sb_session_id");
    let visitCount = parseInt(localStorage.getItem("sb_visit_count") || "0", 10);
    if (!sessionId) {
      sessionId = generateId();
      sessionStorage.setItem("sb_session_id", sessionId);
      visitCount += 1;
      localStorage.setItem("sb_visit_count", String(visitCount));
    }

    const ua = navigator.userAgent || "";
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source") || "";
    const utmMedium = params.get("utm_medium") || "";
    const utmCampaign = params.get("utm_campaign") || "";
    const referrer = document.referrer || "";

    const navWithConn = navigator as Navigator & {
      connection?: { effectiveType?: string };
    };
    const connectionType = navWithConn.connection?.effectiveType || "unknown";

    return {
      visitorId,
      sessionId,
      isReturningVisitor: isReturningVisitor && visitCount > 1,
      visitCount: Math.max(1, visitCount),
      userId: auth.currentUser?.uid || "guest",
      userEmail: "",
      userName: "",
      deviceType: detectDeviceType(ua),
      os: detectOS(ua),
      browser: detectBrowser(ua),
      screenResolution: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
      connectionType,
      language: navigator.language || "en-IN",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata",
      trafficSource: classifyTrafficSource(referrer, utmSource),
      referrer: referrer.slice(0, 300),
      utmSource: utmSource.slice(0, 100),
      utmMedium: utmMedium.slice(0, 100),
      utmCampaign: utmCampaign.slice(0, 100),
    };
  } catch {
    return null;
  }
};

export const isBotOrCrawler = (): boolean => {
  if (typeof window === "undefined" || typeof navigator === "undefined") return true;
  if (navigator.webdriver) return true;
  const ua = (navigator.userAgent || "").toLowerCase();
  const botTokens = [
    "bot",
    "crawl",
    "spider",
    "slurp",
    "headless",
    "phantom",
    "puppeteer",
    "playwright",
    "selenium",
    "ahrefs",
    "semrush",
    "petalbot",
    "bingpreview",
    "facebookexternalhit",
    "yandex",
    "baiduspider",
    "duckduckbot",
  ];
  return botTokens.some((token) => ua.includes(token));
};

export const isForeignTraffic = (geo?: GeoLocationInfo | null): boolean => {
  if (!geo) return false;
  const country = (geo.country || "").toUpperCase();
  // Shiv Band exclusively serves India / Delhi NCR weddings.
  // Foreign hits (US/EU cloud datacenters) are automated crawlers & security scanners.
  if (country && country !== "INDIA" && country !== "IN" && country !== "UNKNOWN") {
    return true;
  }
  const city = (geo.city || "").toLowerCase();
  const region = (geo.region || "").toLowerCase();
  const foreignDatacenters = [
    "dallas",
    "boydton",
    "the dalles",
    "council bluffs",
    "des moines",
    "san jose",
    "phoenix",
    "ashburn",
    "seattle",
    "boardman",
    "dublin",
    "frankfurt",
  ];
  return foreignDatacenters.some((hub) => city.includes(hub) || region.includes(hub));
};

export const trackAnalyticsEvent = async (
  eventName: AnalyticsEventName,
  metadata: Record<string, string | number | boolean> = {}
): Promise<void> => {
  if (typeof window === "undefined") return;

  try {
    // 0. NEVER track local development, localhost, or preview runs
    const hostname = window.location.hostname;
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.endsWith(".local") ||
      process.env.NODE_ENV === "development"
    ) {
      return;
    }

    // 1. Permanently ignore automated scrapers, headless browsers, and bots
    if (isBotOrCrawler()) return;

    // Anonymous analytics run by default (no IP, no name/email, no third-party lookups).
    // Visitors can switch them off on the privacy page or if identified as admin/excluded.
    if (localStorage.getItem("sb_analytics_opt_out") === "true") return;
    if (localStorage.getItem("sb_is_admin") === "true") return;
    if (localStorage.getItem("sb_exclude_me") === "true") return;

    // Do not track if current user is logged in as the verified admin
    if (auth.currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      try {
        localStorage.setItem("sb_is_admin", "true");
        localStorage.setItem("sb_analytics_opt_out", "true");
      } catch {
        // ignore
      }
      return;
    }

    const currentVid = localStorage.getItem("sb_visitor_id");
    if (isExcludedVisitorId(currentVid)) {
      try {
        localStorage.setItem("sb_is_admin", "true");
        localStorage.setItem("sb_analytics_opt_out", "true");
      } catch {
        // ignore
      }
      return;
    }

    const path = window.location.pathname || "/";
    // Don't pollute visitor analytics with admin dashboard actions
    if (path.startsWith("/admin")) return;

    const profile = getVisitorProfile();
    const geo = await getVisitorGeoLocation();

    // 2. Filter out foreign traffic and cloud datacenter bots
    if (isForeignTraffic(geo)) return;
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // 1. Log to Firebase / Google Analytics 4 (if enabled)
    const ga = await initFirebaseAnalytics();
    if (ga) {
      setConsent({ ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
      logEvent(ga, eventName as string, {
        page_path: path,
        traffic_source: profile?.trafficSource || "Direct",
        device_type: profile?.deviceType || "unknown",
        city: geo.city,
        region: geo.region,
        ...metadata,
      });
    }

    // 2. Log to First-Party Firestore `siteAnalytics` collection (Privacy-masked IP, no raw GPS)
    if (profile) {
      await addDoc(collection(db, "siteAnalytics"), {
        eventName,
        path: path.slice(0, 150),
        visitorId: profile.visitorId,
        sessionId: profile.sessionId,
        isReturningVisitor: profile.isReturningVisitor,
        visitCount: profile.visitCount,
        userId: auth.currentUser?.uid || profile.userId,
        // Names and emails are deliberately not stored with analytics.
        userEmail: "",
        userName: "",
        deviceType: profile.deviceType,
        os: profile.os,
        browser: profile.browser,
        screenResolution: profile.screenResolution,
        connectionType: profile.connectionType,
        language: profile.language,
        timezone: profile.timezone,
        trafficSource: profile.trafficSource,
        referrer: profile.referrer,
        utmSource: profile.utmSource,
        utmMedium: profile.utmMedium,
        utmCampaign: profile.utmCampaign,
        city: geo.city,
        region: geo.region,
        country: geo.country,
        postal: geo.postal,
        // IP address and ISP are deliberately not stored (data minimisation).
        dateString: now.toISOString().split("T")[0],
        dayOfWeek: days[now.getDay()],
        hourOfDay: now.getHours(),
        visitedAtISO: now.toISOString(),
        timestamp: serverTimestamp(),
        metadata: JSON.stringify(metadata).slice(0, 500),
      });
    }
  } catch {
    // Fail silently if offline or blocked
  }
};

export const trackEvent = trackAnalyticsEvent;

