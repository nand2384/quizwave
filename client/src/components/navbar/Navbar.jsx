import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "../toggle/ThemeToggle";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="glass border-white/20 rounded-[2rem] px-6 py-3 flex items-center justify-between shadow-2xl overflow-hidden hover:border-white/40 transition-colors">
          {/* Brand */}
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

          {/* Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-600 dark:text-gray-400">
            <Link to="/" className="hover:text-emerald-500 transition-colors">
              Home
            </Link>
            <Link to="/quizzes" className="hover:text-emerald-500 transition-colors">
              Browse
            </Link>
            <Link
              to="/leaderboard"
              className="hover:text-emerald-500 transition-colors"
            >
              Leaderboard
            </Link>
            <Link to="/about" className="hover:text-emerald-500 transition-colors">
              About
            </Link>
          </div>

          {/* Right side: theme + auth */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <div className="h-6 w-[1px] bg-white/10 hidden md:block" />

            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/signIn"
                className="text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-emerald-500 transition"
              >
                Sign In
              </Link>
              <Link
                to="/signUp"
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
