import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../navbar/Navbar";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";

const quizzes = [
  {
    title: "Quiz One Piece #4",
    difficulty: "Medium",
    author: "CaiThia7797",
    rating: 3.8,
    category: "Art & Literature",
  },
  {
    title: "Guess the Color",
    difficulty: "Easy",
    author: "SiSiTurtle27",
    rating: 3.8,
    category: "Art & Literature",
  },
  {
    title: "Cartoon Characters",
    difficulty: "Easy",
    author: "Juben",
    rating: 3.9,
    category: "Art & Literature",
  },
  {
    title: "Finish the Lyrics",
    difficulty: "Medium",
    author: "SiSiTurtle27",
    rating: 4.2,
    category: "Entertainment",
  },
  {
    title: "Offline Games",
    difficulty: "Easy",
    author: "scypthe",
    rating: 3.6,
    category: "Entertainment",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
      ease: "easeOut",
    },
  }),
};

export default function Home() {
  const [navComponent, setNavComponent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) setNavComponent(<NavbarLoggedIn />);
    else setNavComponent(<Navbar />);
  }, []);

  return (
    <>
      {navComponent}

      <motion.main
        className="min-h-screen bg-linear-to-br from-blue-100 to-emerald-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <motion.header
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4"
            variants={fadeInUp}
          >
            Welcome to <span className="text-emerald-600">QuizWave</span>
          </motion.h1>

          <motion.p className="text-gray-600 dark:text-gray-300 text-lg mb-8" variants={fadeInUp}>
            Test your knowledge. Learn new things. Have fun with interactive quizzes!
          </motion.p>

          <motion.div className="flex justify-center gap-4 mb-12" variants={fadeInUp}>
            <Link
              to="/start"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-medium transition-shadow shadow-md"
            >
              Start a Quiz
            </Link>

            <Link
              to="/quizzes"
              className="inline-block bg-white/90 border border-gray-200 hover:bg-emerald-50 text-emerald-700 px-6 py-3 rounded-full font-medium transition"
            >
              Browse Quizzes
            </Link>
          </motion.div>
        </motion.header>

        {/* Features */}
        <motion.section
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 mb-12"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {[
            {
              title: "Fun Topics",
              desc: "Explore quizzes from general knowledge, science, tech, and more.",
              lightBg: "bg-emerald-50 border-emerald-100",
              icon: "🎯",
            },
            {
              title: "Track Scores",
              desc: "See your quiz performance and climb the leaderboard.",
              lightBg: "bg-sky-50 border-sky-100",
              icon: "📈",
            },
            {
              title: "Friendly UI",
              desc: "Smooth and simple interface that feels light and fun to use.",
              lightBg: "bg-yellow-50 border-yellow-100",
              icon: "✨",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className={
                // Light appearance uses the provided pastel bg.
                // Dark appearance uses a neutral dark card with visible borders and white text.
                `${feature.lightBg} p-6 rounded-2xl shadow-sm border
                 dark:bg-gray-800/65 dark:border-gray-700
                 dark:text-white`
              }
            >
              <div className="flex items-start gap-3">
                <div
                  className={
                    "w-10 h-10 rounded-lg flex items-center justify-center text-xl " +
                    // keep icon bg subtle in light mode, in dark mode use slightly brighter ring
                    (i === 0
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-700/10"
                      : i === 1
                      ? "bg-sky-100 text-sky-700 dark:bg-sky-700/10"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/10")
                  }
                >
                  {feature.icon}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-xl">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Popular Quizzes heading */}
        <div className="max-w-5xl mx-auto mb-4">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
              Popular Quizzes
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Explore quizzes trending in different categories
            </p>
          </motion.div>
        </div>

        {/* Quizzes grid */}
        <motion.section
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {quizzes.map((quiz, idx) => (
            <motion.article
              key={idx}
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="bg-white/85 dark:bg-gray-800/75 p-5 rounded-xl border border-white/60 dark:border-gray-700 shadow-md hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2 text-base">
                {quiz.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
                by <span className="text-gray-700 dark:text-gray-100 font-medium">{quiz.author}</span>
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
                  <span>⭐</span>
                  <span>{quiz.rating}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.section>
      </motion.main>
    </>
  );
}
