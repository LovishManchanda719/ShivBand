"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebaseConfig";
import { ADMIN_EMAIL, isExcludedVisitorId } from "@/lib/analytics";
import NotifyBingButton from "@/components/admin/NotifyBingButton";
import { toast } from "@/components/ui/sonner";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import {
  ShieldCheck,
  BarChart3,
  Camera,
  Video as VideoIcon,
  Calendar,
  Users,
  Eye,
  PhoneCall,
  MessageSquare,
  MapPin,
  Globe,
  Smartphone,
  Monitor,
  Trash2,
  Plus,
  Upload,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Lock,
  Images,
  TrendingUp,
  TrendingDown,
  Download,
  X,
  ChevronDown,
  ChevronUp,
  Activity,
  CalendarDays,
} from "lucide-react";

interface AnalyticsRecord {
  id: string;
  eventName: string;
  path: string;
  visitorId: string;
  sessionId: string;
  isReturningVisitor: boolean;
  visitCount: number;
  userId: string;
  userEmail?: string;
  userName?: string;
  deviceType: string;
  os: string;
  browser: string;
  screenResolution: string;
  connectionType?: string;
  language: string;
  timezone: string;
  trafficSource: string;
  referrer: string;
  city?: string;
  region?: string;
  country?: string;
  postal?: string;
  isp?: string;
  ip?: string;
  dateString: string;
  dayOfWeek: string;
  hourOfDay: number;
  visitedAtISO: string;
  timestamp?: Timestamp;
  metadata?: string;
}

interface AdminPhoto {
  id: string;
  url: string;
  title: string;
  description?: string;
  datePosted?: Timestamp | Date;
}

interface AdminVideo {
  id: string;
  title: string;
  description: string;
  youtubeLink: string;
  uploadDate?: Timestamp | Date;
}

interface AdminBooking {
  id: string;
  userId: string;
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  additionalDetails: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt?: Timestamp | Date;
}

interface AdminReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  location?: string;
  date?: Timestamp | Date;
}

