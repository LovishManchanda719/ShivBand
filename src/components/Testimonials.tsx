import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface TestimonialsProps {
  isDarkMode: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ isDarkMode }) => {
  const testimonials = [
    {
      name: "Ramesh Kumar",
      text: "Shiv Band made our wedding absolutely magical!",
      rating: 5,
    },
    {
      name: "Neha",
      text: "Incredible performance, everyone was dancing!",
      rating: 5,
    },
    {
      name: "Saroj",
      text: "Professional, energetic, and perfect for our event!",
      rating: 5,
    },
  ];

  return (
    <section 
      className={`
        py-16 relative overflow-hidden
        ${isDarkMode 
          ? "bg-gradient-to-br from-gray-800 to-gray-900" 
          : "bg-gradient-to-br from-gray-100 to-gray-200"
        }
      `}
    >
      {/* Background Subtle Pattern */}
      <div 
        className={`
          absolute inset-0 opacity-10 
          ${isDarkMode 
            ? "bg-[radial-gradient(#ffffff_1px,transparent_1px)]" 
            : "bg-[radial-gradient(#000000_1px,transparent_1px)]"
          } 
          bg-[size:16px_16px]
        `}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`
            text-4xl font-bold text-center mb-12 
            ${isDarkMode ? "text-white" : "text-gray-800"}
          `}
        >
          What Our Clients Say
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
              className={`
                rounded-xl shadow-lg p-6 relative overflow-hidden
                ${isDarkMode 
                  ? "bg-gray-700 text-white" 
                  : "bg-white text-gray-800"
                }
              `}
            >
              {/* Quote Icon */}
              <Quote 
                className={`
                  absolute top-4 left-4 opacity-10 
                  ${isDarkMode ? "text-white" : "text-gray-300"}
                `} 
                size={48} 
              />

              {/* Testimonial Text */}
              <p className="text-lg italic mb-4 relative z-10 pl-6">
                "{testimonial.text}"
              </p>

              <div className="flex justify-between items-center mt-4">
                <div>
                  <h3 className={`
                    font-semibold 
                    ${isDarkMode ? "text-gray-200" : "text-gray-700"}
                  `}>
                    {testimonial.name}
                  </h3>
                </div>

                {/* Star Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="text-yellow-400 fill-current" 
                      size={20} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Divider */}
        <div 
          className={`
            absolute bottom-0 left-0 right-0 h-2
            ${isDarkMode 
              ? "bg-gradient-to-r from-teal-700 via-purple-700 to-pink-700" 
              : "bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500"
            }
          `}
        />
      </div>
    </section>
  );
};

export default Testimonials;