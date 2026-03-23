import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../loader/Loader";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (username.trim() === "" || password.trim() === "") {
      setErrorStatus(true);
    } else {
      setErrorStatus(false);
      setErrorMessage("");
    }
  }, [username, password]);

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setShowPassword(false);
    setErrorMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (errorStatus) {
      setErrorMessage("Please fill both fields.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const status = response.status;
      const jsonData = await response.json().catch(() => ({}));
      const message = jsonData.message || "Unexpected response from server.";

      if (status === 404) {
        setErrorMessage(message || "User not found.");
        clearForm();
      } else if (status === 401) {
        setErrorMessage(message || "Invalid credentials.");
        setPassword("");
      } else if (status === 200) {
        const token = jsonData.token;
        if (token) {
          localStorage.setItem("userToken", token);
          navigate("/profile", {
            state: {
              userData: jsonData.userData,
            },
          });
        } else {
          setErrorMessage("Login succeeded but token missing.");
        }
      } else {
        setErrorMessage(message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 flex items-center justify-center px-4 overflow-hidden">
      {loading && <Loader />}

      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />

      {/* Top Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-8 flex items-center gap-4"
      >
        <Link to="/" className="text-gray-400 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:border-black/30 dark:group-hover:border-white/30 transition-colors">←</span>
          <span className="font-bold text-sm uppercase tracking-widest text-gray-900 dark:text-white">Back to Home</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] -mr-16 -mt-16 rounded-full" />

          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3">Welcome <span className="text-emerald-600 dark:text-emerald-500">Back</span></h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Please sign in to your QuizWave account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-emerald-500/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Password</label>
                <Link to="/forgot" className="text-xs font-bold text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 transition-colors">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-emerald-500/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center"
              >
                {errorMessage}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || errorStatus}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] disabled:opacity-50 active:scale-95"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-600 dark:text-gray-500 font-bold">
              Don't have an account?{" "}
              <Link to="/signUp" className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 transition-colors">Create one now</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
