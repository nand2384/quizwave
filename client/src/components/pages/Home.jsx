import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../navbar/Navbar";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";

const quizzes = [
  {
    title: "Quiz One Piece #4",
    difficulty: "Medium",
    author: "CaiThia7797",
    rating: 3.8,
    category: "Art & Literature",
    plays: "1.2k"
  },
  {
    title: "Guess the Color",
    difficulty: "Easy",
    author: "SiSiTurtle27",
    rating: 3.8,
    category: "Art & Literature",
    plays: "850"
  },
  {
    title: "Cartoon Characters",
    difficulty: "Easy",
    author: "Juben",
    rating: 3.9,
    category: "Art & Literature",
    plays: "2.5k"
  },
  {
    title: "Finish the Lyrics",
    difficulty: "Medium",
    author: "SiSiTurtle27",
    rating: 4.2,
    category: "Entertainment",
    plays: "3.1k"
  },
  {
    title: "Offline Games",
    difficulty: "Easy",
    author: "scypthe",
    rating: 3.6,
    category: "Entertainment",
    plays: "950"
  },
];

const categories = [
  { name: "Science", icon: "🧬", color: "from-blue-500/20 to-cyan-500/20" },
  { name: "History", icon: "📜", color: "from-amber-500/20 to-orange-500/20" },
  { name: "Tech", icon: "💻", color: "from-purple-500/20 to-pink-500/20" },
  { name: "Art", icon: "🎨", color: "from-emerald-500/20 to-teal-500/20" },
  { name: "Sport", icon: "⚽", color: "from-red-500/20 to-rose-500/20" },
  { name: "Music", icon: "🎵", color: "from-indigo-500/20 to-blue-500/20" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  const [navComponent, setNavComponent] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const token = localStorage.getItem("userToken");
    if (token) setNavComponent(<NavbarLoggedIn />);
    else setNavComponent(<Navbar />);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] transition-colors duration-500 overflow-hidden">
      {navComponent}

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10"
      >
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 md:pt-48 md:pb-32">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/20 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">New quizzes added daily</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-6 tracking-tight"
            >
              Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Knowledge</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed"
            >
              The ultimate destination for curious minds. Join thousands of players, compete in various categories, and climb the global leaderboard.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 px-4"
            >
              <Link
                to="/start"
                className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] overflow-hidden"
              >
                <span className="relative z-10">Start Playing Now</span>
                <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>

              <Link
                to="/quizzes"
                className="px-8 py-4 glass border-white/20 text-gray-900 dark:text-white rounded-2xl font-bold hover:bg-white/10 transition-all duration-300"
              >
                Explore Categories
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <motion.section
          variants={itemVariants}
          className="max-w-6xl mx-auto px-4 mb-32"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: "Quizzes Created", value: "12,400+" },
              { label: "Active Players", value: "85K+" },
              { label: "Topics Covered", value: "450+" },
              { label: "Global Rating", value: "4.9/5" },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-3xl glass border-white/10 text-center hover:bg-white/5 transition-colors">
                <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Category Grid */}
        <section className="max-w-7xl mx-auto px-4 mb-32">
          <motion.div variants={itemVariants} className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Popular Categories</h2>
              <p className="text-gray-500 dark:text-gray-400">Discover quizzes by your favorite topics</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-3xl border border-white/10 cursor-pointer bg-gradient-to-br ${cat.color} backdrop-blur-sm hover:border-white/30 transition-all duration-300 group`}
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{cat.icon}</div>
                <div className="font-bold text-gray-900 dark:text-white">{cat.name}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Popular Quizzes */}
        <section className="max-w-7xl mx-auto px-4 mb-32">
          <motion.div variants={itemVariants} className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Quizzes</h2>
              <p className="text-gray-500 dark:text-gray-400">Hand-picked challenges for you</p>
            </div>
            <Link to="/quizzes" className="text-emerald-500 font-bold hover:underline">View All</Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative p-1 rounded-3xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent group-hover:from-emerald-500/20 transition-all duration-500" />
                <div className="relative p-6 rounded-[calc(1.5rem-4px)] glass border-white/20 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-gray-600 dark:text-gray-300 border border-white/10 uppercase tracking-wider">
                      {quiz.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="text-xs font-bold">{quiz.rating}</span>
                      <span className="text-sm">⭐</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">
                    {quiz.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2">
                    Level: <span className="text-gray-700 dark:text-gray-200 font-medium">{quiz.difficulty}</span> • By {quiz.author}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>👁️ {quiz.plays} plays</span>
                    </div>
                    <Link
                      to={`/quiz/${i}`}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Footer Section */}
        <section className="max-w-7xl mx-auto px-4 pb-32">
          <motion.div
            variants={itemVariants}
            className="relative rounded-[3rem] overflow-hidden p-12 md:p-24 text-center glass border-white/20 shadow-2xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10"
          >
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8">Ready to test your limits?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                Create an account to save your progress, challenge friends, and create your own quizzes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register" className="px-10 py-5 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-3xl font-bold hover:scale-105 transition-transform shadow-xl">
                  Get Started for Free
                </Link>
              </div>
            </div>
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] -mr-32 -mt-32 rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] -ml-32 -mb-32 rounded-full" />
          </motion.div>
        </section>

      </motion.main>

      {/* Custom Global Styles for Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-subtle-float {
          animation: subtle-float 3s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}
