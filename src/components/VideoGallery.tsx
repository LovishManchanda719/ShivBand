"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Calendar, Video as VideoIcon, Sparkles } from "lucide-react";
import { getVideos, Video } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Timestamp } from "firebase/firestore";

interface VideoCardProps {
  video: Video;
  index: number;
  onSelect: (video: Video) => void;
  isDarkMode: boolean;
}

const fallbackVideos: Video[] = [
  {
    id: "v1",
    title: "Grand Barat Procession - Live Shiv Band Performance",
    description: "Watch our majestic brass band and high energy dhol performance in action during a royal wedding barat.",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    uploadDate: new Date(2025, 10, 1)
  },
  {
    id: "v2",
    title: "Illuminated Fancy Light House & Rath Entry",
    description: "Spectacular evening lighting setup and decorative chariot procession for wedding celebrations.",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgWgXcQ",
    uploadDate: new Date(2025, 9, 20)
  },
  {
    id: "v3",
    title: "Live Symphony & Brass Trumpet Solo",
    description: "Enchanting brass solos and classic festive tunes performed live by Shiv Band master musicians.",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    uploadDate: new Date(2025, 9, 5)
  }
];

const formatDate = (uploadDate: Date | number | Timestamp | null): string => {
  try {
    if (!uploadDate) return "Recent Performance";
    let d: Date;
    if (uploadDate instanceof Timestamp) {
      d = uploadDate.toDate();
    } else if (uploadDate instanceof Date) {
      d = uploadDate;
    } else if (typeof uploadDate === 'number') {
      d = new Date(uploadDate);
    } else {
      return "Recent Performance";
    }
    const year = d.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[d.getMonth()];
    const day = d.getDate();
    return `${month} ${day}, ${year}`;
  } catch {
    return "Recent Performance";
  }
};

const VideoCard: React.FC<VideoCardProps> = ({ video, index, onSelect, isDarkMode }) => {
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match?.[1] || "dQw4w9WgXcQ";
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${getYouTubeId(video.youtubeLink)}/hqdefault.jpg`;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: (index) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.1,
            duration: 0.3
          }
        })
      }}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`overflow-hidden cursor-pointer rounded-2xl border shadow-md transition-all duration-300 ${
          isDarkMode ? "bg-gray-900 border-gray-800 hover:border-teal-500/50" : "bg-white border-gray-200 hover:border-teal-500/50"
        }`}
        onClick={() => onSelect(video)}
      >
        <div className="relative aspect-video group bg-gray-950 overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
            <div className="p-3 sm:p-4 rounded-full bg-amber-500 text-white shadow-lg shadow-amber-500/30 transform group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white ml-0.5" />
            </div>
          </div>

          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-amber-400 uppercase tracking-wider border border-white/20 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Live Video</span>
          </div>
        </div>
        
        <CardContent className="p-4 sm:p-5">
          <h3 className={`font-bold text-base sm:text-lg mb-2 line-clamp-2 transition-colors ${
            isDarkMode ? "text-white group-hover:text-teal-400" : "text-gray-900 group-hover:text-teal-600"
          }`}>
            {video.title}
          </h3>
          
          <p className={`text-xs sm:text-sm mb-4 line-clamp-2 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            {video.description}
          </p>
          
          <div className={`flex items-center text-xs font-medium ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            <Calendar className="w-3.5 h-3.5 mr-1.5 text-teal-500" />
            {formatDate(video.uploadDate)}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const VideoModal: React.FC<{
  video: Video;
  onClose: () => void;
  isDarkMode: boolean;
}> = ({ video, onClose, isDarkMode }) => {
  const getEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1] || "dQw4w9WgXcQ";
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className={`max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border ${
          isDarkMode ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video bg-black">
          <iframe
            src={getEmbedUrl(video.youtubeLink)}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        <div className="p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            {video.title}
          </h2>
          <p className={`text-sm mb-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            {video.description}
          </p>
          <div className={`flex items-center text-xs font-medium ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            <Calendar className="w-4 h-4 mr-1 text-teal-500" />
            {formatDate(video.uploadDate)}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const VideoGallery: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [videos, setVideos] = useState<Video[]>(fallbackVideos);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoList = await getVideos();
        if (videoList && videoList.length > 0) {
          setVideos(videoList);
        } else {
          setVideos(fallbackVideos);
        }
      } catch (error) {
        console.warn("Using fallback video gallery data:", error);
        setVideos(fallbackVideos);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex items-center gap-3 text-teal-500 font-bold text-lg">
          <VideoIcon className="w-6 h-6 animate-spin" />
          <span>Loading Performance Videos...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.1,
              staggerChildren: 0.05
            }
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            index={index}
            onSelect={setSelectedVideo}
            isDarkMode={isDarkMode}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoGallery;