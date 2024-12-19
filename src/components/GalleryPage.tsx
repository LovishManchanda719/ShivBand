"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, Video } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const GalleryPage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const galleryOptions = [
    {
      icon: <Camera className="w-16 h-16 mb-4" />,
      title: 'Photo Gallery',
      description: 'Browse through our beautiful wedding moments',
      href: '/gallery/photos'
    },
    {
      icon: <Video className="w-16 h-16 mb-4" />,
      title: 'Video Gallery',
      description: 'Relive the magic through our wedding videos',
      href: '/gallery/videos'
    }
  ];

  return (
    <div 
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Our Wedding Gallery
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {galleryOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.2 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                rounded-lg shadow-lg p-8 text-center cursor-pointer
                transition-all duration-300 transform
                ${isDarkMode 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-50"
                }
              `}
            >
              <Link href={option.href} className="block">
                <div className="flex flex-col items-center">
                  {option.icon}
                  <h2 className="text-2xl font-semibold mb-2">
                    {option.title}
                  </h2>
                  <p className="text-gray-500 mb-4">
                    {option.description}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                      px-4 py-2 rounded-full
                      ${isDarkMode 
                        ? "bg-teal-700 text-white hover:bg-teal-600" 
                        : "bg-teal-500 text-white hover:bg-teal-600"
                      }
                    `}
                  >
                    Explore
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default GalleryPage;