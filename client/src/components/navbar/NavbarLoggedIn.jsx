// src/components/NavbarLoggedIn.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faUser } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "../toggle/ThemeToggle";

function NavbarLoggedIn() {
  const navigate = useNavigate();
  return (
    <nav
      className="sticky top-0 z-50
        bg-white/70 backdrop-blur-md border-b border-white/50
        dark:bg-gray-900/80 dark:border-gray-800
        transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
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

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Link to="/" className="hover:text-emerald-600 transition">
            Home
          </Link>
          <Link to="/quizzes" className="hover:text-emerald-600 transition">
            Quizzes
          </Link>
          <Link to="/leaderboard" className="hover:text-emerald-600 transition">
            Leaderboard
          </Link>
          <Link to="/createQuiz" className="hover:text-emerald-600 transition">
            Create Quiz
          </Link>
          <Link to="/myQuizzes" className="hover:text-emerald-600 transition">
            My Quizzes
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            to="/profile"
            className="flex items-center gap-2 bg-white border border-gray-200 text-emerald-700 hover:bg-emerald-50 px-4 py-1 rounded-full text-sm font-medium transition shadow-sm"
          >
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("userToken");
              localStorage.removeItem("quizzes");
              navigate("/");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium transition shadow"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavbarLoggedIn;