import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import { useLocation, useNavigate } from "react-router";

export default function UserProfile() {
  const navigate = useNavigate();
  const userData = useLocation().state?.userData || null;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if(userData !== null) {
      setUsername(userData.username);
      setEmail(userData.email);
      setLoading(false);
    } else if(userData === null && token !== null) {
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

      const status = response.status;

      if (status === 200) {
        const dataJSON = await response.json();
        const data = dataJSON.response || {};
        setUsername(data.username || "");
        setEmail(data.email || "");
      } else if (status === 401 || status === 404) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("quizzes");
        console.warn("Unauthorized Access!");
        navigate("/");
      } else {
        console.warn("Unexpected status:", status);
      }
    } catch (err) {
      console.error("Fetch detail error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarLoggedIn />
      
      <motion.main
        className="min-h-screen bg-linear-to-br from-blue-100 to-emerald-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.section
            className="bg-white/85 dark:bg-gray-800/75 backdrop-blur-xl border border-white/60 dark:border-gray-700 rounded-3xl p-6 shadow-2xl"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl font-bold text-emerald-700">
                {username ? username.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {username || "User"}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{email || "—"}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#E0F2F1] dark:bg-emerald-900/40 p-4 rounded-xl border border-green-100 dark:border-gray-700 text-center">
                <h4 className="text-sm text-gray-500 dark:text-gray-300">Quizzes Taken</h4>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">0</p>
              </div>

              <div className="bg-[#E3F2FD] dark:bg-sky-900/40 p-4 rounded-xl border border-sky-100 dark:border-gray-700 text-center">
                <h4 className="text-sm text-gray-500 dark:text-gray-300">Top Score</h4>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">0</p>
              </div>

              <div className="bg-[#FFF9C4] dark:bg-yellow-900/30 p-4 rounded-xl border border-yellow-100 dark:border-gray-700 text-center">
                <h4 className="text-sm text-gray-500 dark:text-gray-300">Average Score</h4>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">0</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => navigate("/edit-profile")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-md transition"
              >
                Edit Profile
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("userToken");
                  localStorage.removeItem("quizzes");
                  navigate("/");
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 text-red-600 hover:bg-red-50 shadow-sm transition"
              >
                Sign Out
              </button>
            </div>
          </motion.section>

          {/* Activity / details */}
          <motion.section
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/70 rounded-2xl p-4 border border-white/50 dark:border-gray-700 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Recent Activity</h3>
              {loading ? (
                <p className="text-sm text-gray-500 dark:text-gray-300">Loading...</p>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-300">No recent activity</p>
              )}
            </div>

            <div className="bg-white/80 dark:bg-gray-800/70 rounded-2xl p-4 border border-white/50 dark:border-gray-700 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Account</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>
                  <span className="font-medium text-gray-800 dark:text-white">Username: </span>
                  <span>{username || "—"}</span>
                </li>
                <li>
                  <span className="font-medium text-gray-800 dark:text-white">Email: </span>
                  <span>{email || "—"}</span>
                </li>
              </ul>
            </div>
          </motion.section>
        </div>
      </motion.main>
    </>
  );
}
