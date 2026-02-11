// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "../toggle/ThemeToggle";

function Navbar() {
  return (
    <>
      <nav
        className="sticky top-0 z-40
          bg-white/70 backdrop-blur-md border-b border-white/50
          dark:bg-gray-900/80 dark:border-gray-800
          transition-colors"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faQuestion}
              className="text-3xl text-emerald-600"
            />
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-wide text-gray-800 hover:text-emerald-700 transition
                         dark:text-white"
            >
              QuizWave
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Link to="/" className="hover:text-emerald-600 transition">
              Home
            </Link>
            <Link to="/quizzes" className="hover:text-emerald-600 transition">
              Quizzes
            </Link>
            <Link
              to="/leaderboard"
              className="hover:text-emerald-600 transition"
            >
              Leaderboard
            </Link>
            <Link to="/about" className="hover:text-emerald-600 transition">
              About
            </Link>
          </div>

          {/* Right side: theme + auth */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <div className="mr-1">
              <ThemeToggle />
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link
                to="/signIn"
                className="px-4 py-1 rounded-full text-sm font-medium transition
                           bg-white border border-gray-200 text-emerald-700 hover:bg-emerald-50
                           shadow-sm"
              >
                Sign In
              </Link>
              <Link
                to="/signUp"
                className="px-4 py-1 rounded-full text-sm font-semibold transition
                           bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile menu placeholder (optional) */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
