"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import PhotoHighlights from "./PhotoHighlights";
import Testimonials from "./Testimonials";
import BubbleAnimation from "./BubbleAnimation";

const HomePage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Hero isDarkMode={isDarkMode} />
      <PhotoHighlights isDarkMode={isDarkMode} />
      <Testimonials isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
      <BubbleAnimation />
    </div>
  );
};

export default HomePage;