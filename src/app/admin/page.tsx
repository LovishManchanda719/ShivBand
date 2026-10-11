"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebaseConfig";
import { ADMIN_EMAIL } from "@/lib/analytics";
import NotifyBingButton from "@/components/admin/NotifyBingButton";
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

export default function AdminDashboardPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<"analytics" | "photos" | "videos" | "bookings">("analytics");
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Analytics State
  const [analyticsLogs, setAnalyticsLogs] = useState<AnalyticsRecord[]>([]);
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const fetchAllAdminData = async () => {
    if (!isAdmin) return;
    setIsLoadingData(true);
    try {
      // 1. Fetch Analytics Logs (latest 300 events)
      try {
        const analyticsSnap = await getDocs(
          query(collection(db, "siteAnalytics"), orderBy("visitedAtISO", "desc"), limit(300))
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
  }, [isAdmin]);

  // Analytics Aggregations
  const stats = useMemo(() => {
    const pageViews = analyticsLogs.filter((l) => l.eventName === "page_view");
    const uniqueVisitorIds = new Set(analyticsLogs.map((l) => l.visitorId));
    const returningVisitors = new Set(
      analyticsLogs.filter((l) => l.isReturningVisitor).map((l) => l.visitorId)
    );
    const callClicks = analyticsLogs.filter((l) => l.eventName === "phone_call_click").length;
    const whatsappClicks = analyticsLogs.filter(
      (l) => l.eventName === "whatsapp_inquiry_click"
    ).length;
    const engagedSessions = analyticsLogs.filter(
      (l) => l.eventName === "engaged_30s" || l.eventName === "scroll_75_percent"
    ).length;

    // Top Cities
    const cityCounts: Record<string, number> = {};
    // Top Sources
    const sourceCounts: Record<string, number> = {};
    // Top Pages
    const pageCounts: Record<string, number> = {};
    // Devices
    const deviceCounts: Record<string, number> = { mobile: 0, desktop: 0, tablet: 0 };

    analyticsLogs.forEach((l) => {
      const cityLabel =
        l.city && l.city !== "Unknown"
          ? `${l.city}${l.region && l.region !== "Unknown" ? `, ${l.region}` : ""}`
          : "Delhi NCR / India";
      cityCounts[cityLabel] = (cityCounts[cityLabel] || 0) + 1;

      const src = l.trafficSource || "Direct";
      sourceCounts[src] = (sourceCounts[src] || 0) + 1;

      if (l.eventName === "page_view") {
        const p = l.path || "/";
        pageCounts[p] = (pageCounts[p] || 0) + 1;
      }

      const dev = l.deviceType || "mobile";
      deviceCounts[dev] = (deviceCounts[dev] || 0) + 1;
    });

    const sortEntries = (obj: Record<string, number>) =>
      Object.entries(obj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

    return {
      totalEvents: analyticsLogs.length,
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
  }, [analyticsLogs]);

  const filteredLogs = useMemo(() => {
    return analyticsLogs.filter((log) => {
      if (eventFilter !== "all" && log.eventName !== eventFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hay = `${log.city || ""} ${log.region || ""} ${log.userEmail || ""} ${
          log.userName || ""
        } ${log.path || ""} ${log.trafficSource || ""} ${log.os || ""} ${
          log.browser || ""
        } ${log.isp || ""}`.toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
  }, [analyticsLogs, eventFilter, searchQuery]);

  // Handle File Selection & Compression for Photo Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, WebP).");
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
      alert("Failed to process image file.");
    }
  };

  // Publish New Photo to Firestore `photos`
  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = (photoPreview || photoUrlInput).trim();
    if (!finalUrl || !photoTitle.trim()) {
      alert("Please provide a Photo Title and either upload an image or enter an image URL.");
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
    } catch (err) {
      console.error("Error adding photo:", err);
      alert(
        "Failed to add photo. Make sure you have published the updated firestore.rules in Firebase Console!"
      );
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!window.confirm("Remove this photo from the gallery?")) return;
    try {
      await deleteDoc(doc(db, "photos", photoId));
      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    } catch (err) {
      console.error("Error deleting photo:", err);
      alert("Failed to delete photo.");
    }
  };

  // Publish New Video to Firestore `videos`
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim() || !videoYoutubeLink.trim()) {
      alert("Please enter both a Video Title and a YouTube Link.");
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
    } catch (err) {
      console.error("Error adding video:", err);
      alert("Failed to add video. Check Firestore rules in Firebase Console.");
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleDeleteVideo = async (videoId: string) => {
    if (!window.confirm("Remove this video from the gallery?")) return;
    try {
      await deleteDoc(doc(db, "videos", videoId));
      setVideos((prev) => prev.filter((v) => v.id !== videoId));
    } catch (err) {
      console.error("Error deleting video:", err);
    }
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
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm("Delete this customer review?")) return;
    try {
      await deleteDoc(doc(db, "reviews", reviewId));
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (err) {
      console.error("Error deleting review:", err);
    }
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

  // Unauthorized / Not Logged In Screen
  if (!authLoading && !isAdmin) {
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

          <button
            onClick={fetchAllAdminData}
            disabled={isLoadingData}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-maroon hover:bg-maroon-deep text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start md:self-auto"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoadingData ? "animate-spin" : ""}`}
            />
            <span>{isLoadingData ? "Refreshing..." : "Refresh Live Data"}</span>
          </button>
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
            {/* KPI Summary Cards */}
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
                  Total Page Views
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
                <div className="text-2xl sm:text-3xl font-black">
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
                <div className="text-2xl sm:text-3xl font-black">
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
                <div className="text-2xl sm:text-3xl font-black">
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

            {/* 4 Intelligence Breakdown Cards */}
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
                    <p className="text-gray-500">No location logs yet</p>
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
                    <p className="text-gray-500">No traffic source data yet</p>
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
                    <p className="text-gray-500">No page views recorded yet</p>
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
                          {count} views
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

            {/* Live Visitor Activity Stream */}
            <div
              className={`rounded-2xl border overflow-hidden ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black">
                    Live Visitor Activity &amp; Location Log
                  </h3>
                  <p className="text-xs text-gray-400">
                    Showing who visited, their city/PIN, device, traffic source,
                    and what they clicked.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search city, email, ISP..."
                      className={`pl-8 pr-3 py-1.5 rounded-xl border text-xs outline-none ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-gray-50 border-gray-300 text-gray-900"
                      }`}
                    />
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
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
                    <option value="all">All Events ({analyticsLogs.length})</option>
                    <option value="page_view">Page Views</option>
                    <option value="phone_call_click">Phone Call Clicks</option>
                    <option value="whatsapp_inquiry_click">WhatsApp Clicks</option>
                    <option value="gallery_photo_view">Photo Views</option>
                    <option value="booking_submitted">Bookings</option>
                    <option value="review_submitted">Reviews</option>
                    <option value="engaged_30s">⏱️ 30s+ Engaged</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {filteredLogs.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-12 text-center text-gray-500"
                        >
                          No visitor events match your filter yet. Open your
                          homepage or gallery in another tab and click Refresh!
                        </td>
                      </tr>
                    ) : (
                      filteredLogs.slice(0, 100).map((log) => (
                        <tr
                          key={log.id}
                          className={`transition-colors ${
                            isDarkMode
                              ? "hover:bg-gray-800/40"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <td className="py-3 px-4 whitespace-nowrap font-medium">
                            <div>{formatTimeIST(log.visitedAtISO)}</div>
                            <div className="text-[10px] text-gray-400">
                              {log.dayOfWeek}
                            </div>
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
                                <span className="text-[10px] text-gold">
                                  ({log.postal})
                                </span>
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
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PHOTO GALLERY MANAGER */}
        {activeTab === "photos" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3">
              <NotifyBingButton />
            </div>
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
                    placeholder="https://... or /images/101.jpg"
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
                            onClick={() => handleDeletePhoto(photo.id)}
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
                        onClick={() => handleDeleteVideo(v.id)}
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

                      <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
                        <button
                          onClick={() =>
                            handleUpdateBookingStatus(b.id, "confirmed")
                          }
                          className="px-3 py-1.5 rounded-lg bg-maroon/15 hover:bg-maroon/25 text-emerald-400 font-bold text-xs flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Confirm
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateBookingStatus(b.id, "cancelled")
                          }
                          className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 font-bold text-xs flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Cancel
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
                        onClick={() => handleDeleteReview(r.id)}
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
