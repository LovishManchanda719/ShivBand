// src/lib/firebase.ts
import { 
  collection, 
  doc, 
  updateDoc, 
  getDoc, 
  setDoc,
  onSnapshot,
  query,
  getDocs,
  where,
  serverTimestamp,
  Timestamp,
  addDoc
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  location: string;
  date: Timestamp;
  likes: number;
  dislikes: number;
  photoURL: string;
}

interface UserReaction {
  liked: boolean;
  disliked: boolean;
}

// Function to subscribe to reviews
export const subscribeToReviews = (callback: (reviews: Review[]) => void) => {
  const reviewsQuery = query(collection(db, "reviews"));
  
  return onSnapshot(reviewsQuery, (snapshot) => {
    const reviews = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Review[];
    callback(reviews);
  });
};

// Function to calculate average rating
export const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};

// Function to get user's reaction to a review
export const getUserReaction = async (userId: string, reviewId: string): Promise<UserReaction> => {
  const reactionRef = doc(db, "userReactions", `${userId}_${reviewId}`);
  const reactionDoc = await getDoc(reactionRef);
  
  if (reactionDoc.exists()) {
    return reactionDoc.data() as UserReaction;
  }
  
  return { liked: false, disliked: false };
};

// Function to update review reaction
export const updateReviewReaction = async (
  reviewId: string, 
  type: 'like' | 'dislike',
  userId: string
) => {
  const reviewRef = doc(db, "reviews", reviewId);
  const reactionRef = doc(db, "userReactions", `${userId}_${reviewId}`);
  
  // Get current user's reaction
  const currentReaction = await getUserReaction(userId, reviewId);
  const reviewDoc = await getDoc(reviewRef);
  
  if (!reviewDoc.exists()) {
    throw new Error("Review not found");
  }
  
  const reviewData = reviewDoc.data() as Review;
  
  // Handle like/dislike logic
  if (type === 'like') {
    if (currentReaction.liked) {
      // Unlike
      await updateDoc(reviewRef, {
        likes: reviewData.likes - 1
      });
      await setDoc(reactionRef, {
        liked: false,
        disliked: false
      });
    } else if (!currentReaction.disliked) {
      // Like
      await updateDoc(reviewRef, {
        likes: reviewData.likes + 1
      });
      await setDoc(reactionRef, {
        liked: true,
        disliked: false
      });
    }
  } else {
    if (currentReaction.disliked) {
      // Remove dislike
      await updateDoc(reviewRef, {
        dislikes: reviewData.dislikes - 1
      });
      await setDoc(reactionRef, {
        liked: false,
        disliked: false
      });
    } else if (!currentReaction.liked) {
      // Dislike
      await updateDoc(reviewRef, {
        dislikes: reviewData.dislikes + 1
      });
      await setDoc(reactionRef, {
        liked: false,
        disliked: true
      });
    }
  }
};
// Add this to your existing firebase.ts file

export interface Booking {
  userId: string;
  bookingId: string;
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  additionalDetails: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: any;
}

// Get user's bookings
export const getUserBookings = async (userId: string): Promise<Booking[]> => {
  const bookingsQuery = query(
    collection(db, "bookings"), 
    where("userId", "==", userId)
  );
  
  const snapshot = await getDocs(bookingsQuery);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      userId: data.userId,
      bookingId: doc.id,
      name: data.name,
      phone: data.phone,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      additionalDetails: data.additionalDetails,
      status: data.status,
      createdAt: data.createdAt
    } as Booking;
  });
};

// Update booking status
export const updateBookingStatus = async (
  bookingId: string, 
  status: 'pending' | 'confirmed' | 'cancelled'
) => {
  const bookingRef = doc(db, "bookings", bookingId);
  await updateDoc(bookingRef, { status });
};
// Add these to your existing firebase.ts file

// Function to fetch videos
export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeLink: string;
  uploadDate: Timestamp;
}

export const getVideos = async (): Promise<Video[]> => {
  const videosQuery = query(collection(db, "videos"));
  const snapshot = await getDocs(videosQuery);
  
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      youtubeLink: data.youtubeLink,
      uploadDate: data.uploadDate,
    } as Video;
  });
};
