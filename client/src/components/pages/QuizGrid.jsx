import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function QuizGrid({ quizData = {} }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-20"
    >
      {Object.entries(quizData).map(([genre, quizzes], gIdx) => (
        <motion.section key={genre} variants={itemVariants} className="relative">
          <div className="flex justify-between items-end mb-8 px-2">
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                <span className="w-2 h-8 bg-emerald-500 rounded-full" />
                {genre}
              </h2>
              <p className="text-gray-600 dark:text-gray-500 font-medium text-sm">Most popular quizzes in {genre}</p>
            </div>
            <Link to="#" className="text-emerald-600 dark:text-emerald-500 font-bold hover:underline text-sm uppercase tracking-widest">View Category</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="group relative p-1 rounded-3xl overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-linear-to-br from-black/5 dark:from-white/10 to-transparent group-hover:from-emerald-500/20 transition-all duration-500" />
                <div className="relative p-6 rounded-[calc(1.5rem-4px)] glass border-black/5 dark:border-white/10 h-full flex flex-col group-hover:border-black/10 dark:group-hover:border-white/20">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black bg-black/5 dark:bg-white/5 text-gray-400 border border-black/5 dark:border-white/5 uppercase tracking-[0.2em]">
                      {genre}
                    </span>
                    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-500">
                      <span className="text-xs font-black">{quiz.rating}</span>
                      <span className="text-sm">⭐</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                    {quiz.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-500 font-medium mb-8">
                    Challenge by <span className="text-gray-900 dark:text-gray-300">@{quiz.author}</span>
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${quiz.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500" :
                      quiz.difficulty === "Medium" ? "bg-amber-500/10 text-amber-600 dark:text-amber-500" :
                        "bg-rose-500/10 text-rose-600 dark:text-rose-500"
                      }`}>
                      {quiz.difficulty}
                    </span>

                    <Link
                      to={`/quiz/${gIdx}-${i}`}
                      className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black transition-all duration-300 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    >
                      PLAY NOW
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}
    </motion.div>
  );
}
