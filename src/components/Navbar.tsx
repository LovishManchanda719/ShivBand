import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, 
  Moon, 
  User,
  Menu,
  X,
  Camera,
  Video,
  Home,
  Star,
  MessageSquare,
  PhoneCall,
  Sparkles
} from "lucide-react";
import { auth } from "../lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
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

interface UserType {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

// Official WhatsApp SVG Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.807 0-3.578-.484-5.128-1.402l-.367-.219-3.808.999 1.017-3.712-.241-.384c-1.01-1.608-1.544-3.473-1.544-5.385 0-5.659 4.604-10.263 10.264-10.263 2.743 0 5.319 1.068 7.258 3.008 1.939 1.94 3.007 4.516 3.007 7.257 0 5.66-4.604 10.262-10.264 10.262m0-21.843C5.972 0 0 5.972 0 13.245c0 2.324.606 4.593 1.757 6.589L0 24l4.316-1.132a13.2 13.2 0 006.377 1.623h.006c7.272 0 13.245-5.973 13.245-13.246 0-3.539-1.378-6.865-3.882-9.369C17.558 1.377 14.233 0 10.511 0z"/>
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
    setIsMenuOpen(false);
    
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
    { href: "/", label: "Home", icon: Home },
    { href: "/gallery/photos", label: "Photo Gallery", icon: Camera, highlight: true },
    { href: "/gallery/videos", label: "Video Gallery", icon: Video, highlight: true },
    { href: "/contact", label: "Contact", icon: PhoneCall },
    { href: "/reviews", label: "Reviews", icon: Star },
    { href: "/feedback", label: "Feedback", icon: MessageSquare }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkMode 
          ? "bg-gray-900/90 text-white border-b border-gray-800/80 backdrop-blur-md shadow-lg" 
          : "bg-white/90 text-gray-900 border-b border-gray-100 backdrop-blur-md shadow-sm"
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex justify-between items-center">
          
