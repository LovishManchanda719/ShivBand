import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, Calendar } from "lucide-react";
import BubbleAnimation from "./BubbleAnimation";

interface HeroProps {
  isDarkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  return (
    <header className={`relative pt-24 sm:pt-32 pb-16 overflow-hidden transition-colors duration-300 ${
      isDarkMode ? "bg-gray-950 text-white" : "bg-white text-gray-900"
    }`}>
      {/* Interactive Floating Music Bubbles Background */}
      <BubbleAnimation />

      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center relative z-10">
        
        {/* Left Column: Headline & Call-to-Actions */}
        <div className="flex flex-col justify-center space-y-6 text-center md:text-left">

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
          >
            <span className="block text-base sm:text-xl font-extrabold uppercase tracking-widest text-amber-500 mb-2">
              Shiv Band &amp; Light House • Since 1996
            </span>
            Grand Wedding{" "}
            <span className="bg-gradient-to-r from-amber-500 via-teal-500 to-emerald-400 bg-clip-text text-transparent">
              Barat &amp; Lighting
            </span>{" "}
            Services
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl mx-auto md:mx-0 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Serving Krishna Nagar, Old Govindpura &amp; Delhi NCR with live brass band, majestic barat processions, vibrant Punjabi dhol, royal ghori, flower baggi, rath chariot, and spectacular fancy lighting setup.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start pt-2"
          >
            <Link
              href="/gallery/photos"
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 via-teal-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-white rounded-xl text-base font-bold shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 transition-all"
            >
              <Camera className="w-5 h-5" />
              <span>Explore Performance Gallery</span>
            </Link>

            <Link
              href="/contact"
              className={`w-full sm:w-auto px-6 py-3.5 border-2 rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 ${
                isDarkMode 
                  ? "border-gray-700 bg-gray-800/80 text-white hover:bg-gray-700 hover:border-teal-500" 
                  : "border-gray-300 bg-white/80 text-gray-800 hover:bg-gray-50 hover:border-teal-500 shadow-sm"
              }`}
            >
              <Calendar className="w-5 h-5 text-teal-500" />
              <span>Book Your Event</span>
            </Link>
          </motion.div>

          {/* Key Feature Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-gray-200/40 dark:border-gray-800/40 max-w-lg mx-auto md:mx-0"
          >
            <div className="text-center md:text-left">
              <div className="text-lg sm:text-2xl font-black text-amber-500">1000+</div>
              <div className={`text-[10px] sm:text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Events Played</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-lg sm:text-2xl font-black text-teal-500">Royal</div>
              <div className={`text-[10px] sm:text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Brass &amp; Dhol</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-lg sm:text-2xl font-black text-emerald-500">Vintage</div>
              <div className={`text-[10px] sm:text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Fancy Lighting</div>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Hero Media Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-md sm:max-w-lg">
            
            {/* Ambient Shadow glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-teal-500 rounded-3xl blur-2xl opacity-30 transform -rotate-3 scale-95" />

            <div className={`relative rounded-3xl overflow-hidden shadow-2xl border-4 ${
              isDarkMode ? "border-gray-800 bg-gray-800" : "border-white bg-white"
            }`}>
              <img
                src="/images/50.jpg"
                alt="Shiv Band & Light House - Royal Wedding Brass Band, Barat & Fancy Lighting in Krishna Nagar, New Delhi"
                className="w-full h-[320px] sm:h-[420px] object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </header>
  );
};

export default Hero;
