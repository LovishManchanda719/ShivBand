"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { CheckCircle, MessageSquare, User as UserIcon } from "lucide-react";

// Rating component
const StarRating = ({ 
  rating, 
  setRating 
}: { 
  rating: number, 
  setRating: (rating: number) => void 
}) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.span
          key={star}
          onClick={() => setRating(star)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`cursor-pointer text-3xl select-none transition-colors ${
            star <= rating ? "text-amber-400" : "text-gray-300 dark:text-gray-600"
          }`}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
};

// Input Sanitizer for XSS security protection
const sanitizeInput = (str: string): string => {
  return str.replace(/<[^>]*>?/gm, '').trim();
};

const FeedbackPage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user } = useAuth();
  
  // Form state
  const [name, setName] = useState(user?.displayName || "");
  const [location, setLocation] = useState("Delhi NCR");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Form validation
  const validateForm = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return false;
    }
    if (rating === 0) {
      alert("Please select a rating star");
      return false;
    }
    if (!comment.trim()) {
      alert("Please write your review comment");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Add review to Firestore with sanitized inputs
      await addDoc(collection(db, "reviews"), {
        name: sanitizeInput(name),
        rating,
        comment: sanitizeInput(comment),
        date: new Date(),
        likes: 0,
        dislikes: 0,
        userId: user?.uid || "guest",
        photoURL: user?.photoURL || "/avatar1.jpg",
        location: sanitizeInput(location) || "Verified Guest"
      });

      // Reset form and show success message
      if (!user) setName("");
      setComment("");
      setRating(5);
      setSubmitStatus("success");
      
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 4000);
    } catch (error) {
      console.error("Error submitting review:", error);
      setSubmitStatus("error");
      
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 pb-16 ${
      isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow container mx-auto px-4 pt-24 sm:pt-28 pb-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-xs uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Public Feedback & Reviews</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            Write a Review
          </h1>
          <p className={`text-sm sm:text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Share your experience with Shiv Band & Light House.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`max-w-xl mx-auto p-6 sm:p-8 rounded-2xl shadow-xl border ${
            isDarkMode 
              ? "bg-gray-900 border-gray-800 text-white" 
              : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`w-full p-3 pl-10 rounded-xl border text-sm transition-colors ${
                    isDarkMode 
                      ? "bg-gray-800 border-gray-700 text-white focus:border-teal-500" 
                      : "bg-gray-50 border-gray-300 focus:border-teal-500"
                  }`}
                  placeholder="Enter your full name"
                />
                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* City / Location Input */}
            <div>
              <label htmlFor="location" className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                City / Location (Optional)
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`w-full p-3 rounded-xl border text-sm transition-colors ${
                  isDarkMode 
                    ? "bg-gray-800 border-gray-700 text-white focus:border-teal-500" 
                    : "bg-gray-50 border-gray-300 focus:border-teal-500"
                }`}
                placeholder="e.g. Delhi, Noida, Gurgaon"
              />
            </div>

            {/* Rating Stars */}
            <div>
              <label htmlFor="rating" className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                Your Rating <span className="text-red-500">*</span>
              </label>
              <StarRating rating={rating} setRating={setRating} />
            </div>

            {/* Review Comment */}
            <div>
              <label htmlFor="comment" className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                Your Review Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={4}
                className={`w-full p-3 rounded-xl border text-sm transition-colors ${
                  isDarkMode 
                    ? "bg-gray-800 border-gray-700 text-white focus:border-teal-500" 
                    : "bg-gray-50 border-gray-300 focus:border-teal-500"
                }`}
                placeholder="Share your experience about our music band, lighting, or barat procession..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white shadow-lg transition-all ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 via-teal-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 shadow-teal-500/20"
              }`}
            >
              {isSubmitting ? "Submitting Review..." : "Publish Review Now"}
            </motion.button>
          </form>

          {/* Submission Status Messages */}
          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="mt-5 p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Thank you! Your review has been submitted successfully.</span>
              </motion.div>
            )}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="mt-5 p-4 bg-rose-500/15 border border-rose-500/30 text-rose-400 rounded-xl text-center font-bold text-sm"
              >
                Oops! There was an issue submitting your review. Please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </main>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default FeedbackPage;