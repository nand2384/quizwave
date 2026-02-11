import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    setUsername("")                         ;
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
    <>
      {loading && <Loader />}

      <main
        className="relative min-h-screen bg-linear-to-br from-blue-100 to-emerald-100 
                   dark:from-gray-900 dark:to-gray-800
                   flex items-center justify-center px-4 py-12 transition-colors duration-500"
      >
        {/* Top Navigation */}
        <span
          className="absolute top-4 left-6 text-base font-semibold text-gray-600 hover:text-emerald-700 transition duration-150 
                     dark:text-gray-400 dark:hover:text-emerald-400"
        >
          <Link to="/" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            ← Home
          </Link>
          <span className="mx-2 text-gray-400 font-normal dark:text-gray-600">/</span>
          <Link to="/signUp" className="hover:text-emerald-700 dark:hover:text-emerald-400">
            Sign Up
          </Link>
        </span>

        <div className="w-full max-w-sm">
          <div
            className="bg-white/85 dark:bg-gray-800/75 backdrop-blur-xl border border-white/60 dark:border-gray-700
                       rounded-3xl p-8 shadow-2xl shadow-gray-300/50"
          >
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center mb-2">
              QuizWave
            </h2>
            <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
              Welcome back — sign in to continue.
            </p>

            <form onSubmit={handleLogin} aria-describedby="login-error">
              {/* Username */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-emerald-500 bg-transparent text-gray-800 placeholder-gray-500 outline-none
                             dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-emerald-500 bg-transparent text-gray-800 placeholder-gray-500 outline-none
                             dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                  required
                />
              </div>

              {/* Error */}
              {errorMessage && (
                <div id="login-error" className="mb-4 text-sm text-red-600 dark:text-red-400">
                  {errorMessage}
                </div>
              )}

              {/* Utilities */}
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-6">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword((s) => !s)}
                    className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500
                               dark:border-gray-600"
                  />
                  <span>Show password</span>
                </label>

                <Link
                  to="/forgot"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline transition"
                >
                  Forgot?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || errorStatus}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-full font-semibold shadow-lg transition disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link to="/signUp" className="text-emerald-600 hover:underline">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
