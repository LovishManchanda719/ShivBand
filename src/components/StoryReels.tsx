"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, MessageCircle, Sparkles } from "lucide-react";

interface StoryItem {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl?: string;
  imageFallback: string;
  tag: string;
}

const storiesData: StoryItem[] = [
  {
    id: "s1",
    title: "Royal Barat Entry",
    thumbnail: "/images/1.jpg",
    imageFallback: "/images/1.jpg",
    tag: "Live Barat"
  },
  {
    id: "s2",
    title: "Vintage Lights",
    thumbnail: "/images/2.jpg",
    imageFallback: "/images/2.jpg",
    tag: "Illumination"
  },
  {
    id: "s3",
    title: "Punjabi Dhol Beats",
    thumbnail: "/images/3.jpg",
    imageFallback: "/images/3.jpg",
    tag: "Dhol Beats"
  },
  {
    id: "s4",
    title: "Groom Chariot",
    thumbnail: "/images/104.jpg",
    imageFallback: "/images/104.jpg",
    tag: "Rath Entry"
  },
  {
    id: "s5",
    title: "Night Fireworks",
    thumbnail: "/images/100.jpg",
    imageFallback: "/images/100.jpg",
    tag: "Fireworks"
  }
];

interface StoryReelsProps {
  isDarkMode: boolean;
}

export const StoryReels: React.FC<StoryReelsProps> = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  // Auto progress story viewer
  useEffect(() => {
    if (activeStoryIndex === null) return;
    
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (activeStoryIndex < storiesData.length - 1) {
            setActiveStoryIndex(activeStoryIndex + 1);
            return 0;
          } else {
            setActiveStoryIndex(null);
            return 0;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStoryIndex]);

  const activeStory = activeStoryIndex !== null ? storiesData[activeStoryIndex] : null;

  return (
    <div className="w-full py-4 px-2 sm:px-4 select-none">
      
      {/* Header Label for Mobile */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500">
          <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-500" />
          <span>Barat Performance Stories</span>
        </div>
        <span className="text-[11px] text-teal-500 font-semibold">Tap to view</span>
      </div>

      {/* Story Bubbles Row */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 px-1">
        {storiesData.map((story, index) => (
          <motion.div
            key={story.id}
            whileTap={{ scale: 0.92 }}
            onClick={() => setActiveStoryIndex(index)}
            className="flex flex-col items-center shrink-0 cursor-pointer group"
          >
            {/* Ring Avatar */}
            <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-teal-500 shadow-md">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white dark:border-gray-900 bg-gray-950 relative">
                <img
                  src={story.thumbnail}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-white drop-shadow-md" />
                </div>
              </div>
            </div>
            <span className="text-[11px] font-bold mt-1.5 text-center truncate max-w-[70px] text-gray-800 dark:text-gray-200">
              {story.title}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Story Fullscreen Viewer Modal */}
      <AnimatePresence>
        {activeStory && activeStoryIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-0 sm:p-4"
          >
            <div className="relative w-full max-w-sm h-full sm:h-[85vh] sm:rounded-3xl overflow-hidden bg-gray-950 text-white flex flex-col justify-between shadow-2xl border border-gray-800">
              
              {/* Progress Bars */}
              <div className="absolute top-3 left-3 right-3 z-30 flex items-center gap-1.5">
                {storiesData.map((_, idx) => (
                  <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-100 ease-linear"
                      style={{
                        width:
                          idx < activeStoryIndex
                            ? "100%"
                            : idx === activeStoryIndex
                            ? `${progress}%`
                            : "0%"
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Top Controls */}
              <div className="absolute top-7 left-4 right-4 z-30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider">
                    {activeStory.tag}
                  </span>
                  <span className="text-xs font-bold text-white drop-shadow">{activeStory.title}</span>
                </div>
                <button
                  onClick={() => setActiveStoryIndex(null)}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Story Content Area */}
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <img
                  src={activeStory.imageFallback}
                  alt={activeStory.title}
                  className="w-full h-full object-cover"
                />

                {/* Left/Right Tap Nav Area */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1/3 z-20"
                  onClick={() => {
                    if (activeStoryIndex > 0) setActiveStoryIndex(activeStoryIndex - 1);
                  }}
                />
                <div
                  className="absolute right-0 top-0 bottom-0 w-1/3 z-20"
                  onClick={() => {
                    if (activeStoryIndex < storiesData.length - 1) setActiveStoryIndex(activeStoryIndex + 1);
                    else setActiveStoryIndex(null);
                  }}
                />
              </div>

              {/* Bottom WhatsApp CTA Bar inside Story */}
              <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center gap-2">
                <a
                  href="https://wa.me/919818626259?text=Hello%20Shiv%20Band,%20I%20saw%20your%20story%20and%20want%20to%20inquire!"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire This Performance</span>
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default StoryReels;
