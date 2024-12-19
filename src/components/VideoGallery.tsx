"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Calendar, Info } from "lucide-react";
import { getVideos, Video } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VideoCardProps {
  video: Video;
  index: number;
  onSelect: (video: Video) => void;
  isDarkMode: boolean;
}

// Helper function to safely format dates
const formatDate = (uploadDate: any) => {
  try {
    if (!uploadDate) return "Date not available";
    
    // If it's a Firestore Timestamp
    if (uploadDate?.toDate instanceof Function) {
      return uploadDate.toDate().toLocaleDateString();
    }
    
    // If it's already a Date object
    if (uploadDate instanceof Date) {
      return uploadDate.toLocaleDateString();
    }
    
    // If it's a timestamp number
    if (typeof uploadDate === 'number') {
      return new Date(uploadDate).toLocaleDateString();
    }
    
    return "Invalid date format";
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Date format error";
  }
};

const VideoCard: React.FC<VideoCardProps> = ({ video, index, onSelect, isDarkMode }) => {
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match?.[1] || "";
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${getYouTubeId(video.youtubeLink)}/maxresdefault.jpg`;

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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Card 
        className={`overflow-hidden cursor-pointer ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
        }`}
        onClick={() => onSelect(video)}
      >
        <div className="relative aspect-video group">
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className={`font-bold text-lg mb-2 line-clamp-2 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}>
            {video.title}
          </h3>
          
          <p className={`text-sm mb-3 line-clamp-2 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            {video.description}
          </p>
          
          <div className={`flex items-center text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            <Calendar className="w-4 h-4 mr-1" />
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
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className={`max-w-5xl w-full rounded-lg overflow-hidden ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video">
          <iframe
            src={getEmbedUrl(video.youtubeLink)}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        <div className="p-6">
          <h2 className={`text-2xl font-bold mb-3 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}>
            {video.title}
          </h2>
          <p className={`mb-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            {video.description}
          </p>
          <div className={`flex items-center ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(video.uploadDate)}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const VideoGallery: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoList = await getVideos();
        setVideos(videoList);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className={`text-lg ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Loading videos...
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className={`text-lg ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          No videos available.
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
              delayChildren: 0.2,
              staggerChildren: 0.1
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