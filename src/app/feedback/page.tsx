"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

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
          className={`cursor-pointer text-3xl ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
};

const FeedbackPage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user } = useAuth();
  
  // Form state
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Form validation
  const validateForm = () => {
    if (!user) {
      alert("Please log in to submit a review");
      return false;
    }
    return name.trim() !== "" && rating > 0 && comment.trim() !== "";
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Add review to Firestore
      await addDoc(collection(db, "reviews"), {
        name,
        rating,
        comment,
        date: new Date(),
        likes: 0,
        dislikes: 0,
        userId: user?.uid,
        photoURL: user?.photoURL,
        location: "Verified Customer" // You can modify this as needed
      });

      // Reset form and show success message
      setName("");
      setComment("");
      setRating(0);
      setSubmitStatus("success");
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error submitting review:", error);
      setSubmitStatus("error");
      
      // Hide error message after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
    }`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Share Your Experience
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`max-w-xl mx-auto p-8 rounded-lg shadow-lg ${
            isDarkMode 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-200"
          }`}
        >
          {!user ? (
            <div className="text-center p-6">
              <p className="mb-4">Please log in to submit a review</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md"
                onClick={() => window.location.href = "/login"}
              >
                Log In
              </motion.button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block mb-2 font-semibold">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`w-full p-3 rounded-md border ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-gray-100 border-gray-300"
                  }`}
                  placeholder="Your name (as you want it to appear)"
                />
              </div>

              {/* Review Comment */}
              <div>
                <label htmlFor="comment" className="block mb-2 font-semibold">
                  Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={4}
                  className={`w-full p-3 rounded-md border ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-gray-100 border-gray-300"
                  }`}
                  placeholder="Share your experience with our services"
                />
              </div>

              {/* Rating */}
              <div>
                <label htmlFor="rating" className="block mb-2 font-semibold">
                  Your Rating <span className="text-red-500">*</span>
                </label>
                <StarRating rating={rating} setRating={setRating} />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full p-3 rounded-md transition-colors duration-300 ${
                  isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-teal-500 hover:bg-teal-600 text-white"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </motion.button>
            </form>
          )}

          {/* Submission Status Messages */}
          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 p-3 bg-green-500 text-white rounded-md text-center"
              >
                Thank you for your review! It will appear on our reviews page shortly.
              </motion.div>
            )}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 p-3 bg-red-500 text-white rounded-md text-center"
              >
                Oops! There was an error submitting your review. Please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default FeedbackPage;