          {/* Brand Logo & Official Emblem */}
          <Logo size="md" variant="inline" onClick={() => handleNavigation('/')} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <button 
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  disabled={isNavigating}
                  className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 relative ${
                    isActive 
                      ? "bg-teal-500 text-white shadow-md shadow-teal-500/20" 
                      : item.highlight
                        ? isDarkMode
                          ? "text-teal-300 hover:bg-teal-500/10 hover:text-teal-200"
                          : "text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                        : isDarkMode 
                          ? "text-gray-300 hover:bg-gray-800 hover:text-white" 
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : item.highlight ? "text-amber-500" : ""}`} />
                  <span>{item.label}</span>
                  {item.highlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Header Actions Right */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* Gallery Quick Badge Button for Mobile */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('/gallery/photos')}
              className="md:hidden flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-teal-500 text-white shadow-sm"
            >
              <Sparkles className="w-3 h-3" />
              <span>Gallery</span>
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode 
                  ? "bg-gray-800 text-amber-400 hover:bg-gray-700" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            {/* Official WhatsApp Quick Action Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors"
              onClick={() => {
                const whatsappUrl = `https://wa.me/919818626259?text=Hello%20Shiv%20Band,%20I%20want%20to%20inquire%20about%20your%20services!`;
                window.open(whatsappUrl, '_blank');
              }}
              title="Contact on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-500 fill-emerald-500" />
            </motion.button>

            {/* User Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className={`p-1.5 rounded-full border transition-colors ${
                    isDarkMode 
                      ? "border-gray-700 hover:bg-gray-800" 
                      : "border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {user ? (
                    <img 
                      src={user.photoURL || '/avatar1.jpg'} 
                      alt="User" 
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover"
                    />
                  ) : (
                    <User className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} />
                  )}
                </motion.button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className={`w-48 shadow-xl ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black'}`}>
                {user ? (
                  <>
                    <DropdownMenuLabel className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      <div className="text-xs">
                        <div className="font-semibold">{user.displayName || "Valued Guest"}</div>
                        <div className="text-[10px] text-gray-400 truncate">{user.email}</div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className={isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} />
                    <DropdownMenuItem 
                      onClick={() => handleNavigation('/profile')}
                      className={`cursor-pointer ${isDarkMode ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}
                      disabled={isNavigating}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className={`cursor-pointer ${isDarkMode ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}
                      disabled={isNavigating}
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem 
                      onClick={() => handleNavigation('/login')}
                      className={`cursor-pointer ${isDarkMode ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}
                      disabled={isNavigating}
                    >
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleNavigation('/signup')}
                      className={`cursor-pointer ${isDarkMode ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}
                      disabled={isNavigating}
                    >
                      Sign Up
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Drawer Hamburger Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={`md:hidden p-2 rounded-xl border transition-colors ${
                isDarkMode 
                  ? "bg-gray-800 border-gray-700 text-white" 
                  : "bg-gray-50 border-gray-200 text-gray-800"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Full Dropdown / Glass Drawer Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden border-b shadow-2xl backdrop-blur-xl ${
                isDarkMode 
                  ? 'bg-gray-900/95 text-white border-gray-800' 
                  : 'bg-white/95 text-gray-900 border-gray-200'
              }`}
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {/* Featured Gallery Banner in Mobile Drawer */}
                <div 
                  onClick={() => handleNavigation('/gallery/photos')}
                  className="mb-3 p-3 rounded-xl bg-gradient-to-r from-amber-500/15 via-teal-500/15 to-emerald-500/15 border border-amber-500/30 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500 text-white shadow">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-500 uppercase tracking-wider">Showcase</div>
                      <div className="text-sm font-black">Explore Wedding Gallery</div>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                </div>

                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.href} whileTap={{ scale: 0.98 }}>
                      <button 
                        onClick={() => handleNavigation(item.href)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          isActive 
                            ? "bg-teal-500 text-white shadow-md" 
                            : item.highlight
                              ? isDarkMode
                                ? "bg-teal-950/40 text-teal-300 border border-teal-800/40"
                                : "bg-teal-50 text-teal-700 border border-teal-200/60"
                              : isDarkMode
                                ? "hover:bg-gray-800 text-gray-200"
                                : "hover:bg-gray-100 text-gray-800"
                        }`}
                        disabled={isNavigating}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? "text-white" : item.highlight ? "text-amber-500" : "text-gray-400"}`} />
                          <span>{item.label}</span>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}

                {/* Quick Call Action in Mobile Drawer */}
                <div className="pt-2">
                  <a
                    href="tel:+919818626259"
                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-center text-sm flex items-center justify-center gap-2 shadow-md"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Now: +91 98186 26259</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Bottom Quick Navigation Dock */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden border-t backdrop-blur-lg px-2 py-1.5 flex justify-around items-center transition-all ${
        isDarkMode 
          ? "bg-gray-900/90 border-gray-800/80 text-gray-300" 
          : "bg-white/90 border-gray-200/80 text-gray-600"
      }`}>
        <button
          onClick={() => handleNavigation('/')}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-colors ${
            pathname === '/' ? 'text-teal-500 font-bold' : 'hover:text-teal-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        <button
          onClick={() => handleNavigation('/gallery/photos')}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-colors relative ${
            pathname === '/gallery/photos' ? 'text-teal-500 font-bold' : 'hover:text-teal-500'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Photos</span>
          <span className="absolute top-0 right-1 w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
        </button>

        <button
          onClick={() => handleNavigation('/gallery/videos')}
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-colors ${
            pathname === '/gallery/videos' ? 'text-teal-500 font-bold' : 'hover:text-teal-500'
          }`}
        >
          <Video className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Videos</span>
        </button>

        {/* WhatsApp Dock Button with Official WhatsApp Icon */}
        <button
          onClick={() => {
            const whatsappUrl = `https://wa.me/919818626259?text=Hello%20Shiv%20Band,%20I%20am%20interested%20in%20booking%20your%20services!`;
            window.open(whatsappUrl, '_blank');
          }}
          className="flex flex-col items-center justify-center px-3 py-1 rounded-lg text-emerald-500 font-medium hover:text-emerald-600"
        >
          <WhatsAppIcon className="w-4 h-4 fill-emerald-500" />
          <span className="text-[10px] mt-0.5">WhatsApp</span>
        </button>
      </div>
    </>
  );
};

export default Navbar;