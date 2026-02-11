import React from "react";
import { motion } from "framer-motion";

const dotTransition = {
  duration: 0.6,
  repeat: Infinity,
  ease: "easeInOut",
  repeatType: "mirror",
};

export default function Loader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex items-center justify-center
                 backdrop-blur-sm bg-white/30 dark:bg-gray-900/45 transition-colors"
    >
      <div className="inline-flex items-center gap-3 bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700 rounded-2xl px-4 py-3 shadow-lg">
        <span className="sr-only">Loading…</span>

        <div className="flex items-end gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              // theme-aware colors via Tailwind classes
              className="w-3.5 h-3.5 rounded-full shadow-sm
                         bg-emerald-500 dark:bg-emerald-300"
              animate={{ y: [-4, -16, -4] }}
              transition={{ ...dotTransition, delay: i * 0.15 }}
            />
          ))}
        </div>

        <div className="ml-3 text-sm text-gray-700 dark:text-gray-200 font-medium">
          Loading...
        </div>
      </div>
    </div>
  );
}
