import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "inline" | "badge";
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = "md", 
  variant = "inline", 
  className = "",
  onClick 
}) => {
  
  // Size mappings
  const dimensions = {
    sm: { textTitle: "text-sm", textSub: "text-[9px]", badgeSize: "w-7 h-7 text-xs" },
    md: { textTitle: "text-base sm:text-lg", textSub: "text-[10px] sm:text-xs", badgeSize: "w-9 h-9 sm:w-10 sm:h-10 text-sm sm:text-base" },
    lg: { textTitle: "text-2xl", textSub: "text-sm", badgeSize: "w-14 h-14 text-2xl" },
    xl: { textTitle: "text-4xl", textSub: "text-lg", badgeSize: "w-24 h-24 text-4xl" }
  }[size];

  // Official Logo Badge / Standalone Emblem Card
  if (variant === "badge" || variant === "full") {
    return (
      <motion.div 
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-amber-300 p-4 sm:p-6 shadow-2xl border border-amber-500/40 select-none cursor-pointer flex flex-col items-center justify-center text-center ${className}`}
      >
        {/* Subtle Decorative Mandala Background Patterns */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-300 via-red-900 to-transparent" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* Top Monogram "SB" */}
          <div className="flex items-center justify-center relative mb-1">
            <span className="text-5xl sm:text-7xl lg:text-8xl font-black font-serif tracking-tighter text-amber-300 drop-shadow-lg">
              SB
            </span>
            <span className="text-xs sm:text-sm text-amber-300 font-bold self-start mt-2 ml-0.5">®</span>
          </div>

          {/* Text Below: SHIV BAND & LIGHT HOUSE */}
          <div className="flex flex-col items-center tracking-widest font-black uppercase leading-tight">
            <span className="text-lg sm:text-2xl text-amber-300 drop-shadow-sm font-extrabold">
              SHIV BAND
            </span>
            <span className="text-xs sm:text-sm text-amber-200/90 font-bold tracking-widest mt-0.5">
              & LIGHT HOUSE
            </span>
          </div>

        </div>
      </motion.div>
    );
  }

  // Inline Navigation Logo (Header & Footer)
  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none min-w-0 ${className}`}
    >
      {/* Red & Gold SB Monogram Badge */}
      <div className={`relative ${dimensions.badgeSize} rounded-xl bg-gradient-to-br from-red-700 via-red-600 to-red-800 border border-amber-400/60 shadow-md flex items-center justify-center shrink-0`}>
        <span className="font-serif font-black tracking-tighter text-amber-300 leading-none">
          SB
        </span>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col min-w-0 leading-tight">
        <div className="flex items-center gap-1">
          <span className={`font-black tracking-tight uppercase ${dimensions.textTitle} bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 bg-clip-text text-transparent truncate`}>
            SHIV BAND
          </span>
          <span className="text-[10px] text-amber-500 font-bold">®</span>
        </div>
        <span className={`font-bold tracking-wider uppercase text-amber-500/90 truncate ${dimensions.textSub}`}>
          & LIGHT HOUSE
        </span>
      </div>
    </div>
  );
};

export default Logo;
