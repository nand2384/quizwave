import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import { motion } from "framer-motion";

const dummyData = [
  { id: 1, avatar: "https://i.pravatar.cc/150?img=1", username: "nand.patel", exams: 25, topScore: 98, recentScore: 89, avgScore: 82.5 },
  { id: 2, avatar: "https://i.pravatar.cc/150?img=2", username: "user.mira", exams: 18, topScore: 95, recentScore: 87, avgScore: 80.2 },
  { id: 3, avatar: "https://i.pravatar.cc/150?img=3", username: "quiz.legend", exams: 30, topScore: 100, recentScore: 91, avgScore: 85.4 },
  { id: 4, avatar: "https://i.pravatar.cc/150?img=4", username: "john.doe", exams: 12, topScore: 89, recentScore: 77, avgScore: 72.1 },
  { id: 5, avatar: "https://i.pravatar.cc/150?img=5", username: "alex.king", exams: 22, topScore: 94, recentScore: 88, avgScore: 79.8 },
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 overflow-hidden">
      {navComponent}

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full" />
      </div>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 pt-32 pb-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.header
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8"
          >
            <div className="max-w-xl">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 text-xs font-black uppercase tracking-widest mb-6"
              >
                Top Performers
              </motion.div>
              <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
                Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Hall of Fame</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-medium">The elite circle of knowledge seekers. Compete with the best and leave your mark on the leaderboard.</p>
            </div>

            <div className="flex items-center gap-2 glass border-black/5 dark:border-white/10 p-2 rounded-2xl">
              {['All Time', 'This Month', 'This Week'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${filter === f
                      ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </motion.header>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass border-black/5 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5 text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="px-8 py-6 text-left w-24">Rank</th>
                    <th className="px-8 py-6 text-left">Player</th>
                    <th className="px-8 py-6 text-center">Quizzes</th>
                    <th className="px-8 py-6 text-center">Peak Score</th>
                    <th className="px-8 py-6 text-center">Consistency</th>
                    <th className="px-8 py-6 text-right">Avg Rating</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {dummyData.map((user, index) => {
                    const isTop3 = index < 3;
                    const rankColors = [
                      'from-amber-400 to-yellow-600',
                      'from-gray-300 to-slate-500',
                      'from-orange-400 to-amber-700'
                    ];

                    return (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="group hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <td className="px-8 py-6">
                          {isTop3 ? (
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${rankColors[index]} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                              <span className="text-black font-black text-xl">
                                {index === 0 ? "1" : index === 1 ? "2" : "3"}
                              </span>
                            </div>
                          ) : (
                            <span className="text-2xl font-black text-gray-300 dark:text-gray-700 ml-4">#{index + 1}</span>
                          )}
                        </td>

                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img
                                src={user.avatar}
                                alt={user.username}
                                className="w-14 h-14 rounded-2xl border-2 border-black/5 dark:border-white/10 group-hover:border-emerald-500/50 transition-colors object-cover"
                              />
                              {index === 0 && <span className="absolute -top-2 -right-2 text-xl">👑</span>}
                            </div>
                            <div>
                              <div className="text-lg font-black text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                {user.username}
                              </div>
                              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                Master Rank
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-8 py-6 text-center font-black text-gray-900 dark:text-white text-lg">
                          {user.exams}
                        </td>

                        <td className="px-8 py-6 text-center font-black text-amber-600 dark:text-amber-500 text-lg">
                          {user.topScore}%
                        </td>

                        <td className="px-8 py-6 text-center font-black text-emerald-600 dark:text-emerald-500 text-lg">
                          {user.recentScore}%
                        </td>

                        <td className="px-8 py-6 text-right">
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-lg font-black text-gray-900 dark:text-white">{user.avgScore}%</span>
                            <div className="w-32 bg-black/5 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${user.avgScore}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-linear-to-r from-emerald-500 to-blue-500"
                              />
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 dark:text-gray-600 font-bold uppercase tracking-[0.3em] text-[10px]">
              Global Rankings refresh every 60 seconds
            </p>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
