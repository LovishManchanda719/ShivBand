import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Camera, Sparkles, ArrowRight, Eye, X } from "lucide-react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { trackEvent } from "@/lib/analytics";

interface PhotoHighlightsProps {
  isDarkMode: boolean;
}

interface HighlightItem {
  id: string;
  url: string;
  title: string;
}

const defaultPhotoHighlightsData: HighlightItem[] = [
  { id: "1", url: "/images/1.jpg", title: "Royal Wedding Barat Procession" },
  { id: "2", url: "/images/2.jpg", title: "Vintage Chariot & Fancy Lighting" },
  { id: "3", url: "/images/3.jpg", title: "Live Brass Band Performance" },
  { id: "100", url: "/images/100.jpg", title: "Illuminated Barat Setup" },
  { id: "105", url: "/images/105.jpg", title: "Special Wedding Performance" },
  { id: "110", url: "/images/110.jpg", title: "Grand Celebration Moments" },
];

const PhotoHighlights: React.FC<PhotoHighlightsProps> = ({ isDarkMode }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<HighlightItem | null>(null);
  const [photoHighlightsData, setPhotoHighlightsData] = useState<HighlightItem[]>(defaultPhotoHighlightsData);

  useEffect(() => {
    const fetchLatestPhotos = async () => {
      try {
        const q = query(collection(db, "photos"), orderBy("createdAt", "desc"), limit(6));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const uploaded: HighlightItem[] = snap.docs
            .map((docSnap) => {
              const data = docSnap.data();
              return {
                id: docSnap.id,
                url: data.url || data.src || "",
                title: data.title || data.alt || "Shiv Band & Light House Celebration",
              };
            })
            .filter((item) => Boolean(item.url));
          if (uploaded.length > 0) {
            const combined = [...uploaded, ...defaultPhotoHighlightsData].slice(0, 6);
            setPhotoHighlightsData(combined);
          }
        }
      } catch {
        // Keep default fallback highlights if Firestore read fails
      }
    };
    fetchLatestPhotos();
  }, []);

  return (
    <section className={`py-16 sm:py-24 relative overflow-hidden transition-colors ${
      isDarkMode ? "bg-gray-900/60 text-white" : "bg-gray-50/80 text-gray-900"
    }`}>
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-500 font-bold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase Gallery</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Moments of Magic & Celebration
          </h2>

          <p className={`text-base sm:text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Take a glance at our live performances, majestic barat illumination, and high-energy wedding bands.
          </p>
        </div>

        {/* Photo Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          <AnimatePresence>
            {photoHighlightsData.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`group relative rounded-2xl overflow-hidden shadow-lg border cursor-pointer ${
                  isDarkMode ? "bg-gray-800 border-gray-700/80" : "bg-white border-gray-200"
                }`}
                onClick={() => {
                  setSelectedPhoto(photo);
                  trackEvent("gallery_photo_view", { photo_id: photo.id, title: photo.title, source: "home_highlights" });
                }}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-950">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/40 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Eye className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-4 flex items-center justify-between">
                  <h3 className={`font-bold text-sm sm:text-base line-clamp-1 ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}>
                    {photo.title}
                  </h3>
                  <span className="text-teal-500 font-semibold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View Full Gallery CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/gallery/photos"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 via-teal-500 to-emerald-500 text-white rounded-xl text-base font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transform hover:scale-105 transition-all"
          >
            <Camera className="w-5 h-5" />
            <span>Browse Full Gallery</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

      </div>

      {/* Lightbox Quick Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedPhoto.title}</h3>
                </div>

                <Link
                  href="/gallery/photos"
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm flex items-center gap-2"
                >
                  View All Photos <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default PhotoHighlights;
