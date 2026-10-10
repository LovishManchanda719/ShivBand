"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  Calendar, 
  Share2, 
  Check, 
  Camera, 
  Maximize2 
} from "lucide-react";

interface Photo {
  id: string;
  url: string;
  title: string;
  datePosted: Date | Timestamp;
  description?: string;
}

// Fallback high quality photo collection from local images
const defaultFallbackPhotos: Photo[] = [
  { id: "p1", url: "/images/1.jpg", title: "Royal Wedding Barat Procession", datePosted: new Date(2025, 10, 15), description: "Majestic brass band procession leading the wedding barat with grand enthusiasm." },
  { id: "p2", url: "/images/2.jpg", title: "Vintage Chariot & Fancy Lighting", datePosted: new Date(2025, 10, 14), description: "Custom illuminated rath (chariot) with vintage lantern arrangements for evening celebrations." },
  { id: "p3", url: "/images/3.jpg", title: "Live Brass Band Ensemble", datePosted: new Date(2025, 10, 12), description: "Symphonic live brass band musicians dressed in traditional ceremonial uniforms." },
  { id: "p100", url: "/images/100.jpg", title: "Illuminated Night Barat Entry", datePosted: new Date(2025, 9, 28), description: "Stunning light umbrellas creating a magical corridor for the groom's entry." },
  { id: "p101", url: "/images/101.jpg", title: "Barat Music & Dhol Beats", datePosted: new Date(2025, 9, 20), description: "High-energy Punjabi dhol players setting the celebration beat." },
  { id: "p102", url: "/images/102.jpg", title: "Traditional Trumpeters & Performers", datePosted: new Date(2025, 9, 15), description: "Authentic trumpet fanfare welcoming guests to the grand venue." },
  { id: "p103", url: "/images/103.jpg", title: "Golden Barat Lights Corridor", datePosted: new Date(2025, 9, 10), description: "Handheld LED light pillars accompanying the procession." },
  { id: "p104", url: "/images/104.jpg", title: "Royal Groom Chariot Entry", datePosted: new Date(2025, 8, 30), description: "Royal decorated horse chariot entry with custom musical fanfares." },
  { id: "p105", url: "/images/105.jpg", title: "Barat Dance Celebration", datePosted: new Date(2025, 8, 25), description: "Joyous dancing crowd celebrating with live brass band tunes." },
  { id: "p106", url: "/images/106.jpg", title: "Classic Light House Setup", datePosted: new Date(2025, 8, 18), description: "Custom decorative light towers illuminated for wedding ground." },
  { id: "p107", url: "/images/107.jpg", title: "Traditional Turbaned Band Members", datePosted: new Date(2025, 8, 12), description: "Dressed in elegant royal attire with golden embroidered turbans." },
  { id: "p108", url: "/images/108.jpg", title: "Barat Welcome Fanfare", datePosted: new Date(2025, 8, 5), description: "Special musical welcome at venue gates with fireworks and lighting." },
  { id: "p109", url: "/images/109.jpg", title: "Grand Celebration Evening", datePosted: new Date(2025, 7, 29), description: "Full night wedding celebration setup with live band and lights." },
  { id: "p110", url: "/images/110.jpg", title: "Barat Musical Symphony", datePosted: new Date(2025, 7, 20), description: "Harmony of brass trumpets, clarinets, and traditional drums." },
  { id: "p50", url: "/images/50.jpg", title: "Shiv Band Signature Portrait", datePosted: new Date(2025, 7, 10), description: "Official portrait of Shiv Band & Light House team." },
];

