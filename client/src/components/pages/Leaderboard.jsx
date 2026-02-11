import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import { motion } from "framer-motion";

const dummyData = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/150?img=1",
    username: "nand.patel",
    exams: 25,
    topScore: 98,
    recentScore: 89,
    avgScore: 82.5,
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/150?img=2",
    username: "user.mira",
    exams: 18,
    topScore: 95,
    recentScore: 87,
    avgScore: 80.2,
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/150?img=3",
    username: "quiz.legend",
    exams: 30,
    topScore: 100,
    recentScore: 91,
    avgScore: 85.4,
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/150?img=4",
    username: "john.doe",
    exams: 12,
    topScore: 89,
    recentScore: 77,
    avgScore: 72.1,
  },
];

export default function Leaderboard() {
  const [filter, setFilter] = useState("All Time");
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
        className="min-h-screen bg-linear-to-br from-blue-100 to-emerald-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 px-4 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.section
          className="max-w-6xl mx-auto bg-white/85 dark:bg-gray-800/75 backdrop-blur-md border border-white/60 dark:border-gray-700 rounded-2xl p-6 shadow-2xl"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">
                🏆 Leaderboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                See top performers and compare your progress.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 dark:text-gray-300">Filter</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 rounded-md bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                <option>All Time</option>
                <option>This Month</option>
                <option>This Week</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead className="bg-emerald-600 text-white text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Rank</th>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-center">Exams</th>
                  <th className="px-4 py-3 text-center">Top</th>
                  <th className="px-4 py-3 text-center">Recent</th>
                  <th className="px-4 py-3 text-center">Average</th>
                </tr>
              </thead>

              <tbody>
                {dummyData.map((user, index) => {
                  const rankIcon =
                    index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1;

                  return (
                    <tr
                      key={user.id}
                      className="border-t bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-gray-700 transition"
                    >
                      <td className="px-4 py-4 font-medium text-emerald-700">{rankIcon}</td>

                      <td className="px-4 py-4 flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-600"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-800 dark:text-white">
                            {user.username}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-300">
                            @{user.username}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-200">
                        {user.exams}
                      </td>

                      <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-200">
                        {user.topScore}
                      </td>

                      <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-200">
                        {user.recentScore}
                      </td>

                      <td className="px-4 py-4">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-2">
                          <div
                            className="h-2 bg-emerald-400 rounded-full"
                            style={{ width: `${Math.min(Math.max(user.avgScore, 0), 100)}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 text-center">
                          {user.avgScore}%
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            Scores update in real-time when quizzes are completed.
          </div>
        </motion.section>
      </motion.main>
    </>
  );
}
