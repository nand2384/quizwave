import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import { useLocation, useNavigate } from "react-router";
import { Settings, LogOut, Award, BookOpen, Activity } from "lucide-react";

export default function UserProfile() {
  const navigate = useNavigate();
  const userData = useLocation().state?.userData || null;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (userData !== null) {
      setUsername(userData.username);
      setEmail(userData.email);
      setLoading(false);
    } else if (userData === null && token !== null) {
      fetchDetail(token);
    } else {
      localStorage.removeItem("userToken");
      localStorage.removeItem("quizzes");
      navigate("/");
    }
  }, []);

  const fetchDetail = async (token) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/user/detail", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const dataJSON = await response.json();
        const data = dataJSON.response || {};
        setUsername(data.username || "");
        setEmail(data.email || "");
      } else {
        localStorage.removeItem("userToken");
        navigate("/");
      }
    } catch (err) {
      console.error("Fetch detail error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest animate-pulse">
      Authenticating Profile...
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 overflow-hidden">
      <NavbarLoggedIn />

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 pt-32 pb-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left Column: Sidebar Card */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="lg:col-span-1"
            >
              <div className="glass border-black/5 dark:border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] -mr-16 -mt-16 rounded-full" />

                <div className="relative mb-8 inline-block">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl relative z-10">
                    {username ? username.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20" />
                </div>

                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{username || "Explorer"}</h2>
                <p className="text-gray-500 dark:text-gray-500 font-medium mb-10">{email || "verified.member@quizwave.io"}</p>

                <div className="space-y-4">
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-900 dark:text-white font-bold hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                  >
                    <Settings size={18} className="text-blue-600 dark:text-blue-500" />
                    ACCOUNT SETTINGS
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("userToken");
                      localStorage.removeItem("quizzes");
                      navigate("/");
                    }}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-500 font-bold hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                  >
                    <LogOut size={18} />
                    SIGN OUT
                  </button>
                </div>

                <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Active Voyager</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Dynamic Content */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-12"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Quizzes Mastered", value: "24", icon: <BookOpen className="text-blue-600 dark:text-blue-500" /> },
                  { label: "Elite Awards", value: "08", icon: <Award className="text-amber-500" /> },
                  { label: "Avg Precision", value: "92%", icon: <Activity className="text-emerald-600 dark:text-emerald-500" /> },
                ].map((stat, i) => (
                  <div key={i} className="glass border-black/5 dark:border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden group hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <div className="mb-6">{stat.icon}</div>
                    <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Activity Section */}
              <div className="glass border-black/5 dark:border-white/10 rounded-[3rem] p-10 shadow-2xl">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                    OPERATIONAL HISTORY
                  </h3>
                  <button className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest hover:underline">View All Records</button>
                </div>

                <div className="space-y-6">
                  <div className="bg-black/3 dark:bg-white/3 border border-dashed border-black/10 dark:border-white/10 rounded-[2rem] p-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 mx-auto flex items-center justify-center text-gray-500 mb-6">
                      <Activity size={32} />
                    </div>
                    <h4 className="text-gray-900 dark:text-white font-black mb-2 uppercase tracking-widest">No Recent Logs</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium max-w-xs mx-auto">Start a quiz or explore a new category to generate activity data.</p>
                  </div>
                </div>
              </div>

              {/* Achievements Sneak-peek */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass border-black/5 dark:border-white/5 rounded-[2.5rem] p-8 bg-linear-to-br from-blue-500/5 to-transparent">
                  <h4 className="text-xs font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-4">Rank Intelligence</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-500 font-medium leading-relaxed">You are currently in the <b>Top 15%</b> of global explorers. Master 5 more science quizzes to reach the 'Astro-Genius' rank.</p>
                </div>
                <div className="glass border-black/5 dark:border-white/5 rounded-[2.5rem] p-8 bg-linear-to-br from-emerald-500/5 to-transparent">
                  <h4 className="text-xs font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-4">Daily Streak</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-500 font-medium leading-relaxed"><b>03 Days Active.</b> Keep it up for 7 days to unlock a premium creator badge for your library.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
