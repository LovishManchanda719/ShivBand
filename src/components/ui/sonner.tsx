"use client";

import { useTheme } from "@/context/ThemeContext";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { isDarkMode } = useTheme();

  return (
    <Sonner
      theme={isDarkMode ? "dark" : "light"}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-ink group-[.toaster]:border-line group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl font-sans",
          description: "group-[.toast]:text-stone",
          actionButton:
            "group-[.toast]:bg-maroon group-[.toast]:text-white font-medium hover:group-[.toast]:bg-maroon-deep transition-colors",
          cancelButton:
            "group-[.toast]:bg-stone-100 group-[.toast]:text-stone-700 font-medium hover:group-[.toast]:bg-stone-200 transition-colors",
          closeButton:
            "group-[.toast]:bg-white group-[.toast]:border group-[.toast]:border-stone-200 group-[.toast]:text-stone-600 hover:group-[.toast]:text-ink",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
