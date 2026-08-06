"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { collection, addDoc } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { db, auth } from "@/lib/firebaseConfig";
import { CheckCircle, MessageSquare, User as UserIcon } from "lucide-react";

// Vibrant SVG Flower Emblem Avatars for reviewers
const flowerSvgs = [
  // Golden Marigold Flower Emblem
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='50' fill='%23f59e0b'/><path d='M50 20c4 8 16 8 20 0c0 9 8 16 0 20c9 4 9 16 0 20c8 4 0 16 0 20c-4-8-16-8-20 0c0-9-8-16 0-20c-9-4-9-16 0-20c-8-4 0-16 0-20z' fill='%23ffffff' opacity='0.95'/><circle cx='50' cy='50' r='14' fill='%23d97706'/></svg>",
  // Royal Rose Flower Emblem
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='50' fill='%23e11d48'/><circle cx='50' cy='50' r='32' fill='%23ffffff' opacity='0.9'/><path d='M50 26a24 24 0 1 0 0 48a24 24 0 1 0 0-48z' fill='none' stroke='%23be123c' stroke-width='6'/><circle cx='50' cy='50' r='12' fill='%23be123c'/></svg>",
  // Teal Lotus Flower Emblem
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='50' fill='%230d9488'/><path d='M50 20C36 38 30 50 50 80C70 50 64 38 50 20Z' fill='%23ffffff'/><path d='M22 50C38 40 48 50 78 50C62 60 52 50 22 50Z' fill='%23ccfbf1'/></svg>",
  // Sunflower Amber Emblem
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='50' fill='%23d97706'/><circle cx='50' cy='50' r='26' fill='%2378350f'/><circle cx='50' cy='50' r='38' stroke='%23fef08a' stroke-width='6' stroke-dasharray='10 6' fill='none'/></svg>",
  // Emerald Royal Floral Emblem
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='50' fill='%23059669'/><path d='M50 22L58 42L78 50L58 58L50 78L42 58L22 50L42 42Z' fill='%23ffffff'/><circle cx='50' cy='50' r='10' fill='%23f59e0b'/></svg>"
];

const getFlowerAvatarUrl = (name: string, photoURL?: string): string => {
  if (photoURL && photoURL.startsWith("data:image")) {
    return photoURL;
  }
  let hash = 0;
  for (let i = 0; i < (name || "Guest").length; i++) {
    hash += (name || "Guest").charCodeAt(i);
  }
  return flowerSvgs[hash % flowerSvgs.length];
};

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
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setRating(star)}
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
      let activeUserId = user?.uid || "guest";
      const assignedFlowerAvatar = getFlowerAvatarUrl(name.trim(), user?.photoURL || undefined);

      // If user is not logged in, authenticate anonymously in background to fulfill Firestore security rules
      if (!auth.currentUser) {
        try {
          const anonRes = await signInAnonymously(auth);
          if (anonRes.user) {
            activeUserId = anonRes.user.uid;
          }
        } catch (authError) {
          console.warn("Background anonymous auth notice:", authError);
        }
      }

      // Add review to Firestore with sanitized inputs and flower avatar
      await addDoc(collection(db, "reviews"), {
        name: sanitizeInput(name),
        rating,
        comment: sanitizeInput(comment),
        date: new Date(),
        likes: 0,
        dislikes: 0,
        userId: activeUserId,
        photoURL: assignedFlowerAvatar,
        location: ""
      });

      // Reset form and show success message
      if (!user) setName("");
      setComment("");
      setRating(5);
      setSubmitStatus("success");
      
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 4000);
    } catch (error: unknown) {
      console.error("Error submitting review:", error);
      const err = error as { code?: string; message?: string };
      if (err?.code === "permission-denied" || err?.message?.includes("permissions")) {
        alert("Firestore Permission Notice: To allow guest reviews without login, please set 'allow read, create: if true;' for the reviews collection in your Firebase Console Firestore Rules.");
      }
      setSubmitStatus("error");
      
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow container mx-auto px-4 pt-24 sm:pt-28 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
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
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className={`w-full p-3 rounded-xl border text-sm transition-colors ${
                  isDarkMode 
                    ? "bg-gray-800 border-gray-700 text-white focus:border-teal-500" 
                    : "bg-gray-50 border-gray-300 focus:border-teal-500"
                }`}
                placeholder="Tell us about the barat music, dhol energy, and lighting setup..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 via-teal-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 shadow-teal-500/20"
              }`}
            >
              {isSubmitting ? "Publishing Review..." : "Publish Review"}
            </motion.button>

            {/* Success / Error Messages */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 text-sm font-semibold"
                >
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Thank you! Your review has been published successfully.</span>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-semibold"
                >
                  Failed to publish review. Please try again or check Firestore rules in Firebase Console.
                </motion.div>
              )}
            </AnimatePresence>

          </form>
        </motion.div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default FeedbackPage;