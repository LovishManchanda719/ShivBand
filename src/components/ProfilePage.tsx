"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Camera, 
  Edit, 
  Save, 
  X, 
  Check, 
  Calendar, 
  Star as StarIcon,
  Image as ImageIcon 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { auth, db } from '@/lib/firebaseConfig';
import { 
  updateProfile, 
  updateEmail, 
  updatePassword 
} from 'firebase/auth';
import { 
  doc, 
  updateDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  setDoc, // Add this
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import Image from 'next/image';

// Predefined Avatars
const predefinedAvatars = [
  'https://i.pinimg.com/736x/1f/ad/e9/1fade945713f9a962d6d00710c5596b6.jpg',
  'https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg',
  'https://i.pinimg.com/736x/68/4c/b6/684cb636cf67568ed031a5fee627c8a5.jpg',
  'https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg',
  'https://i.pinimg.com/736x/d5/73/88/d573888afeb073d4c731d67b404f3a2c.jpg',
  'https://i.pinimg.com/736x/e2/92/f7/e292f7ba9db603d7580350ed96ae4af9.jpg',
];

// Types
interface Booking {
  id: string;
  date: Timestamp;
  eventType: string;
  location: string;
  rating?: number;
  review?: string;
}

interface UserReview {
  id: string;
  date: Date;
  rating: number;
  comment: string;
}

const ProfilePage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [user, setUser] = useState(auth.currentUser);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePicture, setProfilePicture] = useState(user?.photoURL || '');
  const [isEditing, setIsEditing] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Fetch user bookings and reviews
  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch bookings
      const bookingsQuery = query(
        collection(db, 'bookings'), 
        where('userId', '==', user.uid)
      );
      const bookingsSnapshot = await getDocs(bookingsQuery);
      const fetchedBookings = bookingsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Booking));
      setBookings(fetchedBookings);

      // Fetch reviews
      const reviewsQuery = query(
        collection(db, 'reviews'), 
        where('userId', '==', user.uid)
      );
      const reviewsSnapshot = await getDocs(reviewsQuery);
      const fetchedReviews = reviewsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as UserReview));
      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  // Update Profile
  const handleUpdateProfile = async () => {
    if (!user) return;
  
    try {
      // Update Firebase Authentication profile
      await updateProfile(user, {
        displayName,
        photoURL: profilePicture,
      });
  
      // Reference to the user document
      const userDocRef = doc(db, "users", user.uid);
  
      // Use setDoc with merge option to create or update the document
      await setDoc(userDocRef, {
        displayName,
        photoURL: profilePicture,
        email: user.email,
        createdAt: serverTimestamp(), // Optional: Add creation timestamp
      }, { merge: true }); // This will create the document if it doesn't exist
  
      setIsEditing(false); // Exit edit mode
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  // Select Avatar
  const selectAvatar = (avatar: string) => {
    setProfilePicture(avatar);
    setShowAvatarModal(false);
  };

  // Render Bookings
  const renderBookings = () => {
    return bookings.map(booking => {
      // Convert Firestore Timestamp to JS Date
      const bookingDate = booking.date instanceof Timestamp ? 
        booking.date.toDate() : 
        new Date();

      return (
        <motion.div
          key={booking.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            p-4 rounded-lg shadow-md mb-4
            ${isDarkMode 
              ? 'bg-gray-800 text-white' 
              : 'bg-white text-black'
            }
          `}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold">{booking.eventType}</h3>
              <p>{booking.location}</p>
              <p>{bookingDate.toLocaleDateString()}</p>
            </div>
            {booking.rating && (
              <div className="flex items-center">
                <StarIcon className="text-yellow-500 mr-2" />
                <span>{booking.rating}/5</span>
              </div>
            )}
          </div>
        </motion.div>
      );
    });
  };

  // Render Reviews
// Render Reviews
// Render Reviews
// Render Reviews
// Render Reviews
// Render Reviews
const renderReviews = () => {
  return reviews.map(review => {
    const reviewDate = review.date instanceof Timestamp ? review.date.toDate() : new Date();
    const starCount = review.rating;

    return (
      <motion.div
        key={review.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          p-4 rounded-lg shadow-md mb-4
          ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}
        `}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={`w-5 h-5 mr-1 ${
                  index < starCount 
                    ? 'text-yellow-500 fill-yellow-500' 
                    : 'text-gray-300 fill-gray-300'
                }`}
                strokeWidth={1}
              />
            ))}
          </div>
          <span>{reviewDate.toLocaleDateString()}</span>
        </div>
        <p>{review.comment}</p>
      </motion.div>
    );
  });
};







  // Avatar Selection Modal
  const AvatarModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setShowAvatarModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className={`
          p-6 rounded-lg max-w-md w-full
          ${isDarkMode 
            ? 'bg-gray-800 text-white' 
            : 'bg-white text-black'
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Select Avatar</h2>
        <div className="grid grid-cols-3 gap-4">
          {predefinedAvatars.map((avatar, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => selectAvatar(avatar)}
              className="cursor-pointer"
            >
              <Image 
                src={avatar} 
                alt={`Avatar ${index + 1}`} 
                width={100} 
                height={100} 
                className="rounded-full"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  if (!user) {
    return <div>Please log in to view your profile</div>;
  }

  return (
    <div 
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Section */}
          <div className="flex items-center mb-12">
            <div className="relative mr-8">
              <Image 
                src={profilePicture || '/default-avatar.png'} 
                alt="Profile" 
                width={150} 
                height={150} 
                className="rounded-full object-cover"
              />
              {isEditing && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAvatarModal(true)}
                  className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2"
                >
                  <Camera className="w-5 h-5" />
                </motion.button>
              )}
            </div>
            <div className="flex-grow">
              {isEditing ? (
                <div>
                  <input 
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className={`
                      w-full mb-2 p-2 rounded
                      ${isDarkMode 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-100 text-black'
                      }
                    `}
                    placeholder="Display Name"
                  />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`
                      w-full mb-4 p-2 rounded
                      ${isDarkMode 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-100 text-black'
                      }
                    `}
                    placeholder="Email"
                  />
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleUpdateProfile}
                      className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
                    >
                      <Save className="mr-2" /> Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsEditing(false)}
                      className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                    >
                      <X className="mr-2" /> Cancel
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold">{displayName}</h1>
                  <p className="text-gray-500 mb-4">{email}</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsEditing(true)}
                    className={`
                      px-4 py-2 rounded flex items-center
                      ${isDarkMode 
                        ? 'bg-blue-700 text-white' 
                        : 'bg-blue-500 text-white'
                      }
                    `}
                  >
                    <Edit className="mr-2" /> Edit Profile
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Bookings Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Calendar className="mr-3" /> My Bookings
            </h2>
            {bookings.length > 0 ? renderBookings() : (
              <p className="text-gray-500">No bookings yet</p>
            )}
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <StarIcon className="mr-3" /> My Reviews
            </h2>
            {reviews.length > 0 ? renderReviews() : (
              <p className="text-gray-500">No reviews yet</p>
            )}
          </motion.div>
        </motion.div>
      </main>

      {/* Avatar Selection Modal */}
      <AnimatePresence>
        {showAvatarModal && <AvatarModal />}
      </AnimatePresence>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default ProfilePage;