const PhotoGalleryPage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [photos, setPhotos] = useState<Photo[]>(defaultFallbackPhotos);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosQuery = query(
          collection(db, "photos"), 
          orderBy("datePosted", "desc")
        );
        
        const snapshot = await getDocs(photosQuery);
        if (!snapshot.empty) {
          const fetchedPhotos = snapshot.docs.map(doc => {
            const data = doc.data();
            const rawUrl = String(data.url || "");
            const resolvedUrl =
              rawUrl.startsWith("http://") ||
              rawUrl.startsWith("https://") ||
              rawUrl.startsWith("data:image/") ||
              rawUrl.startsWith("/")
                ? rawUrl
                : `/images/${rawUrl}`;
            return {
              id: doc.id,
              ...data,
              url: resolvedUrl
            };
          }) as Photo[];
          setPhotos([...fetchedPhotos, ...defaultFallbackPhotos]);
        } else {
          setPhotos(defaultFallbackPhotos);
        }
      } catch (error) {
        console.warn("Using fallback photo gallery data:", error);
        setPhotos(defaultFallbackPhotos);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : (prev as number) - 1));
  }, [selectedIndex, photos.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === photos.length - 1 ? 0 : (prev as number) + 1));
  }, [selectedIndex, photos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  const formatDate = (date: Date | Timestamp) => {
    if (!date) return "";
    let d: Date;
    if (date instanceof Timestamp) {
      d = date.toDate();
    } else if (date instanceof Date) {
      d = date;
    } else {
      return "";
    }
    const year = d.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[d.getMonth()];
    const day = d.getDate();
    return `${month} ${day}, ${year}`;
  };

  const handleShare = () => {
    if (selectedPhoto) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 pb-16 ${
      isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow container mx-auto px-3 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16">
        
        {/* Header Title Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-teal-500/10 border border-amber-500/20 text-amber-500 font-bold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Shiv Band Official Gallery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            Wedding Photo Showcase
          </h1>
          <p className={`text-sm sm:text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Explore our grand barat processions, vintage lights, and live wedding band moments in a Pinterest-style masonry layout.
          </p>
        </div>

        {/* Pinterest-Style Masonry Gallery Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center gap-3 text-teal-500 font-bold text-lg">
              <Camera className="w-6 h-6 animate-bounce" />
              <span>Loading Gallery...</span>
            </div>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No photos available.
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.1,
                  staggerChildren: 0.04
                }
              }
            }}
            className="columns-1 xs:columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-5 space-y-4 sm:space-y-5 max-w-7xl mx-auto"
          >
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedIndex(photos.findIndex(p => p.id === photo.id));
                  import("@/lib/analytics").then(({ trackAnalyticsEvent }) => {
                    trackAnalyticsEvent("gallery_photo_view", { photo_title: photo.title });
                  });
                }}
                className={`break-inside-avoid group rounded-2xl overflow-hidden shadow-md cursor-pointer border transition-all duration-300 relative ${
                  isDarkMode 
                    ? "bg-gray-900 border-gray-800 hover:border-amber-500/50 shadow-black/40" 
                    : "bg-white border-gray-200 hover:border-amber-500/50 shadow-gray-200"
                }`}
              >
                {/* Natural Aspect Ratio Image Container */}
                <div className="relative w-full overflow-hidden bg-gray-950">
                  <img
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Pinterest-style dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                    
                    {/* Top right Expand Icon */}
                    <div className="self-end p-2 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Bottom Title & Info Overlay */}
                    <div>
                      <h3 className="text-sm font-bold text-white drop-shadow mb-1 line-clamp-2">
                        {photo.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-400">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(photo.datePosted)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtitle / Caption Bar below card */}
                <div className="p-3.5 flex items-center justify-between">
                  <h3 className="font-bold text-xs sm:text-sm line-clamp-1 group-hover:text-amber-500 transition-colors">
                    {photo.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </main>

      {/* Lightbox Interactive Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col md:flex-row bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors border border-white/20 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Image Display with Navigation Arrows */}
              <div className="relative w-full md:w-2/3 h-[50vh] md:h-[80vh] bg-black flex items-center justify-center overflow-hidden">
                
                {/* Prev Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 z-30 p-3 rounded-full bg-black/60 hover:bg-black text-white transition-colors border border-white/20 shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-3 z-30 p-3 rounded-full bg-black/60 hover:bg-black text-white transition-colors border border-white/20 shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Ambient Blurred Background */}
                <Image
                  src={selectedPhoto.url}
                  alt=""
                  fill
                  unoptimized
                  className="scale-125 blur-2xl opacity-40 object-cover"
                />

                {/* Main Centered Image with Tap-to-Zoom */}
                <div 
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="relative w-full h-full p-2 sm:p-6 z-10 flex items-center justify-center cursor-zoom-in"
                >
                  <Image
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    fill
                    priority
                    unoptimized
                    className={`object-contain transition-transform duration-300 ${
                      isZoomed ? "scale-150 sm:scale-175 cursor-zoom-out" : "scale-100"
                    }`}
                  />
                </div>

                {/* Counter Tag */}
                <div className="absolute bottom-3 left-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-gray-300 border border-white/10">
                  {(selectedIndex as number) + 1} of {photos.length}
                </div>
              </div>

              {/* Right Column: Photo Details */}
              <div className="w-full md:w-1/3 p-5 sm:p-6 bg-gray-900 flex flex-col justify-between overflow-y-auto">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {selectedPhoto.title}
                  </h2>

                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {selectedPhoto.description || "Captured live during our wedding band & lighting performance."}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-400 py-3 border-t border-b border-gray-800">
                    <Calendar className="w-4 h-4 text-teal-500" />
                    <span>Posted on {formatDate(selectedPhoto.datePosted)}</span>
                  </div>
                </div>

                {/* Bottom Actions inside Modal */}
                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={handleShare}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors border border-gray-700"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-teal-400" />}
                    <span>{copied ? "Link Copied!" : "Share Link"}</span>
                  </button>

                  <a
                    href="https://wa.me/919818626259"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Inquire</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default PhotoGalleryPage;