// Compress uploaded image file using HTML5 Canvas so it fits cleanly in Firestore (< 250KB WebP/JPEG)
const compressImageToDataUrl = (file: File, maxWidth = 1200, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context unavailable"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const webpData = canvas.toDataURL("image/webp", quality);
        if (webpData.length < 900000) {
          resolve(webpData);
        } else {
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        }
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = String(e.target?.result || "");
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

// Date helpers for Asia/Kolkata (IST)
const getISTDateString = (isoString?: string): string => {
  if (!isoString) return "";
  try {
    const d = new Date(isoString);
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formatter.format(d);
  } catch {
    return isoString.split("T")[0] || "";
  }
};

const getTodayISTString = (): string => {
  try {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formatter.format(new Date());
  } catch {
    return new Date().toISOString().split("T")[0];
  }
};

const getYesterdayISTString = (): string => {
  try {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formatter.format(d);
  } catch {
    return "";
  }
};

const formatRelativeTime = (iso?: string): string => {
  if (!iso) return "Just now";
  try {
    const diffMs = Date.now() - new Date(iso).getTime();
    if (diffMs < 0) return "Just now";
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return "Just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(iso).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
};

const formatDateToIST = (date: Date): string => {
  try {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formatter.format(date);
  } catch {
    return date.toISOString().split("T")[0];
  }
};

export default function AdminDashboardPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<"analytics" | "photos" | "videos" | "bookings">("analytics");
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Analytics State & Enhancements
  const [analyticsLogs, setAnalyticsLogs] = useState<AnalyticsRecord[]>([]);
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [excludeAdmin] = useState<boolean>(true);
  const [dateRangeFilter, setDateRangeFilter] = useState<"all" | "today" | "yesterday" | "7d" | "30d">("all");
  const [selectedSpecificDate, setSelectedSpecificDate] = useState<string | null>(null);
  const [fetchLimit, setFetchLimit] = useState<number>(500);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [showDetailedDailyTable, setShowDetailedDailyTable] = useState<boolean>(false);
  const [dailyChartWindow, setDailyChartWindow] = useState<7 | 14 | 30>(14);
  const [tableGroupingMode, setTableGroupingMode] = useState<"session" | "raw">("session");

  // Photo Manager State
  const [photos, setPhotos] = useState<AdminPhoto[]>([]);
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  const [photoUrlInput, setPhotoUrlInput] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoStatusMsg, setPhotoStatusMsg] = useState("");

  // Video Manager State
  const [videos, setVideos] = useState<AdminVideo[]>([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoYoutubeLink, setVideoYoutubeLink] = useState("");
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [videoStatusMsg, setVideoStatusMsg] = useState("");

  // Bookings & Reviews State
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [deletingBookingId, setDeletingBookingId] = useState<string | null>(null);

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  // Silence analytics tracking immediately on this admin browser
  useEffect(() => {
    if (isAdmin && typeof window !== "undefined") {
      try {
        localStorage.setItem("sb_is_admin", "true");
        localStorage.setItem("sb_analytics_opt_out", "true");
        const currentVid = localStorage.getItem("sb_visitor_id");
        if (currentVid) {
          localStorage.setItem("sb_admin_visitor_id", currentVid);
        }
      } catch {
        // ignore
      }
    }
  }, [isAdmin]);

  const fetchAllAdminData = async () => {
    if (!isAdmin) return;
    setIsLoadingData(true);
    try {
      // 1. Fetch Analytics Logs (up to fetchLimit events)
      try {
        const analyticsSnap = await getDocs(
          query(collection(db, "siteAnalytics"), orderBy("visitedAtISO", "desc"), limit(fetchLimit))
        );
        const logs = analyticsSnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as AnalyticsRecord[];
        setAnalyticsLogs(logs);
      } catch (err) {
        console.warn("Analytics fetch notice:", err);
      }

      // 2. Fetch Custom Photos
      try {
        const photosSnap = await getDocs(
          query(collection(db, "photos"), orderBy("datePosted", "desc"))
        );
        setPhotos(
          photosSnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as AdminPhoto[]
        );
      } catch (err) {
        console.warn("Photos fetch notice:", err);
      }

      // 3. Fetch Custom Videos
      try {
        const videosSnap = await getDocs(collection(db, "videos"));
        setVideos(
          videosSnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as AdminVideo[]
        );
      } catch (err) {
        console.warn("Videos fetch notice:", err);
      }

      // 4. Fetch Bookings
      try {
        const bookingsSnap = await getDocs(collection(db, "bookings"));
        setBookings(
          bookingsSnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as AdminBooking[]
        );
      } catch (err) {
        console.warn("Bookings fetch notice:", err);
      }

      // 5. Fetch Reviews
      try {
        const reviewsSnap = await getDocs(collection(db, "reviews"));
        setReviews(
          reviewsSnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as AdminReview[]
        );
      } catch (err) {
        console.warn("Reviews fetch notice:", err);
      }
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAllAdminData();
    }
  }, [isAdmin, fetchLimit]);

  // Auto-refresh interval (every 30s when enabled)
  useEffect(() => {
    if (!isAdmin || !autoRefresh) return;
    const interval = setInterval(() => {
      fetchAllAdminData();
    }, 30000);
    return () => clearInterval(interval);
  }, [isAdmin, autoRefresh, fetchLimit]);

  // Check if an event log originates from the admin (Guest #c318bc, admin email, or current admin browser)
  const isLogFromAdmin = (log: AnalyticsRecord): boolean => {
    if (!log) return false;
    if (log.userEmail && log.userEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase()) return true;
    if (isExcludedVisitorId(log.visitorId)) return true;
    if (log.visitorId && (log.visitorId.includes("c318bc") || log.visitorId.includes("3195cf"))) return true;
    if (typeof window !== "undefined") {
      const localVid = localStorage.getItem("sb_visitor_id");
      if (localVid && localVid.length > 5 && log.visitorId === localVid) return true;
      const adminVid = localStorage.getItem("sb_admin_visitor_id");
      if (adminVid && adminVid.length > 5 && log.visitorId === adminVid) return true;
    }
    return false;
  };

  // When excludeAdmin is true (default), completely strip out Guest #c318bc and admin events
  const effectiveBaseLogs = useMemo(() => {
    if (excludeAdmin) {
      return analyticsLogs.filter((l) => !isLogFromAdmin(l));
    }
    return analyticsLogs;
  }, [analyticsLogs, excludeAdmin]);

  // Per-day website traffic aggregation (Requirement 2)
  const dailyStats = useMemo(() => {
    const dayMap: Record<
      string,
      {
        date: string;
        pageViews: number;
        uniqueVisitors: Set<string>;
        totalEvents: number;
        callClicks: number;
        whatsappClicks: number;
        bookingClicks: number;
        engaged: number;
        pageCounts: Record<string, number>;
      }
    > = {};

    effectiveBaseLogs.forEach((l) => {
      const dStr = getISTDateString(l.visitedAtISO) || l.dateString || "Unknown";
      if (!dayMap[dStr]) {
        dayMap[dStr] = {
          date: dStr,
          pageViews: 0,
          uniqueVisitors: new Set(),
          totalEvents: 0,
          callClicks: 0,
          whatsappClicks: 0,
          bookingClicks: 0,
          engaged: 0,
          pageCounts: {},
        };
      }
      const entry = dayMap[dStr];
      entry.totalEvents += 1;
      if (l.visitorId) entry.uniqueVisitors.add(l.visitorId);

      if (l.eventName === "page_view") {
        entry.pageViews += 1;
        const p = l.path || "/";
        entry.pageCounts[p] = (entry.pageCounts[p] || 0) + 1;
      } else if (l.eventName === "phone_call_click") {
        entry.callClicks += 1;
      } else if (l.eventName === "whatsapp_inquiry_click") {
        entry.whatsappClicks += 1;
      } else if (l.eventName === "booking_submitted") {
        entry.bookingClicks += 1;
      } else if (l.eventName === "engaged_30s" || l.eventName === "scroll_75_percent") {
        entry.engaged += 1;
      }
    });

    const todayIST = getTodayISTString();
    const yesterdayIST = getYesterdayISTString();

    const entries = Object.values(dayMap).map((d) => {
      const isToday = d.date === todayIST;
      const isYesterday = d.date === yesterdayIST;

      let displayDate = d.date;
      let shortDay = "";
      let fullDisplayDate = d.date;
      let dayOfWeek = "";

      try {
        const parts = d.date.split("-").map(Number);
        if (parts.length === 3) {
          const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
          displayDate = dateObj.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          });
          shortDay = dateObj.toLocaleDateString("en-IN", { weekday: "short" });
          dayOfWeek = dateObj.toLocaleDateString("en-IN", { weekday: "long" });
          fullDisplayDate = `${displayDate} (${shortDay})`;
        }
      } catch {}

      let topPage = "/";
      let maxP = 0;
      Object.entries(d.pageCounts).forEach(([p, cnt]) => {
        if (cnt > maxP) {
          maxP = cnt;
          topPage = p;
        }
      });

      return {
        date: d.date,
        displayDate,
        shortDay,
        dayOfWeek,
        fullDisplayDate,
        isToday,
        isYesterday,
        pageViews: d.pageViews,
        uniqueVisitors: d.uniqueVisitors.size,
        totalEvents: d.totalEvents,
        inquiries: d.callClicks + d.whatsappClicks + d.bookingClicks,
        callClicks: d.callClicks,
        whatsappClicks: d.whatsappClicks,
        engaged: d.engaged,
        topPage,
      };
    });

    // Sort newest to oldest
    entries.sort((a, b) => b.date.localeCompare(a.date));
    return entries;
  }, [effectiveBaseLogs]);

  // Generate a true, continuous calendar timeline of the last N days (7, 14, 30)
  const chartDays = useMemo(() => {
    const todayIST = getTodayISTString();
    const yesterdayIST = getYesterdayISTString();

    const statsMap = new Map<string, (typeof dailyStats)[0]>();
    dailyStats.forEach((d) => statsMap.set(d.date, d));

    const result: Array<{
      date: string;
      displayDate: string;
      shortDay: string;
      fullDisplayDate: string;
      isToday: boolean;
      isYesterday: boolean;
      pageViews: number;
      uniqueVisitors: number;
      inquiries: number;
      engaged: number;
      topPage: string;
    }> = [];

    for (let i = dailyChartWindow - 1; i >= 0; i--) {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() - i);
      const dateKey = formatDateToIST(targetDate);

      const existing = statsMap.get(dateKey);
      const isToday = dateKey === todayIST;
      const isYesterday = dateKey === yesterdayIST;

      const displayDate = targetDate.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "short",
      });
      const shortDay = targetDate.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
      });
      const dayOfWeek = targetDate.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        weekday: "long",
      });
      const fullDisplayDate = `${displayDate} (${dayOfWeek})`;

      if (existing) {
        result.push({
          ...existing,
          displayDate,
          shortDay,
          fullDisplayDate,
          isToday,
          isYesterday,
        });
      } else {
        result.push({
          date: dateKey,
          displayDate,
          shortDay,
          fullDisplayDate,
          isToday,
          isYesterday,
          pageViews: 0,
          uniqueVisitors: 0,
          inquiries: 0,
          engaged: 0,
          topPage: "—",
        });
      }
    }

    return result;
  }, [dailyStats, dailyChartWindow]);

  const maxDailyViews = useMemo(() => {
    const max = Math.max(...chartDays.map((d) => d.pageViews), 1);
    return max;
  }, [chartDays]);

  const dailySummary = useMemo(() => {
    const today = chartDays.find((d) => d.isToday);
    const yesterday = chartDays.find((d) => d.isYesterday);

    const viewsToday = today?.pageViews || 0;
    const viewsYesterday = yesterday?.pageViews || 0;
    const uniqueToday = today?.uniqueVisitors || 0;
    const inquiriesToday = today?.inquiries || 0;

    const diff = viewsToday - viewsYesterday;
    let diffLabel = "";
    if (viewsYesterday === 0 && viewsToday > 0) {
      diffLabel = `+${viewsToday} vs yesterday`;
    } else if (viewsYesterday > 0) {
      const pct = Math.round((diff / viewsYesterday) * 100);
      diffLabel = pct >= 0 ? `+${pct}% vs yesterday` : `${pct}% vs yesterday`;
    } else {
      diffLabel = "0 vs yesterday";
    }

    const last7 = chartDays.slice(-7);
    const totalViewsLast7 = last7.reduce((acc, d) => acc + d.pageViews, 0);
    const avgDailyViews = (totalViewsLast7 / Math.max(1, last7.length)).toFixed(1);

    const peakDay =
      dailyStats.length > 0
        ? [...dailyStats].sort((a, b) => b.pageViews - a.pageViews)[0]
        : null;

    const totalUniqueAll = new Set(effectiveBaseLogs.map((l) => l.visitorId).filter(Boolean)).size;
    const totalInquiriesAll = effectiveBaseLogs.filter(
      (l) =>
        l.eventName === "phone_call_click" ||
        l.eventName === "whatsapp_inquiry_click" ||
        l.eventName === "booking_submitted"
    ).length;

    const convRate =
      totalUniqueAll > 0 ? ((totalInquiriesAll / totalUniqueAll) * 100).toFixed(1) : "0";

    return {
      viewsToday,
      viewsYesterday,
      diff,
      diffLabel,
      uniqueToday,
      inquiriesToday,
      avgDailyViews,
      peakDay,
      convRate,
      totalInquiriesAll,
    };
  }, [chartDays, dailyStats, effectiveBaseLogs]);

  // Date range filtering
  const dateFilteredLogs = useMemo(() => {
    const logs = effectiveBaseLogs;
    const todayIST = getTodayISTString();
    const yesterdayIST = getYesterdayISTString();

    if (selectedSpecificDate) {
      return logs.filter((l) => {
        const d = getISTDateString(l.visitedAtISO) || l.dateString;
        return d === selectedSpecificDate;
      });
    }

    if (dateRangeFilter === "today") {
      return logs.filter((l) => {
        const d = getISTDateString(l.visitedAtISO) || l.dateString;
        return d === todayIST;
      });
    }

    if (dateRangeFilter === "yesterday") {
      return logs.filter((l) => {
        const d = getISTDateString(l.visitedAtISO) || l.dateString;
        return d === yesterdayIST;
      });
    }

    if (dateRangeFilter === "7d") {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 7);
      const cutoffISO = cutoff.toISOString();
      return logs.filter((l) => (l.visitedAtISO || "") >= cutoffISO);
    }

    if (dateRangeFilter === "30d") {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 30);
      const cutoffISO = cutoff.toISOString();
      return logs.filter((l) => (l.visitedAtISO || "") >= cutoffISO);
    }

    return logs;
  }, [effectiveBaseLogs, dateRangeFilter, selectedSpecificDate]);

  // Analytics Aggregations on effectiveBaseLogs (or dateFilteredLogs when active)
  const stats = useMemo(() => {
    const targetLogs = dateRangeFilter === "all" && !selectedSpecificDate ? effectiveBaseLogs : dateFilteredLogs;
    const pageViews = targetLogs.filter((l) => l.eventName === "page_view");
    const uniqueVisitorIds = new Set(targetLogs.map((l) => l.visitorId).filter(Boolean));
    const returningVisitors = new Set(
      targetLogs.filter((l) => l.isReturningVisitor).map((l) => l.visitorId).filter(Boolean)
    );
    const callClicks = targetLogs.filter((l) => l.eventName === "phone_call_click").length;
    const whatsappClicks = targetLogs.filter(
      (l) => l.eventName === "whatsapp_inquiry_click"
    ).length;
    const engagedSessions = targetLogs.filter(
      (l) => l.eventName === "engaged_30s" || l.eventName === "scroll_75_percent"
    ).length;

    // 1. Group by unique visitorId so breakdown widgets report UNIQUE VISITORS
    const visitorFirstLogMap = new Map<string, (typeof targetLogs)[0]>();
    const pageUniqueVisitorsMap: Record<string, Set<string>> = {};

    targetLogs.forEach((l) => {
      const vid = l.visitorId;
      if (!vid) return;

      if (!visitorFirstLogMap.has(vid)) {
        visitorFirstLogMap.set(vid, l);
      }

      if (l.eventName === "page_view") {
        const p = l.path || "/";
        if (!pageUniqueVisitorsMap[p]) {
          pageUniqueVisitorsMap[p] = new Set();
        }
        pageUniqueVisitorsMap[p].add(vid);
      }
    });

    // Top Cities by Unique Visitors
    const cityCounts: Record<string, number> = {};
    // Top Sources by Unique Visitors
    const sourceCounts: Record<string, number> = {};
    // Devices by Unique Visitors
    const deviceCounts: Record<string, number> = { mobile: 0, desktop: 0, tablet: 0 };

    visitorFirstLogMap.forEach((firstLog) => {
      const cityLabel =
        firstLog.city && firstLog.city !== "Unknown"
          ? `${firstLog.city}${firstLog.region && firstLog.region !== "Unknown" ? `, ${firstLog.region}` : ""}`
          : "Delhi NCR / India";
      cityCounts[cityLabel] = (cityCounts[cityLabel] || 0) + 1;

      const src = firstLog.trafficSource || "Direct";
      sourceCounts[src] = (sourceCounts[src] || 0) + 1;

      const dev = (firstLog.deviceType || "mobile") as "mobile" | "desktop" | "tablet";
      if (deviceCounts[dev] !== undefined) {
        deviceCounts[dev]++;
      } else {
        deviceCounts.mobile++;
      }
    });

    // Top Pages by Unique Visitors
    const pageCounts: Record<string, number> = {};
    Object.entries(pageUniqueVisitorsMap).forEach(([p, set]) => {
      pageCounts[p] = set.size;
    });

    const sortEntries = (obj: Record<string, number>) =>
      Object.entries(obj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

    return {
      totalEvents: targetLogs.length,
      totalPageViews: pageViews.length,
      uniqueVisitors: uniqueVisitorIds.size,
      returningVisitors: returningVisitors.size,
      callClicks,
      whatsappClicks,
      engagedSessions,
      topCities: sortEntries(cityCounts),
      topSources: sortEntries(sourceCounts),
      topPages: sortEntries(pageCounts),
      deviceCounts,
    };
  }, [effectiveBaseLogs, dateFilteredLogs, dateRangeFilter, selectedSpecificDate]);

  // Main Table Logs - Micro-events are shown by default
  const filteredLogs = useMemo(() => {
    return dateFilteredLogs.filter((log) => {
      if (eventFilter !== "all" && log.eventName !== eventFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hay = `${log.city || ""} ${log.region || ""} ${log.userEmail || ""} ${
          log.userName || ""
        } ${log.path || ""} ${log.trafficSource || ""} ${log.os || ""} ${
          log.browser || ""
        } ${log.isp || ""} ${(log.visitorId || "").slice(-6)}`.toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
  }, [dateFilteredLogs, eventFilter, searchQuery]);

  // Grouped by Visitor Session (Consolidates repetitive rows for the same visitor into 1 clean summary)
  const groupedSessions = useMemo(() => {
    const map = new Map<
      string,
      {
        visitorId: string;
        userEmail?: string;
        city?: string;
        region?: string;
        postal?: string;
        isp?: string;
        deviceType: string;
        browser: string;
        os: string;
        screenResolution: string;
        trafficSource: string;
        latestVisitedAtISO: string;
        dayOfWeek: string;
        totalEvents: number;
        pageViews: number;
        inquiries: number;
        engaged: number;
        pages: string[];
        isReturningVisitor: boolean;
        visitCount: number;
        logIds: string[];
      }
    >();

    filteredLogs.forEach((log) => {
      const vid = log.visitorId || log.userId || "anonymous";
      let existing = map.get(vid);
      if (!existing) {
        existing = {
          visitorId: vid,
          userEmail: log.userEmail,
          city: log.city,
          region: log.region,
          postal: log.postal,
          isp: log.isp,
          deviceType: log.deviceType,
          browser: log.browser,
          os: log.os,
          screenResolution: log.screenResolution,
          trafficSource: log.trafficSource,
          latestVisitedAtISO: log.visitedAtISO,
          dayOfWeek: log.dayOfWeek,
          totalEvents: 0,
          pageViews: 0,
          inquiries: 0,
          engaged: 0,
          pages: [],
          isReturningVisitor: log.isReturningVisitor,
          visitCount: log.visitCount || 1,
          logIds: [],
        };
        map.set(vid, existing);
      }

      existing.totalEvents += 1;
      existing.logIds.push(log.id);

      if (log.eventName === "page_view") {
        existing.pageViews += 1;
        const p = log.path || "/";
        if (!existing.pages.includes(p)) {
          existing.pages.push(p);
        }
      } else if (
        log.eventName === "phone_call_click" ||
        log.eventName === "whatsapp_inquiry_click" ||
        log.eventName === "booking_submitted"
      ) {
        existing.inquiries += 1;
      } else if (log.eventName === "engaged_30s" || log.eventName === "scroll_75_percent") {
        existing.engaged += 1;
      }

      if (log.visitedAtISO && (!existing.latestVisitedAtISO || log.visitedAtISO > existing.latestVisitedAtISO)) {
        existing.latestVisitedAtISO = log.visitedAtISO;
      }
    });

    return Array.from(map.values()).sort(
      (a, b) => (b.latestVisitedAtISO || "").localeCompare(a.latestVisitedAtISO || "")
    );
  }, [filteredLogs]);

  // Permanently delete all events for a specific visitor (e.g. spam bot or test session)
  const handleDeleteVisitorLogs = (visitorId: string, displayName: string) => {
    const targetLogs = analyticsLogs.filter((l) => l.visitorId === visitorId);
    if (targetLogs.length === 0) return;

    toast(`Delete all activity for ${displayName}?`, {
      description: `Permanently delete all ${targetLogs.length} events logged for this visitor from Firestore?`,
      action: {
        label: "Delete All",
        onClick: async () => {
          try {
            for (const l of targetLogs) {
              await deleteDoc(doc(db, "siteAnalytics", l.id));
            }
            setAnalyticsLogs((prev) => prev.filter((l) => l.visitorId !== visitorId));
            toast.success(`Deleted ${targetLogs.length} events for ${displayName}.`);
          } catch (err) {
            console.error("Error deleting visitor logs:", err);
            toast.error("Failed to delete visitor activity.");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 6000,
    });
  };

  // Delete a single log entry from Firestore
  const handleDeleteSingleLog = (logId: string) => {
    toast("Delete log entry?", {
      description: "Delete this activity log entry from Firestore?",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteDoc(doc(db, "siteAnalytics", logId));
            setAnalyticsLogs((prev) => prev.filter((l) => l.id !== logId));
            toast.success("Activity log entry deleted.");
          } catch (err) {
            console.error("Error deleting log:", err);
            toast.error("Failed to delete log entry.");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 6000,
    });
  };

  // Export current filtered logs to CSV
  const handleExportCsv = () => {
    if (filteredLogs.length === 0) {
      toast.warning("No logs to export with current filters.");
      return;
    }
    const headers = [
      "Time (IST)",
      "Relative",
      "Date",
      "Event",
      "Location",
      "Region",
      "Visitor Identity",
      "Returning",
      "Visit Count",
      "Device",
      "OS",
      "Browser",
      "Screen",
      "Traffic Source",
      "Page Path",
      "Referrer",
    ];
    const rows = filteredLogs.map((l) => [
      `"${formatTimeIST(l.visitedAtISO)}"`,
      `"${formatRelativeTime(l.visitedAtISO)}"`,
      `"${l.dateString || ""}"`,
      `"${l.eventName}"`,
      `"${l.city || "Unknown"}"`,
      `"${l.region || ""}"`,
      `"${l.userEmail || `Guest #${(l.visitorId || "").slice(-6)}`}"`,
      `"${l.isReturningVisitor ? "Yes" : "No"}"`,
      `"${l.visitCount || 1}"`,
      `"${l.deviceType || ""}"`,
      `"${l.os || ""}"`,
      `"${l.browser || ""}"`,
      `"${l.screenResolution || ""}"`,
      `"${l.trafficSource || "Direct"}"`,
      `"${l.path || "/"}"`,
      `"${(l.referrer || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `shivband_analytics_${getTodayISTString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${filteredLogs.length} analytics records to CSV.`);
  };

  // Handle File Selection & Compression for Photo Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }
    try {
      setPhotoStatusMsg("Compressing & optimizing photo...");
      const compressedDataUrl = await compressImageToDataUrl(file);
      setPhotoPreview(compressedDataUrl);
      setPhotoUrlInput(compressedDataUrl);
      setPhotoStatusMsg("Photo ready to publish!");
    } catch (err) {
      console.error("Image compression error:", err);
      toast.error("Failed to process image file.");
    }
  };

  // Publish New Photo to Firestore `photos`
  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = (photoPreview || photoUrlInput).trim();
    if (!finalUrl || !photoTitle.trim()) {
      toast.warning("Please provide a Photo Title and either upload an image or enter an image URL.");
      return;
    }

    setIsUploadingPhoto(true);
    setPhotoStatusMsg("");
    try {
      const docRef = await addDoc(collection(db, "photos"), {
        title: photoTitle.trim().slice(0, 120),
        description: (
          photoDescription.trim() ||
          "Captured live during our wedding band & fancy lighting performance."
        ).slice(0, 500),
        url: finalUrl,
        datePosted: Timestamp.now(),
      });

      setPhotos((prev) => [
        {
          id: docRef.id,
          title: photoTitle.trim(),
          description: photoDescription.trim(),
          url: finalUrl,
          datePosted: new Date(),
        },
        ...prev,
      ]);

      setPhotoStatusMsg("Photo added to Gallery successfully!");
      setPhotoTitle("");
      setPhotoDescription("");
      setPhotoUrlInput("");
      setPhotoPreview("");
      toast.success("Photo added to Gallery successfully!");
    } catch (err) {
      console.error("Error adding photo:", err);
      toast.error(
        "Failed to add photo. Make sure you have published the updated firestore.rules in Firebase Console!"
      );
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleDeletePhoto = (photoId: string, title?: string) => {
    toast(title ? `Remove "${title}"?` : "Remove photo from gallery?", {
      description: "Are you sure you want to remove this photo from the gallery?",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteDoc(doc(db, "photos", photoId));
            setPhotos((prev) => prev.filter((p) => p.id !== photoId));
            toast.success("Photo removed from gallery.");
          } catch (err) {
            console.error("Error deleting photo:", err);
            toast.error("Failed to delete photo.");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 6000,
    });
  };

  // Publish New Video to Firestore `videos`
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim() || !videoYoutubeLink.trim()) {
      toast.warning("Please enter both a Video Title and a YouTube Link.");
      return;
    }

    setIsUploadingVideo(true);
    setVideoStatusMsg("");
    try {
      const docRef = await addDoc(collection(db, "videos"), {
        title: videoTitle.trim().slice(0, 150),
        description: (
          videoDescription.trim() ||
          "Live wedding baraat performance by Shiv Band & Light House."
        ).slice(0, 500),
        youtubeLink: videoYoutubeLink.trim(),
        youtubeUrl: videoYoutubeLink.trim(),
        uploadDate: Timestamp.now(),
      });

      setVideos((prev) => [
        {
          id: docRef.id,
          title: videoTitle.trim(),
          description: videoDescription.trim(),
          youtubeLink: videoYoutubeLink.trim(),
          uploadDate: new Date(),
        },
        ...prev,
      ]);

      setVideoTitle("");
      setVideoDescription("");
      setVideoYoutubeLink("");
      setVideoStatusMsg("Video added to Video Gallery!");
      toast.success("Video added to Video Gallery!");
    } catch (err) {
      console.error("Error adding video:", err);
      toast.error("Failed to add video. Check Firestore rules in Firebase Console.");
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleDeleteVideo = (videoId: string, title?: string) => {
    toast(title ? `Remove "${title}"?` : "Remove video from gallery?", {
      description: "Are you sure you want to remove this video from the gallery?",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteDoc(doc(db, "videos", videoId));
            setVideos((prev) => prev.filter((v) => v.id !== videoId));
            toast.success("Video removed from gallery.");
          } catch (err) {
            console.error("Error deleting video:", err);
            toast.error("Failed to delete video.");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 6000,
    });
  };

  // Update Booking Status
  const handleUpdateBookingStatus = async (
    bookingId: string,
    newStatus: "pending" | "confirmed" | "cancelled"
  ) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
      toast.success(`Booking marked as ${newStatus}`);
    } catch (err) {
      console.error("Error updating booking:", err);
      toast.error("Failed to update booking status.");
    }
  };

  // Delete Booking
  const handleDeleteBooking = (bookingId: string, customerName?: string) => {
    toast(customerName ? `Delete booking for ${customerName}?` : "Delete event booking?", {
      description: "Are you sure you want to permanently delete this event booking?",
      action: {
        label: "Delete",
        onClick: async () => {
          setDeletingBookingId(bookingId);
          try {
            await deleteDoc(doc(db, "bookings", bookingId));
            setBookings((prev) => prev.filter((b) => b.id !== bookingId));
            toast.success("Event booking deleted successfully.");
          } catch (err) {
            console.error("Error deleting booking:", err);
            toast.error("Failed to delete booking.");
          } finally {
            setDeletingBookingId(null);
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 6000,
    });
  };

  const handleDeleteReview = (reviewId: string, reviewerName?: string) => {
    toast(reviewerName ? `Delete review by ${reviewerName}?` : "Delete customer review?", {
      description: "Are you sure you want to delete this customer review?",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteDoc(doc(db, "reviews", reviewId));
            setReviews((prev) => prev.filter((r) => r.id !== reviewId));
            toast.success("Customer review deleted.");
          } catch (err) {
            console.error("Error deleting review:", err);
            toast.error("Failed to delete review.");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 6000,
    });
  };

  const handleManualRefresh = async () => {
    await fetchAllAdminData();
    toast.success("Dashboard data refreshed!");
  };

  const formatTimeIST = (iso?: string) => {
    if (!iso) return "Just now";
    try {
      return new Date(iso).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return iso;
    }
  };

  const getEventBadge = (eventName: string) => {
    switch (eventName) {
      case "phone_call_click":
        return "bg-maroon/15 text-emerald-400 border-maroon/30";
      case "whatsapp_inquiry_click":
        return "bg-green-500/15 text-green-400 border-green-500/30";
      case "booking_submitted":
        return "bg-gold/15 text-gold border-gold/30";
      case "review_submitted":
        return "bg-purple-500/15 text-purple-400 border-purple-500/30";
      case "gallery_photo_view":
      case "gallery_video_play":
        return "bg-cyan-500/15 text-cyan-400 border-cyan-500/30";
      case "engaged_30s":
      case "scroll_75_percent":
        return "bg-maroon/15 text-gold border-maroon/30";
      default:
        return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    }
  };

  // Loading Screen while Firebase Auth initializes session
  if (authLoading) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center ${
          isDarkMode ? "bg-gray-950 text-white" : "bg-ivory text-ink"
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-maroon" />
          <p className="text-xs font-bold uppercase tracking-widest text-stone">
            Verifying Admin Authorization...
          </p>
        </div>
      </div>
    );
  }

  // Unauthorized / Not Logged In Screen
  if (!isAdmin) {
    return (
      <div
        className={`min-h-screen flex flex-col ${
          isDarkMode ? "bg-gray-950 text-white" : "bg-ivory text-ink"
        }`}
      >
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow flex items-center justify-center px-4 pt-10 pb-16">
          <div
            className={`max-w-md w-full p-8 rounded-2xl border text-center shadow-2xl ${
              isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black mb-2">Admin Access Required</h1>
            <p
              className={`text-xs sm:text-sm mb-6 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {user ? (
                <>
                  You are currently signed in as{" "}
                  <strong className="text-gold">{user.email}</strong>. This
                  dashboard is restricted exclusively to{" "}
                  <strong className="text-maroon">{ADMIN_EMAIL}</strong>.
                </>
              ) : (
                <>
                  Please sign in with the administrator account (
                  <strong className="text-maroon">{ADMIN_EMAIL}</strong>) to view
                  visitor analytics and manage gallery photos.
                </>
              )}
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl bg-maroon text-white font-bold text-sm shadow-lg"
            >
              Sign In as Administrator
            </Link>
          </div>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-ivory text-ink"
      }`}
    >
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-grow container mx-auto px-3 sm:px-6 lg:px-8 pt-10 sm:pt-10 pb-20 max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Admin • {ADMIN_EMAIL}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-normal tracking-tight">
              Shiv Band Command Center
            </h1>
            <p
              className={`text-xs sm:text-sm mt-1 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Real-time visitor tracking, location &amp; lead intelligence, and
              gallery photo/video management.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <NotifyBingButton />
            <button
              onClick={handleManualRefresh}
              disabled={isLoadingData}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-maroon hover:bg-maroon-deep text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoadingData ? "animate-spin" : ""}`}
              />
              <span>{isLoadingData ? "Refreshing..." : "Refresh Live Data"}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
          {[
            {
              id: "analytics",
              label: "Visitor Analytics & Locations",
              icon: BarChart3,
              badge: stats.totalPageViews,
            },
            {
              id: "photos",
              label: "Add / Manage Gallery Photos",
              icon: Camera,
              badge: photos.length,
            },
            {
              id: "videos",
              label: "Video Gallery Manager",
              icon: VideoIcon,
              badge: videos.length,
            },
            {
              id: "bookings",
              label: "Event Bookings & Reviews",
              icon: Calendar,
              badge: bookings.length,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as "analytics" | "photos" | "videos" | "bookings"
                  )
                }
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                  active
                    ? "bg-maroon text-white shadow-lg"
                    : isDarkMode
                    ? "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    active
                      ? "bg-black/25 text-white"
                      : "bg-maroon/15 text-maroon"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: VISITOR ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            {/* 1. Range Filter & Real-Time Controls Toolbar */}
            <div
              className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                  <CalendarDays className="w-3.5 h-3.5 text-gold" /> Range:
                </span>
                {[
                  { id: "all" as const, label: "All Time" },
                  { id: "today" as const, label: "Today" },
                  { id: "yesterday" as const, label: "Yesterday" },
                  { id: "7d" as const, label: "Last 7 Days" },
                  { id: "30d" as const, label: "Last 30 Days" },
                ].map((item) => {
                  const active = !selectedSpecificDate && dateRangeFilter === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedSpecificDate(null);
                        setDateRangeFilter(item.id);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? "bg-maroon text-white shadow-sm"
                          : isDarkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}

                {selectedSpecificDate && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gold/15 text-gold border border-gold/30 text-xs font-bold">
                    <span>Filtered: {selectedSpecificDate}</span>
                    <button
                      onClick={() => setSelectedSpecificDate(null)}
                      className="hover:text-white"
                      title="Clear single date filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all ${
                    autoRefresh
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : isDarkMode
                      ? "bg-gray-800 text-gray-400 border-gray-700"
                      : "bg-gray-100 text-gray-600 border-gray-300"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      autoRefresh ? "bg-emerald-400 animate-pulse" : "bg-gray-500"
                    }`}
                  />
                  <span>{autoRefresh ? "Live Stream (30s)" : "Auto-Refresh Off"}</span>
                </button>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-gray-400">Fetch:</span>
                  <select
                    value={fetchLimit}
                    onChange={(e) => setFetchLimit(Number(e.target.value))}
                    className={`px-2 py-1 rounded-lg border text-xs outline-none ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value={100}>100 events</option>
                    <option value={300}>300 events</option>
                    <option value={500}>500 events</option>
                    <option value={1000}>1000 events</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. KPI Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div
                className={`p-4 rounded-2xl border ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between text-blue-500 mb-2">
                  <Eye className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase">Views</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black">
                  {stats.totalPageViews}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  Page Views {dateRangeFilter !== "all" || selectedSpecificDate ? "in filter" : ""}
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between text-maroon mb-2">
                  <Users className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase">Unique</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black">
                  {stats.uniqueVisitors}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  {stats.returningVisitors} Returning Visitors
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between text-maroon mb-2">
                  <PhoneCall className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase">Calls</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {stats.callClicks}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  Phone Number Clicks
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between text-green-500 mb-2">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase">WhatsApp</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-green-400">
                  {stats.whatsappClicks}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  WhatsApp Inquiries
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between text-gold mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase">Bookings</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gold">
                  {bookings.length}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  Event Bookings Saved
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between text-purple-500 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase">Engaged</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black">
                  {stats.engagedSessions}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  30s+ / Deep Scrolls
                </div>
              </div>
            </div>

            {/* 4. WEBSITE TRAFFIC & DAILY VIEWS TREND */}
            <div
              className={`p-6 rounded-2xl border ${
                isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-gold" />
                      <span>Website Traffic &amp; Daily Views Trend</span>
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-maroon/15 text-gold border border-maroon/30">
                      Per-Day Breakdown
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Daily view breakdown with unique visitor counts and direct leads. Click any day column to filter the table below.
                  </p>
                </div>

                {/* Window Selector (7, 14, 30 days) */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 self-start sm:self-auto">
                  {([7, 14, 30] as const).map((days) => (
                    <button
                      key={days}
                      onClick={() => setDailyChartWindow(days)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        dailyChartWindow === days
                          ? "bg-maroon text-white shadow-sm"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Daily Bar Graph */}
              {chartDays.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-400">
                  No daily traffic logs recorded yet.
                </div>
              ) : (
                <div>
                  <div className="overflow-x-auto pb-2">
                    <div className="flex items-stretch gap-1.5 sm:gap-2.5 min-w-[550px] pt-4">
                    {chartDays.map((d) => {
                      const isSelected = selectedSpecificDate === d.date;
                      const hasViews = d.pageViews > 0;
                      const heightPx = hasViews
                        ? Math.max(12, Math.round((d.pageViews / maxDailyViews) * 155))
                        : 4;

                      return (
                        <div
                          key={d.date}
                          onClick={() =>
                            setSelectedSpecificDate(isSelected ? null : d.date)
                          }
                          className="flex-1 min-w-[38px] max-w-[62px] flex flex-col items-center group cursor-pointer select-none"
                          title={`${d.fullDisplayDate}: ${d.pageViews} views, ${d.uniqueVisitors} visitors, ${d.inquiries} inquiries`}
                        >
                          {/* 1. Bar Plotting Area (Fixed 176px h-44, bottom-aligned baseline) */}
                          <div className="w-full h-44 flex flex-col items-center justify-end relative pb-0 border-b-2 border-gray-200 dark:border-gray-800">
                            {/* Views badge above bar */}
                            <div
                              className={`text-[11px] font-black mb-1.5 transition-colors ${
                                hasViews
                                  ? isDarkMode
                                    ? "text-gray-100 group-hover:text-gold"
                                    : "text-gray-900 group-hover:text-maroon font-black"
                                  : isDarkMode
                                  ? "text-gray-600"
                                  : "text-gray-400"
                              }`}
                            >
                              {hasViews ? d.pageViews : 0}
                            </div>

                            {/* Bar - strictly flush on the bottom baseline */}
                            {hasViews ? (
                              <div
                                style={{ height: `${heightPx}px` }}
                                className={`w-full rounded-t-xl transition-all duration-300 relative ${
                                  isSelected
                                    ? "ring-2 ring-gold ring-offset-2 ring-offset-white dark:ring-offset-gray-900 bg-gradient-to-t from-gold to-amber-300 shadow-md"
                                    : d.isToday
                                    ? "bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-lg shadow-emerald-500/25"
                                    : d.date === dailySummary.peakDay?.date
                                    ? "bg-gradient-to-t from-maroon to-gold shadow-md"
                                    : isDarkMode
                                    ? "bg-gradient-to-t from-maroon/80 to-rose-700/80 group-hover:from-maroon group-hover:to-rose-500"
                                    : "bg-gradient-to-t from-maroon to-rose-600 group-hover:brightness-110"
                                }`}
                              />
                            ) : (
                              <div className="w-full h-[4px] rounded-t-sm bg-gray-200 dark:bg-gray-800 group-hover:bg-maroon/40 transition-colors" />
                            )}
                          </div>

                          {/* 2. Day & Date Labels - Strictly below the baseline axis */}
                          <div className="mt-2 text-center w-full flex flex-col items-center">
                            <div className="text-[10px] font-bold text-gray-400 uppercase leading-tight">
                              {d.shortDay}
                            </div>
                            <div
                              className={`text-[10px] font-semibold whitespace-nowrap mt-0.5 leading-tight ${
                                d.isToday
                                  ? "text-emerald-500 font-black"
                                  : isSelected
                                  ? "text-gold font-black"
                                  : isDarkMode
                                  ? "text-gray-300"
                                  : "text-gray-700"
                              }`}
                            >
                              {d.displayDate}
                            </div>
                            <div className="h-5 flex items-center justify-center mt-1">
                              {d.isToday ? (
                                <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-black bg-emerald-500 text-white uppercase tracking-wider shadow-sm">
                                  Today
                                </span>
                              ) : d.inquiries > 0 ? (
                                <div
                                  className="flex items-center justify-center gap-0.5 text-[9px] text-green-500 font-bold"
                                  title={`${d.inquiries} direct inquiries`}
                                >
                                  <PhoneCall className="w-2.5 h-2.5" />
                                  <span>{d.inquiries}</span>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                  {/* Daily Metrics Strip */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div
                      className={`p-4 rounded-xl border ${
                        isDarkMode
                          ? "bg-gray-800/50 border-gray-800"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Today&apos;s Views
                      </div>
                      <div className="text-2xl font-black mt-1 flex items-baseline gap-2">
                        <span>{dailySummary.viewsToday}</span>
                        <span
                          className={`text-xs font-bold flex items-center ${
                            dailySummary.diff >= 0
                              ? "text-emerald-500"
                              : "text-rose-500"
                          }`}
                        >
                          {dailySummary.diff >= 0 ? (
                            <TrendingUp className="w-3 h-3 mr-0.5" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-0.5" />
                          )}
                          {dailySummary.diffLabel}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        {dailySummary.uniqueToday} unique visitors today
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-xl border ${
                        isDarkMode
                          ? "bg-gray-800/50 border-gray-800"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Yesterday&apos;s Views
                      </div>
                      <div className="text-2xl font-black mt-1">
                        {dailySummary.viewsYesterday}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        Previous day&apos;s traffic benchmark
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-xl border ${
                        isDarkMode
                          ? "bg-gray-800/50 border-gray-800"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        7-Day Average
                      </div>
                      <div className="text-2xl font-black mt-1 text-gold">
                        {dailySummary.avgDailyViews}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        Average page views per day
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-xl border ${
                        isDarkMode
                          ? "bg-gray-800/50 border-gray-800"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Peak Traffic Record
                      </div>
                      <div className="text-2xl font-black mt-1 text-emerald-400">
                        {dailySummary.peakDay ? dailySummary.peakDay.pageViews : 0}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5 truncate">
                        {dailySummary.peakDay
                          ? `${dailySummary.peakDay.fullDisplayDate}`
                          : "No data yet"}
                      </div>
                    </div>
                  </div>

                  {/* Collapsible Detailed Daily Breakdown Table */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <button
                      onClick={() =>
                        setShowDetailedDailyTable(!showDetailedDailyTable)
                      }
                      className="text-xs font-bold text-gold hover:underline flex items-center gap-1.5"
                    >
                      {showDetailedDailyTable ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                      <span>
                        {showDetailedDailyTable
                          ? "Hide Daily Breakdown Table"
                          : `View Full Daily Breakdown Table (${dailyStats.length} Days Recorded)`}
                      </span>
                    </button>

                    {showDetailedDailyTable && (
                      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
                        <table className="w-full text-left text-xs">
                          <thead
                            className={`uppercase text-[10px] tracking-wider border-b ${
                              isDarkMode
                                ? "bg-gray-950/80 border-gray-800 text-gray-400"
                                : "bg-gray-100 border-gray-200 text-gray-600"
                            }`}
                          >
                            <tr>
                              <th className="py-2.5 px-3">Date</th>
                              <th className="py-2.5 px-3">Page Views</th>
                              <th className="py-2.5 px-3">Unique Visitors</th>
                              <th className="py-2.5 px-3">Direct Inquiries</th>
                              <th className="py-2.5 px-3">Top Page</th>
                              <th className="py-2.5 px-3 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {dailyStats.map((d) => (
                              <tr
                                key={d.date}
                                className={`transition-colors ${
                                  selectedSpecificDate === d.date
                                    ? "bg-maroon/20 font-bold"
                                    : isDarkMode
                                    ? "hover:bg-gray-800/40"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                <td className="py-2.5 px-3 whitespace-nowrap font-medium">
                                  <div className="flex items-center gap-1.5">
                                    <span>{d.fullDisplayDate}</span>
                                    {d.isToday && (
                                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                        Today
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="py-2.5 px-3">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold">{d.pageViews}</span>
                                    <div className="w-16 h-1.5 bg-gray-700/30 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-maroon rounded-full"
                                        style={{
                                          width: `${Math.min(
                                            100,
                                            Math.round(
                                              (d.pageViews /
                                                (dailySummary.peakDay?.pageViews ||
                                                  1)) *
                                                100
                                            )
                                          )}%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2.5 px-3">
                                  {d.uniqueVisitors} visitors
                                </td>
                                <td className="py-2.5 px-3">
                                  {d.inquiries > 0 ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-[11px]">
                                      <PhoneCall className="w-3 h-3" /> {d.inquiries}{" "}
                                      leads
                                    </span>
                                  ) : (
                                    <span className="text-gray-500">—</span>
                                  )}
                                </td>
                                <td className="py-2.5 px-3 font-mono text-[11px] text-gray-400 truncate max-w-[200px]">
                                  {d.topPage}
                                </td>
                                <td className="py-2.5 px-3 text-right whitespace-nowrap">
                                  <button
                                    onClick={() =>
                                      setSelectedSpecificDate(
                                        selectedSpecificDate === d.date
                                          ? null
                                          : d.date
                                      )
                                    }
                                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-maroon/15 hover:bg-maroon text-gold hover:text-white border border-maroon/30 transition-all"
                                  >
                                    {selectedSpecificDate === d.date
                                      ? "Clear"
                                      : "Filter Logs"}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 5. 4 Intelligence Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Top Visitor Locations */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <h3 className="text-sm font-black uppercase tracking-wider text-maroon mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Top Visitor Locations</span>
                </h3>
                <div className="space-y-3 text-xs">
                  {stats.topCities.length === 0 ? (
                    <p className="text-gray-500">No location logs in range</p>
                  ) : (
                    stats.topCities.map(([city, count]) => (
                      <div
                        key={city}
                        className="flex items-center justify-between"
                      >
                        <span className="font-semibold truncate pr-2">
                          {city}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-maroon/10 text-gold font-bold">
                          {count}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Top Traffic Sources */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <h3 className="text-sm font-black uppercase tracking-wider text-gold mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Where Visitors Come From</span>
                </h3>
                <div className="space-y-3 text-xs">
                  {stats.topSources.length === 0 ? (
                    <p className="text-gray-500">No traffic source data</p>
                  ) : (
                    stats.topSources.map(([src, count]) => (
                      <div
                        key={src}
                        className="flex items-center justify-between"
                      >
                        <span className="font-semibold">{src}</span>
                        <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold font-bold">
                          {count}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Most Visited Pages */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <h3 className="text-sm font-black uppercase tracking-wider text-maroon mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>Most Visited Pages</span>
                </h3>
                <div className="space-y-3 text-xs">
                  {stats.topPages.length === 0 ? (
                    <p className="text-gray-500">No page views recorded</p>
                  ) : (
                    stats.topPages.map(([page, count]) => (
                      <div
                        key={page}
                        className="flex items-center justify-between"
                      >
                        <span className="font-mono font-semibold truncate pr-2">
                          {page}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-maroon/10 text-emerald-400 font-bold">
                          {count} {count === 1 ? "visitor" : "visitors"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Device Breakdown */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <h3 className="text-sm font-black uppercase tracking-wider text-purple-500 mb-4 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Visitor Devices</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-semibold">
                      <Smartphone className="w-4 h-4 text-gold" /> Mobile
                      Phones
                    </span>
                    <span className="font-bold">
                      {stats.deviceCounts.mobile || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-semibold">
                      <Monitor className="w-4 h-4 text-gold" /> Desktop /
                      Laptop
                    </span>
                    <span className="font-bold">
                      {stats.deviceCounts.desktop || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-semibold">
                      <Smartphone className="w-4 h-4 text-purple-400" /> Tablets
                    </span>
                    <span className="font-bold">
                      {stats.deviceCounts.tablet || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Live Visitor Activity Stream Table */}
            <div
              className={`rounded-2xl border overflow-hidden ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black flex items-center gap-2">
                    <Eye className="w-5 h-5 text-maroon" />
                    <span>Live Visitor Activity &amp; Location Log</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Showing who visited, their city, device, traffic source, and what they clicked.
                    {excludeAdmin ? " (Admin & dev sessions excluded)" : ""}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search city, ID, path, ISP..."
                      className={`pl-8 pr-7 py-1.5 rounded-xl border text-xs outline-none ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                      }`}
                    />
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <select
                    value={eventFilter}
                    onChange={(e) => setEventFilter(e.target.value)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold outline-none ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="all">
                      All Events ({dateFilteredLogs.length})
                    </option>
                    <option value="page_view">Page Views</option>
                    <option value="phone_call_click">Phone Call Clicks</option>
                    <option value="whatsapp_inquiry_click">WhatsApp Clicks</option>
                    <option value="booking_submitted">Bookings</option>
                    <option value="gallery_photo_view">Photo Views</option>
                    <option value="review_submitted">Reviews</option>
                    <option value="engaged_30s">30s+ Engaged</option>
                  </select>

                  <button
                    onClick={handleExportCsv}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold border bg-maroon/15 hover:bg-maroon text-gold hover:text-white border-maroon/30 transition-all flex items-center gap-1.5"
                    title="Export visible records to CSV file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Sub-Toolbar: Table View & Noise Cleaner Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-950/40 text-xs">
                {/* Left: View Mode Toggle */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-1">
                    Display:
                  </span>
                  <button
                    onClick={() => setTableGroupingMode("session")}
                    className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs ${
                      tableGroupingMode === "session"
                        ? "bg-maroon text-white shadow-sm"
                        : isDarkMode
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Grouped by Visitor ({groupedSessions.length})</span>
                  </button>
                  <button
                    onClick={() => setTableGroupingMode("raw")}
                    className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs ${
                      tableGroupingMode === "raw"
                        ? "bg-maroon text-white shadow-sm"
                        : isDarkMode
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Raw Event Stream ({filteredLogs.length})</span>
                  </button>
                </div>
              </div>

              {/* TABLE CONTAINER */}
              <div className="overflow-x-auto">
                {tableGroupingMode === "session" ? (
                  /* 1. CLEAN GROUPED BY VISITOR SESSION TABLE */
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr
                        className={`border-b uppercase text-[10px] tracking-wider ${
                          isDarkMode
                            ? "bg-gray-950/60 border-gray-800 text-gray-400"
                            : "bg-gray-100 border-gray-200 text-gray-600"
                        }`}
                      >
                        <th className="py-3 px-4">Latest Visit (IST)</th>
                        <th className="py-3 px-4">Visitor Identity &amp; Activity</th>
                        <th className="py-3 px-4">Location &amp; Network</th>
                        <th className="py-3 px-4">Device &amp; Browser</th>
                        <th className="py-3 px-4">Pages Explored &amp; Inquiries</th>
                        <th className="py-3 px-3 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {groupedSessions.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-gray-500">
                            No visitor sessions match your current filters.
                            {selectedSpecificDate && (
                              <div className="mt-2">
                                <button
                                  onClick={() => setSelectedSpecificDate(null)}
                                  className="text-gold underline font-bold"
                                >
                                  Clear {selectedSpecificDate} date filter
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ) : (
                        groupedSessions.slice(0, 50).map((sess) => (
                          <tr
                            key={sess.visitorId}
                            className={`transition-colors ${
                              isDarkMode ? "hover:bg-gray-800/40" : "hover:bg-gray-50"
                            }`}
                          >
                            {/* Time */}
                            <td className="py-3.5 px-4 whitespace-nowrap font-medium">
                              <div className="flex items-center gap-1.5">
                                <span>{formatTimeIST(sess.latestVisitedAtISO)}</span>
                                <span className="text-[10px] text-emerald-400 font-semibold">
                                  {formatRelativeTime(sess.latestVisitedAtISO)}
                                </span>
                              </div>
                              <div className="text-[10px] text-gray-400">{sess.dayOfWeek}</div>
                            </td>

                            {/* Identity */}
                            <td className="py-3.5 px-4">
                              <div className="font-bold">
                                {sess.userEmail && sess.userEmail !== "guest"
                                  ? sess.userEmail
                                  : `Guest #${sess.visitorId.slice(-6)}`}
                              </div>
                              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                <span className="text-[10px] text-maroon font-semibold">
                                  {sess.isReturningVisitor
                                    ? `Returning (Visit #${sess.visitCount})`
                                    : "First-Time Visitor"}
                                </span>
                                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-gold/15 text-gold border border-gold/25">
                                  {sess.totalEvents} actions ({sess.pageViews} views)
                                </span>
                              </div>
                            </td>

                            {/* Location */}
                            <td className="py-3.5 px-4">
                              <div className="font-bold flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-maroon shrink-0" />
                                <span>
                                  {sess.city && sess.city !== "Unknown"
                                    ? `${sess.city}, ${sess.region || ""}`
                                    : "Delhi NCR / India"}
                                </span>
                                {sess.postal && (
                                  <span className="text-[10px] text-gold">({sess.postal})</span>
                                )}
                              </div>
                              <div className="text-[10px] text-gray-400 truncate max-w-[160px]">
                                {sess.isp || "ISP Network"}
                              </div>
                            </td>

                            {/* Device */}
                            <td className="py-3.5 px-4">
                              <div className="font-semibold capitalize">
                                {sess.deviceType} • {sess.os}
                              </div>
                              <div className="text-[10px] text-gray-400 truncate max-w-[150px]">
                                {sess.browser} ({sess.screenResolution})
                              </div>
                            </td>

                            {/* Pages & Leads */}
                            <td className="py-3.5 px-4">
                              <div className="flex flex-wrap items-center gap-1 mb-1">
                                <span className="text-xs font-bold text-gold">
                                  {sess.trafficSource || "Direct"}
                                </span>
                                {sess.inquiries > 0 && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-0.5">
                                    <PhoneCall className="w-2.5 h-2.5" />
                                    <span>{sess.inquiries} Inquiries</span>
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1 max-w-[280px]">
                                {sess.pages.slice(0, 3).map((p) => (
                                  <span
                                    key={p}
                                    className="px-1.5 py-0.5 rounded font-mono text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 truncate max-w-[190px]"
                                    title={p}
                                  >
                                    {p}
                                  </span>
                                ))}
                                {sess.pages.length > 3 && (
                                  <span className="text-[10px] text-gray-400 font-bold self-center">
                                    +{sess.pages.length - 3} more
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Delete */}
                            <td className="py-3.5 px-3 text-right">
                              <button
                                onClick={() =>
                                  handleDeleteVisitorLogs(
                                    sess.visitorId,
                                    sess.userEmail || `Guest #${sess.visitorId.slice(-6)}`
                                  )
                                }
                                className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                title="Permanently delete all activity for this visitor"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                ) : (
                  /* 2. RAW EVENT-BY-EVENT STREAM TABLE */
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr
                        className={`border-b uppercase text-[10px] tracking-wider ${
                          isDarkMode
                            ? "bg-gray-950/60 border-gray-800 text-gray-400"
                            : "bg-gray-100 border-gray-200 text-gray-600"
                        }`}
                      >
                        <th className="py-3 px-4">Time (IST)</th>
                        <th className="py-3 px-4">Action / Event</th>
                        <th className="py-3 px-4">Location &amp; Network</th>
                        <th className="py-3 px-4">Visitor Identity</th>
                        <th className="py-3 px-4">Device / Browser</th>
                        <th className="py-3 px-4">Source &amp; Page</th>
                        <th className="py-3 px-3 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {filteredLogs.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-gray-500">
                            No visitor events match your filter yet.
                            {selectedSpecificDate && (
                              <div className="mt-2">
                                <button
                                  onClick={() => setSelectedSpecificDate(null)}
                                  className="text-gold underline font-bold"
                                >
                                  Clear {selectedSpecificDate} date filter
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ) : (
                        filteredLogs.slice(0, 100).map((log) => (
                          <tr
                            key={log.id}
                            className={`transition-colors ${
                              isDarkMode ? "hover:bg-gray-800/40" : "hover:bg-gray-50"
                            }`}
                          >
                            <td className="py-3 px-4 whitespace-nowrap font-medium">
                              <div className="flex items-center gap-1.5">
                                <span>{formatTimeIST(log.visitedAtISO)}</span>
                                <span className="text-[10px] text-emerald-400 font-semibold">
                                  {formatRelativeTime(log.visitedAtISO)}
                                </span>
                              </div>
                              <div className="text-[10px] text-gray-400">{log.dayOfWeek}</div>
                            </td>

                            <td className="py-3 px-4 whitespace-nowrap">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getEventBadge(
                                  log.eventName
                                )}`}
                              >
                                {log.eventName.replace(/_/g, " ")}
                              </span>
                            </td>

                            <td className="py-3 px-4">
                              <div className="font-bold flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-maroon shrink-0" />
                                <span>
                                  {log.city && log.city !== "Unknown"
                                    ? `${log.city}, ${log.region || ""}`
                                    : "Delhi / India"}
                                </span>
                                {log.postal && (
                                  <span className="text-[10px] text-gold">({log.postal})</span>
                                )}
                              </div>
                              <div className="text-[10px] text-gray-400 truncate max-w-[180px]">
                                {log.isp || log.timezone || "ISP"}
                              </div>
                            </td>

                            <td className="py-3 px-4">
                              <div className="font-bold">
                                {log.userEmail && log.userEmail !== "guest"
                                  ? log.userEmail
                                  : `Guest #${(log.visitorId || "").slice(-6)}`}
                              </div>
                              <div className="text-[10px] text-maroon font-semibold">
                                {log.isReturningVisitor
                                  ? `Returning (Visit #${log.visitCount || 2})`
                                  : "First-Time Visitor"}
                              </div>
                            </td>

                            <td className="py-3 px-4">
                              <div className="font-semibold capitalize">
                                {log.deviceType} • {log.os}
                              </div>
                              <div className="text-[10px] text-gray-400">
                                {log.browser} ({log.screenResolution})
                              </div>
                            </td>

                            <td className="py-3 px-4">
                              <div className="font-bold text-gold">
                                {log.trafficSource || "Direct"}
                              </div>
                              <div className="font-mono text-[11px] text-gray-400 truncate max-w-[180px]">
                                Page: {log.path}
                              </div>
                            </td>

                            <td className="py-3 px-3 text-right">
                              <button
                                onClick={() => handleDeleteSingleLog(log.id)}
                                className="p-1 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                title="Delete this log entry from Firestore"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PHOTO GALLERY MANAGER */}
        {activeTab === "photos" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload New Photo Form */}
            <div
              className={`p-6 rounded-2xl border h-fit ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2 className="text-xl font-black mb-1 flex items-center gap-2">
                <Plus className="w-5 h-5 text-gold" />
                <span>Add New Photo to Gallery</span>
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Upload a photo directly from your phone/PC or paste an image
                URL. It will appear immediately at the top of{" "}
                <Link
                  href="/gallery/photos"
                  className="text-gold underline"
                >
                  /gallery/photos
                </Link>
                .
              </p>

              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    1. Upload Image File from Device
                  </label>
                  <label
                    className={`flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                      isDarkMode
                        ? "border-gray-700 hover:border-maroon bg-gray-800/50"
                        : "border-gray-300 hover:border-maroon bg-gray-50"
                    }`}
                  >
                    <Upload className="w-6 h-6 text-maroon mb-1.5" />
                    <span className="text-xs font-bold">
                      Click to choose photo (JPG, PNG, WebP)
                    </span>
                    <span className="text-[10px] text-gray-400 mt-0.5">
                      Auto-compressed for fast loading
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="text-center text-[11px] text-gray-400 font-bold uppercase">
                  — OR PASTE IMAGE URL —
                </div>

                <div>
                  <input
                    type="text"
                    value={
                      photoUrlInput.startsWith("data:image/")
                        ? ""
                        : photoUrlInput
                    }
                    onChange={(e) => {
                      setPhotoUrlInput(e.target.value);
                      setPhotoPreview(e.target.value);
                    }}
                    placeholder="https://... or /images/dhol-wale-baraat.jpg"
                    className={`w-full p-3 rounded-xl border text-xs ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                {photoPreview && (
                  <div className="relative rounded-xl overflow-hidden border border-maroon/40 bg-black aspect-video">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    2. Photo Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    placeholder="e.g. Royal Groom Buggy & Brass Band in Krishna Nagar"
                    className={`w-full p-3 rounded-xl border text-xs ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    3. Short Description (SEO Caption)
                  </label>
                  <textarea
                    rows={3}
                    value={photoDescription}
                    onChange={(e) => setPhotoDescription(e.target.value)}
                    placeholder="Describe the wedding baraat, ghodi, buggy, dhol or fancy lighting setup..."
                    className={`w-full p-3 rounded-xl border text-xs ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                {photoStatusMsg && (
                  <div className="p-3 rounded-xl bg-maroon/15 border border-maroon/30 text-gold text-xs font-bold">
                    {photoStatusMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUploadingPhoto}
                  className="w-full py-3.5 rounded-xl bg-maroon text-white font-bold text-sm shadow-lg hover:opacity-95 transition-all"
                >
                  {isUploadingPhoto
                    ? "Publishing to Gallery..."
                    : "Publish Photo to Gallery"}
                </button>
              </form>
            </div>

            {/* Existing Uploaded Photos Grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black">
                  Custom Uploaded Gallery Photos ({photos.length})
                </h3>
                <Link
                  href="/gallery/photos"
                  className="text-xs font-bold text-maroon hover:underline"
                >
                  View Public Photo Gallery →
                </Link>
              </div>

              {photos.length === 0 ? (
                <div
                  className={`p-12 rounded-2xl border text-center ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-800 text-gray-400"
                      : "bg-white border-gray-200 text-gray-500"
                  }`}
                >
                  <Images className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-sm font-bold">
                    No custom photos uploaded via Admin yet.
                  </p>
                  <p className="text-xs mt-1">
                    Your 15 default gallery photos are currently active. Upload
                    new photos on the left to feature them at the top of your
                    gallery!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {photos.map((photo) => {
                    const resolvedUrl =
                      photo.url.startsWith("http") ||
                      photo.url.startsWith("data:image/") ||
                      photo.url.startsWith("/")
                        ? photo.url
                        : `/images/${photo.url}`;
                    return (
                      <div
                        key={photo.id}
                        className={`rounded-2xl border overflow-hidden flex flex-col justify-between ${
                          isDarkMode
                            ? "bg-gray-900 border-gray-800"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <div className="relative aspect-video bg-black">
                          <img
                            src={resolvedUrl}
                            alt={photo.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex items-start justify-between gap-3">
                          <div>
                            <h4 className="font-bold text-sm line-clamp-1">
                              {photo.title}
                            </h4>
                            <p className="text-xs text-gray-400 line-clamp-2 mt-0.5">
                              {photo.description}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeletePhoto(photo.id, photo.title)}
                            className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 shrink-0"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: VIDEO GALLERY MANAGER */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div
              className={`p-6 rounded-2xl border h-fit ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2 className="text-xl font-black mb-1 flex items-center gap-2">
                <VideoIcon className="w-5 h-5 text-gold" />
                <span>Add YouTube Performance Video</span>
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Paste any YouTube video or Shorts link to feature it on{" "}
                <Link
                  href="/gallery/videos"
                  className="text-gold underline"
                >
                  /gallery/videos
                </Link>
                .
              </p>

              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    YouTube Video URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={videoYoutubeLink}
                    onChange={(e) => setVideoYoutubeLink(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={`w-full p-3 rounded-xl border text-xs ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Video Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="e.g. Live Shiv Band & Dhol Performance at GT Karnal Road"
                    className={`w-full p-3 rounded-xl border text-xs ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    placeholder="Short description of the performance..."
                    className={`w-full p-3 rounded-xl border text-xs ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                {videoStatusMsg && (
                  <div className="p-3 rounded-xl bg-maroon/15 border border-maroon/30 text-gold text-xs font-bold">
                    {videoStatusMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUploadingVideo}
                  className="w-full py-3.5 rounded-xl bg-maroon text-white font-bold text-sm shadow-lg"
                >
                  {isUploadingVideo ? "Adding Video..." : "Publish Video"}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-lg font-black mb-4">
                Custom Gallery Videos ({videos.length})
              </h3>
              {videos.length === 0 ? (
                <div
                  className={`p-12 rounded-2xl border text-center ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-800 text-gray-400"
                      : "bg-white border-gray-200 text-gray-500"
                  }`}
                >
                  No custom videos added yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {videos.map((v) => (
                    <div
                      key={v.id}
                      className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                        isDarkMode
                          ? "bg-gray-900 border-gray-800"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-sm">{v.title}</h4>
                        <p className="text-xs text-gray-400">{v.description}</p>
                        <a
                          href={v.youtubeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-gold underline mt-1 inline-block"
                        >
                          {v.youtubeLink}
                        </a>
                      </div>
                      <button
                        onClick={() => handleDeleteVideo(v.id, v.title)}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: BOOKINGS & REVIEWS MANAGER */}
        {activeTab === "bookings" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Bookings */}
            <div>
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-maroon" />
                <span>Customer Event Bookings ({bookings.length})</span>
              </h2>
              {bookings.length === 0 ? (
                <div
                  className={`p-8 rounded-2xl border text-center text-sm ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-800 text-gray-400"
                      : "bg-white border-gray-200 text-gray-500"
                  }`}
                >
                  No online bookings submitted yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className={`p-5 rounded-2xl border ${
                        isDarkMode
                          ? "bg-gray-900 border-gray-800"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-black text-base">{b.name}</h3>
                          <a
                            href={`tel:${b.phone}`}
                            className="text-xs font-bold text-gold hover:underline flex items-center gap-1 mt-0.5"
                          >
                            <PhoneCall className="w-3.5 h-3.5" /> {b.phone}
                          </a>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                            b.status === "confirmed"
                              ? "bg-maroon/15 text-emerald-400"
                              : b.status === "cancelled"
                              ? "bg-rose-500/15 text-rose-400"
                              : "bg-gold/15 text-gold"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>

                      <div className="text-xs text-gray-400 space-y-1 mb-4">
                        <div>
                          <strong>Preferred Date:</strong> {b.preferredDate}{" "}
                          at {b.preferredTime}
                        </div>
                        {b.additionalDetails && (
                          <div>
                            <strong>Notes:</strong> {b.additionalDetails}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleUpdateBookingStatus(b.id, "confirmed")
                            }
                            className="px-3 py-1.5 rounded-lg bg-maroon/15 hover:bg-maroon/25 text-emerald-400 font-bold text-xs flex items-center gap-1 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Confirm
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateBookingStatus(b.id, "cancelled")
                            }
                            className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 font-bold text-xs flex items-center gap-1 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Cancel
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteBooking(b.id, b.name)}
                          disabled={deletingBookingId === b.id}
                          className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-bold text-xs flex items-center gap-1 transition-colors disabled:opacity-50"
                          title="Delete Event Booking"
                        >
                          {deletingBookingId === b.id ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Customer Reviews Moderation */}
            <div>
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gold" />
                <span>Customer Reviews ({reviews.length})</span>
              </h2>
              {reviews.length === 0 ? (
                <div
                  className={`p-8 rounded-2xl border text-center text-sm ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-800 text-gray-400"
                      : "bg-white border-gray-200 text-gray-500"
                  }`}
                >
                  No custom reviews in Firestore yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {reviews.map((r) => (
                    <div
                      key={r.id}
                      className={`p-4 rounded-2xl border flex items-start justify-between gap-4 ${
                        isDarkMode
                          ? "bg-gray-900 border-gray-800"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{r.name}</span>
                          <span className="text-gold text-xs font-bold">
                            {`${r.rating || 0}/5`}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          &quot;{r.comment}&quot;
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteReview(r.id, r.name)}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 shrink-0"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
