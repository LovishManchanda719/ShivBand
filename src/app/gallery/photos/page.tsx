"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

interface Photo {
  id: string;
  url: string;
  title: string;
  datePosted: Timestamp;
  description?: string;
}

const getDirectImageUrl = (driveUrl: string) => {
  const fileId = driveUrl.match(/\/d\/(.*?)\/view/)?.[1];
  if (!fileId) return driveUrl;
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

const PhotoGalleryPage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosQuery = query(
          collection(db, "photos"), 
          orderBy("datePosted", "desc")
        );
        
        const snapshot = await getDocs(photosQuery);
        const fetchedPhotos = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            url: getDirectImageUrl(data.url)
          };
        }) as Photo[];
        
        setPhotos(fetchedPhotos);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const PhotoCard: React.FC<{ photo: Photo, index: number }> = ({ photo, index }) => {
    return (
      <motion.div
        key={index}
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
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
        }}
        whileTap={{ scale: 0.97 }}
        custom={index}
        className={`
          flex flex-col h-full rounded-lg shadow-md overflow-hidden
          transform transition-all duration-300
          ${isDarkMode 
            ? "bg-gray-800 text-white border-gray-700" 
            : "bg-white text-black border-gray-200"
          }
        `}
        onClick={() => setSelectedPhoto(photo)}
      >
        {/* Image Container with Blurred Background */}
        <div className="relative w-full aspect-square">
          {/* Blurred background image */}
          <div className="absolute inset-0 overflow-hidden">
            <Image 
              src={photo.url} 
              alt=""
              fill
              className="scale-110 blur-xl opacity-50"
              style={{ 
                objectFit: 'cover',
              }}
              unoptimized
            />
          </div>
          
          {/* Main image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full p-4">
              <Image 
                src={photo.url} 
                alt={photo.title}
                fill
                className="transition-all duration-300 hover:scale-105"
                style={{ 
                  objectFit: 'contain',
                }}
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="p-4 flex-grow backdrop-blur-sm">
          <h3 className="font-bold text-lg mb-2">{photo.title}</h3>
          <p className="text-sm text-gray-500 mt-2">
            {photo.datePosted.toDate().toLocaleDateString()}
          </p>
        </div>
      </motion.div>
    );
  };

  const PhotoDetailModal = () => {
    if (!selectedPhoto) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
        onClick={() => setSelectedPhoto(null)}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full md:w-2/3 aspect-square md:aspect-auto md:h-[80vh]">
            {/* Blurred background in modal */}
            <div className="absolute inset-0 overflow-hidden">
              <Image 
                src={selectedPhoto.url} 
                alt=""
                fill
                className="scale-110 blur-xl opacity-30"
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
            
            {/* Main modal image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image 
                src={selectedPhoto.url} 
                alt={selectedPhoto.title}
                fill
                className="p-4"
                style={{ 
                  objectFit: 'contain',
                }}
                unoptimized
              />
            </div>
          </div>
          <div 
            className={`w-full md:w-1/3 p-6 ${
              isDarkMode 
                ? "bg-gray-800 text-white" 
                : "bg-white text-black"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">{selectedPhoto.title}</h2>
            <p className="mb-4">{selectedPhoto.description}</p>
            <p className="mt-4 text-gray-500">
              Posted on: {selectedPhoto.datePosted.toDate().toLocaleDateString()}
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          Our Wedding Gallery
        </h1>

        {loading ? (
          <div className="text-center py-12">Loading photos...</div>
        ) : photos.length === 0 ? (
          <div className="text-center py-12">No photos found.</div>
        ) : (
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {photos.map((photo, index) => (
              <PhotoCard key={photo.id} photo={photo} index={index} />
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedPhoto && <PhotoDetailModal />}
      </AnimatePresence>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default PhotoGalleryPage;