import React from "react";
import { motion } from "framer-motion";
import { Quote, Star, MessageSquare } from "lucide-react";
import Link from "next/link";

interface TestimonialsProps {
  isDarkMode: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ isDarkMode }) => {
  const testimonials = [
    {
      name: "Ramesh Sharma",
      location: "Delhi NCR",
      text: "Shiv Band made our wedding barat unforgettable! High energy brass band and majestic lighting setup.",
      rating: 5,
    },
    {
      name: "Vikram Malhotra",
      location: "Noida",
      text: "Punctual, professional team, and traditional Punjabi dhol beats were top notch!",
      rating: 5,
    },
    {
      name: "Ankit Gupta",
      location: "Gurgaon",
      text: "Best light house illumination and groom rath chariot entry in Delhi.",
      rating: 5,
    },
  ];

  return (
    <section 
      className={`py-16 sm:py-24 relative border-t transition-colors ${
        isDarkMode 
          ? "bg-gray-900 text-white border-gray-800" 
          : "bg-white text-gray-900 border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-xs uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Testimonials</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            What Our Clients Say
          </motion.h2>
          <p className={`text-base sm:text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Real experiences shared by happy families across Delhi NCR.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.15 
              }}
              className={`rounded-2xl p-6 sm:p-7 relative flex flex-col justify-between shadow-md border ${
                isDarkMode 
                  ? "bg-gray-800/90 text-white border-gray-700/80" 
                  : "bg-gray-50 text-gray-900 border-gray-200"
              }`}
            >
              <div>
                {/* Quote Icon */}
                <Quote 
                  className={`w-8 h-8 mb-4 ${
                    isDarkMode ? "text-amber-400/40" : "text-amber-500/30"
                  }`} 
                />

                {/* Testimonial Text */}
                <p className={`text-sm sm:text-base leading-relaxed mb-6 font-medium ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}>
                  &quot;{testimonial.text}&quot;
                </p>
              </div>

              {/* Author Info & Rating */}
              <div className="pt-4 border-t border-gray-700/40 flex items-center justify-between mt-auto">
                <div>
                  <h3 className={`font-bold text-sm sm:text-base ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {testimonial.name}
                  </h3>
                  <span className="text-xs text-teal-500 font-semibold">
                    {testimonial.location}
                  </span>
                </div>

                {/* Star Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 text-amber-400 fill-amber-400" 
                    />
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* View All Reviews CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-500 hover:text-teal-400 transition-colors"
          >
            <span>Read all customer reviews</span>
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
