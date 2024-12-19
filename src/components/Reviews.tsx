// src/components/Reviews.tsx
"use client";
import { useTheme } from "@/context/ThemeContext";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Review, 
  subscribeToReviews, 
  updateReviewReaction,
  calculateAverageRating,
  getUserReaction
} from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

const ReviewsPage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [userReactions, setUserReactions] = useState<Record<string, { liked: boolean; disliked: boolean }>>({});

  useEffect(() => {
    const unsubscribe = subscribeToReviews((updatedReviews) => {
      setReviews(updatedReviews);
      setAverageRating(calculateAverageRating(updatedReviews));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadUserReactions = async () => {
      if (!user) {
        setUserReactions({});
        return;
      }

      const reactions: Record<string, { liked: boolean; disliked: boolean }> = {};
      
      for (const review of reviews) {
        const reaction = await getUserReaction(user.uid, review.id);
        reactions[review.id] = reaction;
      }
      
      setUserReactions(reactions);
    };

    loadUserReactions();
  }, [user, reviews]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${
          index < rating 
            ? "text-yellow-400 fill-yellow-400" 
            : "text-gray-300"
        }`} 
      />
    ));
  };

  const handleReaction = async (reviewId: string, type: 'like' | 'dislike') => {
    if (!user) {
      alert("Please log in to react to reviews");
      return;
    }

    try {
      await updateReviewReaction(reviewId, type, user.uid);
      const reaction = await getUserReaction(user.uid, reviewId);
      setUserReactions(prev => ({
        ...prev,
        [reviewId]: reaction
      }));
    } catch (error) {
      console.error('Error updating reaction:', error);
      alert('Failed to update reaction. Please try again.');
    }
  };

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
    }`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="flex-grow container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Customer Reviews</h1>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">{renderStars(Math.round(averageRating))}</div>
            <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reviews.map((review) => {
            const userReaction = userReactions[review.id] || { liked: false, disliked: false };
            
            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`h-full flex flex-col ${
                  isDarkMode 
                    ? "bg-gray-800 text-white border-gray-700" 
                    : "bg-white text-black border-gray-200"
                }`}>
                  <CardHeader className="flex flex-row justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img
                        src={review.photoURL || "/default-profile.png"} 
                        alt={`${review.name}'s profile picture`}
                        className="h-10 w-10 rounded-full object-cover border border-gray-300"
                      />
                      <CardTitle className="text-lg truncate">{review.name}</CardTitle>
                    </div>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-xs text-gray-500 mb-2">
                      {review.location} | {review.date.toDate().toLocaleDateString()}
                    </p>
                    <p className="text-sm mb-4 flex-grow line-clamp-3">{review.comment}</p>
                    
                    <div className="flex items-center space-x-4 mt-auto">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleReaction(review.id, 'like')}
                        className={`flex items-center space-x-1 ${
                          userReaction.liked ? 'opacity-100' : 'opacity-50'
                        }`}
                        disabled={!user || userReaction.disliked}
                      >
                        <ThumbsUp className={`h-4 w-4 ${
                          userReaction.liked ? 'text-green-500 fill-green-500' : 'text-green-500'
                        }`} />
                        <span className="text-xs">{review.likes}</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleReaction(review.id, 'dislike')}
                        className={`flex items-center space-x-1 ${
                          userReaction.disliked ? 'opacity-100' : 'opacity-50'
                        }`}
                        disabled={!user || userReaction.liked}
                      >
                        <ThumbsDown className={`h-4 w-4 ${
                          userReaction.disliked ? 'text-red-500 fill-red-500' : 'text-red-500'
                        }`} />
                        <span className="text-xs">{review.dislikes}</span>
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default ReviewsPage;
