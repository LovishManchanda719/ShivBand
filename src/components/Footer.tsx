import React from 'react';
import { motion } from 'framer-motion';
import { Sparkle, Heart, Film } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const socialLinks = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: "https://www.facebook.com/shivband.lighthouse",
      label: "Facebook"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F58529" />
              <stop offset="50%" stopColor="#DD2A7B" />
              <stop offset="100%" stopColor="#515BD4" />
            </linearGradient>
          </defs>
          <path
            d="M12 2.162c3.204 0 3.584.012 4.849.07 1.17.054 1.805.249 2.227.413.562.216.96.477 1.38.896.419.42.68.818.896 1.381.164.422.36 1.057.413 2.227.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.054 1.17-.249 1.805-.413 2.227-.216.562-.477.96-.896 1.38-.42.419-.818.68-1.381.896-.422.164-1.057.36-2.227.413-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.054-1.805-.249-2.227-.413-.562-.216-.96-.477-1.38-.896-.419-.42-.68-.818-.896-1.381-.164-.422-.36-1.057-.413-2.227-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.054-1.17.249-1.805.413-2.227.216-.562.477-.96.896-1.38.42-.419.818-.68 1.381-.896.422-.164 1.057-.36 2.227-.413 1.265-.058 1.645-.07 4.849-.07M12 0C8.741 0 8.332.014 7.053.072 5.78.131 4.901.333 4.14.63c-.79.306-1.459.717-2.126 1.384S.936 3.35.63 4.14C.333 4.901.131 5.78.072 7.053.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.947.059 1.273.261 2.152.558 2.913.306.79.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.761.297 1.64.499 2.913.558C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.947-.072 1.273-.059 2.152-.261 2.913-.558.79-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.297-.761.499-1.64.558-2.913.058-1.279.072-1.688.072-4.947s-.014-3.668-.072-4.947c-.059-1.273-.261-2.152-.558-2.913-.306-.79-.718-1.459-1.384-2.126C21.314 1.042 20.646.63 19.856.324c-.761-.297-1.64-.499-2.913-.558C15.668.014 15.259 0 12 0z"
            fill="url(#instagram-gradient)"
          />
          <circle cx="12" cy="12" r="3.5" fill="none" stroke="#fff" strokeWidth="2" />
          <circle cx="18.5" cy="5.5" r="1.5" fill="#fff" />
        </svg>
      )
      ,
      href: "https://www.instagram.com/shiv_band_and_light_house/",
      label: "Instagram"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF0000">
          <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.527 0-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.527 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
        </svg>
      ),
      href: "https://www.youtube.com/@manishmanchanda4089/videos",
      label: "YouTube"
    }
  ];

  const footerLinks = [
    {
      icon: <Film className="mr-2" size={20} />,
      label: "Gallery",
      href: "/gallery"
    }
  ];

  return (
    <footer 
      className={`
        ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}
        py-12 px-4 md:px-12 transition-colors duration-300
      `}
    >
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        {/* Decorative Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 mb-6"
        >
          <Sparkle className="text-teal-500" />
          <h3 className="text-2xl font-bold">Shiv Band & Light House</h3>
          <Sparkle className="text-teal-500" />
        </motion.div>

        {/* Footer Navigation Links */}
        <div className="flex space-x-4 mb-6">
          {footerLinks.map((link) => (
            <motion.div
              key={link.label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link 
                href={link.href}
                className={`
                  flex items-center 
                  ${isDarkMode 
                    ? 'hover:text-teal-400' 
                    : 'hover:text-teal-600'
                  }
                  transition-colors duration-300
                `}
              >
                {link.icon}
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 mb-6">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              className="transition-transform duration-300"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Copyright with Heartbeat */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center space-x-2 text-sm opacity-75"
        >
          <span>© {new Date().getFullYear()} Shiv Band & Light House</span>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              transition: { 
                repeat: Infinity, 
                duration: 1,
                ease: "easeInOut"
              }
            }}
          >
            <Heart className="text-red-500" size={16} />
          </motion.div>
        </motion.div>

        {/* Subtle Tagline */}
        <p className="mt-2 text-xs opacity-50">
          Creating musical memories that last a lifetime
        </p>
      </div>
    </footer>
  );
};

export default Footer;