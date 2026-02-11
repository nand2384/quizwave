// src/components/ThemeToggle.jsx
import React from "react";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={
        "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border transition " +
        "bg-white/80 hover:bg-white/90 border-gray-200 shadow-sm " +
        "dark:bg-gray-800/75 dark:border-gray-700 dark:shadow-none " +
        className
      }
    >
      <span className="select-none">{isDark ? "🌞 Light" : "🌙 Dark"}</span>
      <span
        className={
          "w-8 h-4 rounded-full p-0.5 flex items-center transition " +
          (isDark ? "bg-emerald-500" : "bg-gray-300")
        }
        aria-hidden
      >
        <span
          className={
            "w-3 h-3 rounded-full bg-white shadow-md transform transition " +
            (isDark ? "translate-x-4" : "translate-x-0")
          }
        />
      </span>
    </button>
  );
}
