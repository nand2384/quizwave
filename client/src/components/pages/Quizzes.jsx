import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../navbar/Navbar";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import QuizGrid from "./QuizGrid";

const quizData = {
  "Art & Literature": [
    {
      title: "Quiz One Piece #4",
      author: "CaiThia7797",
      difficulty: "Medium",
      rating: 3.8,
    },
    {
      title: "Guess the Color",
      author: "SiSiTurtle27",
      difficulty: "Easy",
      rating: 3.8,
    },
  ],
  Entertainment: [
    {
      title: "Finish the Lyrics",
      author: "SiSiTurtle27",
      difficulty: "Medium",
      rating: 4.2,
    },
    {
      title: "Offline Games",
      author: "scypthe",
      difficulty: "Easy",
      rating: 3.6,
    },
  ],
  Geography: [
    {
      title: "World Capitals",
      author: "MapMaster99",
      difficulty: "Hard",
      rating: 4.5,
    },
    {
      title: "Countries and Flags",
      author: "GeoQuizzer",
      difficulty: "Easy",
      rating: 4.1,
    },
  ],
  History: [
    {
      title: "Ancient Civilizations",
      author: "HistFan23",
      difficulty: "Medium",
      rating: 4.0,
    },
    {
      title: "WWII Quick Facts",
      author: "HistoryBuff",
      difficulty: "Hard",
      rating: 4.3,
    },
  ],
  Languages: [
    {
      title: "Basic Spanish Phrases",
      author: "LingoLove",
      difficulty: "Easy",
      rating: 4.4,
    },
    {
      title: "Name the Language",
      author: "WordNerd",
      difficulty: "Medium",
      rating: 4.0,
    },
  ],
  "Science & Nature": [
    {
      title: "Human Body Basics",
      author: "BioGuru",
      difficulty: "Easy",
      rating: 4.1,
    },
    {
      title: "Physics Laws",
      author: "SciWhiz",
      difficulty: "Hard",
      rating: 4.6,
    },
  ],
  Sports: [
    {
      title: "Cricket Legends",
      author: "SportsGeek",
      difficulty: "Medium",
      rating: 4.2,
    },
    {
      title: "Olympics Trivia",
      author: "RunnerUp",
      difficulty: "Easy",
      rating: 3.9,
    },
  ],
  Trivia: [
    {
      title: "Random Facts",
      author: "TriviaKing",
      difficulty: "Medium",
      rating: 4.3,
    },
    {
      title: "This or That?",
      author: "QuizCraft",
      difficulty: "Easy",
      rating: 3.8,
    },
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
    <>
      {navComponent}

      <motion.main
        className="min-h-screen bg-linear-to-br from-blue-100 to-emerald-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.header
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white">
              Browse Quizzes
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Explore by category — find topics you love or discover something new.
            </p>
          </motion.header>

          <motion.section
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.06 } },
            }}
          >
            <QuizGrid quizData={quizData} />
          </motion.section>
        </div>
      </motion.main>
    </>
  );
}
