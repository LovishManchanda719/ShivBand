import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, 
  Moon, 
  MessageCircle, 
  User,
  Menu,
  X
} from "lucide-react";
import { auth } from "../lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Define a type for the user
interface UserType {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleNavigation = (path: string) => {
    if (isNavigating) return;
    setIsNavigating(true);
    
    router.push(path);
    
    setTimeout(() => {
      setIsNavigating(false);
    }, 500);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      handleNavigation('/');
    } catch (error) {
      console.error("Error signing out:", error);
      setIsNavigating(false);
    }
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/gallery/photos", label: "Photo Gallery" },
    { href: "/gallery/videos", label: "Video Gallery" },
    { href: "/contact", label: "Contact" },
    { href: "/reviews", label: "Reviews" },
    { href: "/feedback", label: "Feedback" }
  ];

  return (
    <nav className={`fixed w-full z-50 ${isDarkMode ? "bg-gray-800/80" : "bg-white/80"}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold cursor-pointer"
          onClick={() => handleNavigation('/')}
        >
          Shiv Band & Light House
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <motion.div
              key={item.href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={() => handleNavigation(item.href)}
                className={`hover:text-teal-500 ${isDarkMode ? "text-white" : "text-black"}`}
                disabled={isNavigating}
              >
                {item.label}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ rotate: 360, scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDarkMode ? <Sun className="text-white" /> : <Moon />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => {
              const whatsappUrl = `https://wa.me/919818626259`;
              window.open(whatsappUrl, '_blank');
            }}
          >
            <MessageCircle className={isDarkMode ? "text-white" : ""} />
          </motion.button>

          {/* User Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {user ? (
                  <img 
                    src={user.photoURL || '/avatar1.jpg'} 
                    alt="User" 
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User className={isDarkMode ? "text-white" : ""} />
                )}
              </motion.button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent className={`w-48 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black'}`}>
              {user ? (
                <>
                  <DropdownMenuLabel className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    <div className="text-sm">
                      <div>{user.displayName}</div>
                      <div className="font-medium truncate">{user.email}</div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className={isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} />
                  <DropdownMenuItem 
                    onClick={() => handleNavigation('/profile')}
                    className={`${isDarkMode ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}
                    disabled={isNavigating}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className={`${isDarkMode ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}
                    disabled={isNavigating}
                  >
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem 
                    onClick={() => handleNavigation('/login')}
                    className={`${isDarkMode ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}
                    disabled={isNavigating}
                  >
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleNavigation('/signup')}
                    className={`${isDarkMode ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}
                    disabled={isNavigating}
                  >
                    Sign Up
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={isDarkMode ? "text-white" : ""} />
            ) : (
              <Menu className={isDarkMode ? "text-white" : ""} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          >
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ x: 10 }}
                className="px-4 py-3 border-t"
              >
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleNavigation(item.href);
                  }}
                  className="w-full text-left"
                  disabled={isNavigating}
                >
                  {item.label}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;