// src/components/Reviews.tsx
"use client";
import { useTheme } from "@/context/ThemeContext";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquarePlus, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Review, 
  subscribeToReviews, 
  calculateAverageRating
} from "@/lib/firebase";

const fallbackReviews: Review[] = [
  {
    id: "r1",
    name: "Ramesh Sharma",
    rating: 5,
    comment: "Shiv Band made our wedding barat unforgettable! High energy brass band and majestic lighting setup.",
    location: "Delhi NCR",
    date: new Date(2025, 10, 15) as unknown as Review['date'],
    likes: 24,
    dislikes: 0,
    photoURL: "/avatar1.jpg"
  },
  {
    id: "r2",
    name: "Vikram Malhotra",
    rating: 5,
    comment: "Punctual, professional team, and traditional Punjabi dhol beats were top notch!",
    location: "Noida",
    date: new Date(2025, 9, 28) as unknown as Review['date'],
    likes: 18,
    dislikes: 0,
    photoURL: "/avatar1.jpg"
  },
  {
    id: "r3",
    name: "Ankit Gupta",
    rating: 5,
    comment: "Best light house illumination and groom rath chariot entry in Delhi.",
    location: "Gurgaon",
    date: new Date(2025, 9, 10) as unknown as Review['date'],
    likes: 15,
    dislikes: 0,
    photoURL: "/avatar1.jpg"
  }
];

const ReviewsPage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(5.0);

  useEffect(() => {
    const unsubscribe = subscribeToReviews((updatedReviews) => {
      if (updatedReviews && updatedReviews.length > 0) {
        setReviews(updatedReviews);
        setAverageRating(calculateAverageRating(updatedReviews));
      } else {
        setReviews(fallbackReviews);
        setAverageRating(5.0);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${
          index < rating 
            ? "text-amber-400 fill-amber-400" 
            : isDarkMode ? "text-gray-700" : "text-gray-300"
        }`} 
      />
    ));
  };

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
      isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow container mx-auto px-4 pt-24 sm:pt-28 pb-16">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Customer Feedback</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            Customer Reviews
          </h1>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex">{renderStars(Math.round(averageRating))}</div>
            <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {averageRating.toFixed(1)}
            </span>
            <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              ({reviews.length} reviews)
            </span>
          </div>

          {/* Direct CTA */}
          <Link
            href="/feedback"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-teal-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-white font-bold text-sm shadow-lg shadow-teal-500/20 transform hover:scale-105 transition-all"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </Link>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reviews.map((review) => {
            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`h-full flex flex-col rounded-2xl shadow-md border ${
                  isDarkMode 
                    ? "bg-gray-900 text-white border-gray-800" 
                    : "bg-white text-gray-900 border-gray-200"
                }`}>
                  <CardHeader className="flex flex-row justify-between items-center pb-2">
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={review.photoURL || "/avatar1.jpg"} 
                        alt={`${review.name}'s profile picture`}
                        className="h-10 w-10 rounded-full object-cover border border-amber-500/40 shrink-0"
                      />
                      <CardTitle className={`text-base font-bold truncate ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {review.name}
                      </CardTitle>
                    </div>
                    <div className="flex shrink-0">{renderStars(review.rating)}</div>
                  </CardHeader>
                  
                  <CardContent className="flex-grow flex flex-col pt-0">
                    <p className={`text-xs font-bold mb-2.5 ${
                      isDarkMode ? "text-teal-400" : "text-teal-600"
                    }`}>
                      {review.location || "Verified Guest"}
                    </p>

                    <p className={`text-sm flex-grow leading-relaxed ${
                      isDarkMode ? "text-gray-200" : "text-gray-800 font-medium"
                    }`}>
                      &quot;{review.comment}&quot;
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </main>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default ReviewsPage;
