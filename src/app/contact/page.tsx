"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  User, 
  Calendar, 
  TimerIcon 
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db, auth} from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";


interface BookingData {
  userId: string;
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  additionalDetails: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: any;
  bookingId?: string;
}

const ContactPage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const router = useRouter();



  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      router.push('/login');
      return;
    }

    if (!name || !phone || !preferredDate || !preferredTime) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingData: BookingData = {
        userId: user.uid,
        name,
        phone,
        preferredDate,
        preferredTime,
        additionalDetails,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "bookings"), bookingData);
      const bookingId = docRef.id;
      await updateDoc(doc(db, "bookings", bookingId), {
        bookingId
      });

      setName("");
      setPhone("");
      setPreferredDate("");
      setPreferredTime("");
      setAdditionalDetails("");
      setSubmitStatus("success");
      
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error submitting booking:", error);
      setSubmitStatus("error");
      
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
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
          Contact Shiv Band & Light House
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`p-6 rounded-lg shadow-lg ${
                isDarkMode 
                  ? "bg-gray-800 border border-gray-700" 
                  : "bg-white border border-gray-200"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <User className="mr-3" /> Owner Details
              </h2>
              <div className="space-y-2">
                <p className="flex items-center">
                  <User className="mr-2 text-teal-500" /> 
                  <span>Manish Kumar</span>
                </p>
                <p className="flex items-center">
                  <Phone className="mr-2 text-teal-500" /> 
                  <span>9818626259</span>
                </p>
                <p className="flex items-center">
                  <Phone className="mr-2 text-teal-500" /> 
                  <span>9818622259</span>
                </p>
                <p className="flex items-center">
                  <Mail className="mr-2 text-teal-500" /> 
                  <span>kumarmanish141980@gmail.com</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`p-6 rounded-lg shadow-lg ${
                isDarkMode 
                  ? "bg-gray-800 border border-gray-700" 
                  : "bg-white border border-gray-200"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Clock className="mr-3" /> Shop Details
              </h2>
              <div className="space-y-2">
                <p className="flex items-center">
                  <TimerIcon className="mr-2 text-teal-500" /> 
                  <span>Opening Time: 11 AM</span>
                </p>
                <p className="flex items-center">
                  <TimerIcon className="mr-2 text-teal-500" /> 
                  <span>Closing Time: 9 PM</span>
                </p>
                <p className="flex items-center">
                  <Calendar className="mr-2 text-teal-500" /> 
                  <span>Open on all days</span>
                </p>
                <p className="flex items-center">
                  <MapPin className="mr-2 text-teal-500" /> 
                  <span>C40 Old Govind Pura, Parawana Road, near Laxmi Diary, Delhi-51</span>
                </p>
              </div>
            </motion.div>

            <motion.div
  variants={cardVariants}
  initial="hidden"
  animate="visible"
  className={`p-6 rounded-lg shadow-lg ${
    isDarkMode 
      ? "bg-gray-800 border border-gray-700" 
      : "bg-white border border-gray-200"
  }`}
>
  <h2 className="text-2xl font-semibold mb-4 flex items-center">
    <MapPin className="mr-3" /> Location Map
  </h2>
  <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.434993327485!2d77.28218657495728!3d28.64669128343855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfca7338fade3%3A0xff7b094d1691389b!2sLaxmi%20Dairy!5e0!3m2!1sen!2sin!4v1734569280440!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        border: 0,
        borderRadius: '0.5rem'
      }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</motion.div>

          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-lg shadow-lg ${
              isDarkMode 
                ? "bg-gray-800 border border-gray-700" 
                : "bg-white border border-gray-200"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Book Your Event
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label 
                  htmlFor="name" 
                  className="block mb-2 font-semibold"
                >
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
                  placeholder="Your full name"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label 
                  htmlFor="phone" 
                  className="block mb-2 font-semibold"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  pattern="[0-9]{10}"
                  className={`w-full p-3 rounded-md border ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-gray-100 border-gray-300"
                  }`}
                  placeholder="10-digit phone number"
                />
              </div>

              {/* Preferred Date Input */}
              <div>
                <label 
                  htmlFor="preferredDate" 
                  className="block mb-2 font-semibold"
                >
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full p-3 rounded-md border ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-gray-100 border-gray-300"
                  }`}
                />
              </div>

              {/* Preferred Time Input */}
              <div>
                <label 
                  htmlFor="preferredTime" 
                  className="block mb-2 font-semibold"
                >
                  Preferred Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  id="preferredTime"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  required
                  className={`w-full p-3 rounded-md border ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-gray-100 border-gray-300"
                  }`}
                />
              </div>

              {/* Additional Details */}
              <div>
                <label 
                  htmlFor="additionalDetails" 
                  className="block mb-2"
                >
                  Additional Details (Optional)
                </label>
                <textarea
                  id="additionalDetails"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  rows={4}
                  className={`w-full p-3 rounded-md border ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-gray-100 border-gray-300"
                  }`}
                  placeholder="Any additional information about your event"
                />
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
                {isSubmitting ? "Submitting..." : "Book Event"}
              </motion.button>
            </form>

            {/* Submission Status Messages */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-3 bg-green-500 text-white rounded-md text-center"
                >
                  Thank you! We'll contact you soon to confirm your event.
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-3 bg-red-500 text-white rounded-md text-center"
                >
                  Oops! There was an error submitting your request. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default ContactPage;