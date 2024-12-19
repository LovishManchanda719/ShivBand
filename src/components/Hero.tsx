import React from "react";
import Link from "next/link"; // Import Link from next/link
import BubbleAnimation from "./BubbleAnimation";

interface HeroProps {
  isDarkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  return (
    <header className="relative h-screen flex items-center">
      <BubbleAnimation />
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 relative z-10">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://i.pinimg.com/736x/5a/8d/7d/5a8d7d9ce755800be49f7fe5f8bdb56e.jpg"
              alt="Wedding band"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <h1 className={`text-5xl font-bold leading-tight ${isDarkMode ? "text-white" : "text-black"}`}>
            The Best Wedding Band Experience
          </h1>
          <p className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Creating unforgettable moments with live music that moves your soul.
          </p>
          <Link
            href="/contact"
            className="px-6 py-3 bg-teal-500 text-white rounded-lg text-xl hover:bg-teal-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          >
            Book Us Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Hero;
