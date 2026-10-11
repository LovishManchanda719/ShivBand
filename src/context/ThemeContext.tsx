"use client";

import React, { createContext, useContext, useEffect, ReactNode } from "react";

// The redesigned site is light-only. This context is kept so existing pages
// (admin, profile) that read `isDarkMode` keep working unchanged.
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    try {
      localStorage.removeItem("theme");
    } catch {
      /* storage unavailable */
    }
  }, []);

  return <ThemeContext.Provider value={{ isDarkMode: false, toggleDarkMode: () => {} }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
