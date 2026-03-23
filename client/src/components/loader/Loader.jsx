import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#030712]/80 backdrop-blur-md">
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border-t-2 border-r-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        />

        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-b-2 border-l-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        />

        {/* Core */}
        <motion.div
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 blur-sm"
        />

        {/* Text */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <motion.p
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[10px] font-black text-white uppercase tracking-[0.5em]"
          >
            Synchronizing Flux
          </motion.p>
        </div>
      </div>
    </div>
  );
}
