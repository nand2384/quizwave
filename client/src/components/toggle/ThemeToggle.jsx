import React from "react";
import { useTheme } from "../../hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full glass border-white/20 transition-all duration-500 hover:border-white/40 shadow-inner group"
      aria-label="Toggle Theme"
    >
      <motion.div
        animate={{
          x: isDark ? 28 : 4,
          backgroundColor: isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(59, 130, 246, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute top-1 w-6 h-6 rounded-full flex items-center justify-center border border-white/10"
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              className="text-emerald-400"
            >
              <Moon size={12} fill="currentColor" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              className="text-blue-500"
            >
              <Sun size={12} fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
