import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../navbar/Navbar";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import QuizGrid from "./QuizGrid";

const quizData = {
  "Art & Literature": [
    { title: "Quiz One Piece #4", author: "CaiThia7797", difficulty: "Medium", rating: 3.8 },
    { title: "Guess the Color", author: "SiSiTurtle27", difficulty: "Easy", rating: 3.8 },
  ],
  Entertainment: [
    { title: "Finish the Lyrics", author: "SiSiTurtle27", difficulty: "Medium", rating: 4.2 },
    { title: "Offline Games", author: "scypthe", difficulty: "Easy", rating: 3.6 },
  ],
  Geography: [
    { title: "World Capitals", author: "MapMaster99", difficulty: "Hard", rating: 4.5 },
    { title: "Countries and Flags", author: "GeoQuizzer", difficulty: "Easy", rating: 4.1 },
  ],
  History: [
    { title: "Ancient Civilizations", author: "HistFan23", difficulty: "Medium", rating: 4.0 },
    { title: "WWII Quick Facts", author: "HistoryBuff", difficulty: "Hard", rating: 4.3 },
  ],
  Languages: [
    { title: "Basic Spanish Phrases", author: "LingoLove", difficulty: "Easy", rating: 4.4 },
    { title: "Name the Language", author: "WordNerd", difficulty: "Medium", rating: 4.0 },
  ],
  "Science & Nature": [
    { title: "Human Body Basics", author: "BioGuru", difficulty: "Easy", rating: 4.1 },
    { title: "Physics Laws", author: "SciWhiz", difficulty: "Hard", rating: 4.6 },
  ],
  Sports: [
    { title: "Cricket Legends", author: "SportsGeek", difficulty: "Medium", rating: 4.2 },
    { title: "Olympics Trivia", author: "RunnerUp", difficulty: "Easy", rating: 3.9 },
  ],
  Trivia: [
    { title: "Random Facts", author: "TriviaKing", difficulty: "Medium", rating: 4.3 },
    { title: "This or That?", author: "QuizCraft", difficulty: "Easy", rating: 3.8 },
  ],
};

export default function Quizzes() {
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
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 pt-32 pb-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.header
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-20 text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-500 text-xs font-black uppercase tracking-widest mb-6"
            >
              The Encyclopedia
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-500">Quizzes</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Dive into our massive library of hand-picked quizzes across various categories. Test your knowledge, earn points, and climb the ranks.
            </p>
          </motion.header>

          <QuizGrid quizData={quizData} />
        </div>
      </motion.main>
    </div>
  );
}
