import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faUser } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "../toggle/ThemeToggle";

function NavbarLoggedIn() {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="glass border-white/20 rounded-[2rem] px-6 py-3 flex items-center justify-between shadow-2xl overflow-hidden hover:border-white/40 transition-colors">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <FontAwesomeIcon
                icon={faQuestion}
                className="text-xl text-white"
              />
            </div>
            <Link
              to="/"
              className="text-xl font-black tracking-tight text-gray-900 dark:text-white"
            >
              Quiz<span className="text-emerald-500">Wave</span>
            </Link>
          </div>

          {/* Nav links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-600 dark:text-gray-400">
            <Link to="/" className="hover:text-emerald-500 transition-colors">
              Home
            </Link>
            <Link to="/quizzes" className="hover:text-emerald-500 transition-colors">
              Discover
            </Link>
            <Link to="/leaderboard" className="hover:text-emerald-500 transition-colors">
              Board
            </Link>
            <Link to="/createQuiz" className="hover:text-emerald-500 transition-colors">
              Create
            </Link>
            <Link to="/myQuizzes" className="hover:text-emerald-500 transition-colors">
              My Library
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <div className="h-6 w-[1px] bg-white/10" />

            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="w-10 h-10 flex items-center justify-center rounded-xl glass border-white/20 text-gray-700 dark:text-gray-300 hover:text-emerald-500 transition shadow-sm hover:scale-110 active:scale-95"
              >
                <FontAwesomeIcon icon={faUser} />
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("userToken");
                  localStorage.removeItem("quizzes");
                  navigate("/");
                  window.location.reload(); // Refresh to update nav component
                }}
                className="px-6 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarLoggedIn;