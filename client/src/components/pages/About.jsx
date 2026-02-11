import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../navbar/Navbar";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";

function About() {
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
        <div className="max-w-5xl mx-auto">
          {/* Intro card */}
          <motion.section
            className="bg-white/80 dark:bg-gray-800/75 backdrop-blur-xl border border-white/60 dark:border-gray-700 rounded-3xl p-8 shadow-2xl shadow-gray-300/50"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center mb-2">
              About QuizWave
            </h1>
            <p className="text-center text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              QuizWave is a lightweight, community-driven platform to create,
              share, and play quizzes. Our focus is on clean UI, fast
              interactions, and a friendly leaderboard to track progress.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-center">
                <div className="text-emerald-600 text-2xl font-bold">🚀</div>
                <h4 className="mt-2 text-sm font-semibold text-gray-800 dark:text-white">
                  Fast & Fun
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 max-w-48">
                  Quick quizzes with instant feedback and progress tracking.
                </p>
              </div>

              <div className="text-center">
                <div className="text-emerald-600 text-2xl font-bold">🧭</div>
                <h4 className="mt-2 text-sm font-semibold text-gray-800 dark:text-white">
                  Easy to Create
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 max-w-48">
                  Create quizzes using a simple editor — add questions, options,
                  and correct answers in seconds.
                </p>
              </div>

              <div className="text-center">
                <div className="text-emerald-600 text-2xl font-bold">🏆</div>
                <h4 className="mt-2 text-sm font-semibold text-gray-800 dark:text-white">
                  Leaderboards
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 max-w-48">
                  Compare scores, climb ranks, and celebrate top performers.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Team & mission */}
          <motion.section
            className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="col-span-2">
              <div className="bg-white/80 dark:bg-gray-800/75 backdrop-blur-md rounded-2xl p-6 border border-white/60 dark:border-gray-700 shadow-md">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  Our mission
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We believe learning should be playful and shareable. QuizWave
                  aims to empower creators and learners alike — whether you want
                  to test friends, run a classroom quiz, or publish a public
                  challenge. We prioritize accessibility, quick feedback loops,
                  and a gentle, modern design language.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-[#F8FAFC] dark:bg-gray-700/60 border border-gray-100 dark:border-gray-600">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                      Open & Extendable
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Built so features can be extended — quizzes, insights, and
                      integrations.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#FFF8E1] dark:bg-gray-700/60 border border-yellow-100 dark:border-gray-600">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                      Privacy-first
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Minimal data collection — you control what you share.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team card */}
            <aside className="bg-white/85 dark:bg-gray-800/75 backdrop-blur-md rounded-2xl p-6 border border-white/60 dark:border-gray-700 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                The Team
              </h3>

              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                    N
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                      Nand Patel
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Founder · Product & Frontend
                    </div>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold">
                    M
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                      Mira Jain
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Backend & DevOps
                    </div>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold">
                    A
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                      Alex Roy
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Community & Content
                    </div>
                  </div>
                </li>
              </ul>
            </aside>
          </motion.section>

          {/* Call to action */}
          <motion.section
            className="mt-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/75 backdrop-blur-xl rounded-3xl p-6 border border-white/60 dark:border-gray-700 shadow-lg flex flex-col sm:flex-row items-center gap-4 justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Ready to create your first quiz?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Join the community — make quizzes, compete, and learn.
                </p>
              </div>

              <div className="flex gap-3 mt-3 sm:mt-0">
                <a
                  href="/signUp"
                  className="inline-block px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-md transition"
                >
                  Sign Up
                </a>
                <a
                  href="/quizzes"
                  className="inline-block px-5 py-2 rounded-full bg-white border border-gray-200 hover:bg-emerald-50 text-emerald-700 font-medium transition"
                >
                  Browse Quizzes
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.main>
    </>
  );
}

export default About;
