"use client";

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoGallery from '@/components/VideoGallery';

const VideoGalleryPage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
    }`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          Performance Videos
        </h1>
        
        <VideoGallery isDarkMode={isDarkMode} />
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default VideoGalleryPage;