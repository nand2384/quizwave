// src/components/QuizGrid.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * QuizGrid
 * Props:
 *  - quizData: { [category: string]: Array<{ title, author, difficulty, rating }> }
 *
 * This component is style-updated to match the QuizWave design:
 * - light-first glassy cards (bg-white/85) with dark-mode counterparts
 * - subtle borders and shadows
 * - emerald accent for primary highlights
 */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const headingVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const sectionVariant = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function QuizGrid({ quizData = {} }) {
  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Page heading */}
      <motion.h1
        className="text-3xl font-extrabold text-gray-800 dark:text-white mb-8 text-center"
        variants={headingVariant}
      >
        Browse by Category
      </motion.h1>

      {/* Each category */}
      {Object.entries(quizData).map(([genre, quizzes]) => (
        <motion.section key={genre} className="mb-12" variants={sectionVariant}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              {genre}
            </h2>
            <a
              href="#"
              className="text-emerald-600 text-sm hover:underline"
              aria-label={`See all ${genre}`}
            >
              See all
            </a>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {quizzes.map((quiz, index) => (
              <motion.article
                key={index}
                variants={cardVariant}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "tween", duration: 0.22, ease: "easeInOut" }}
                className="bg-white/85 dark:bg-gray-800/75 p-5 rounded-xl border border-white/60 dark:border-gray-700 shadow-md hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2 text-base">
                  {quiz.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
                  by{" "}
                  <span className="text-gray-700 dark:text-gray-100 font-medium">
                    {quiz.author}
                  </span>
                </p>

                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      quiz.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : quiz.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {quiz.difficulty}
                  </span>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span aria-hidden>⭐</span>
                    <span>{quiz.rating}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>
      ))}
    </motion.div>
  );
}
