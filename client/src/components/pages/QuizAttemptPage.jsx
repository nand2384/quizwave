import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function QuizAttemptPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { docId } = useParams();

  const questionsData = location.state?.questions;
  const questions = questionsData?.response || [];
  const title = location.state?.title || "Quiz";
  const timeLimit = location.state?.timeLimit || 0; // in minutes

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});

  /* ---------------- THEME LOGIC ---------------- */

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  /* ---------------- TIMER LOGIC ---------------- */

  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);

  useEffect(() => {
    if (!questions.length) {
      navigate(`/quiz/${docId}`);
    }
  }, [questions, docId, navigate]);

  useEffect(() => {
    if (!timeLimit) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, timeLimit]);

  if (!questions.length) return null;

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const displayIndex = currentIndex + 1;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  /* ---------------- HANDLERS ---------------- */

  const handleSelect = (index) => {
    setSelectedOption(index);
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: index,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(answers[currentIndex + 1] ?? null);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(answers[currentIndex - 1] ?? null);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          docId,
          answers,
        }),
      });
    } catch (error) {
      console.log("Error submitting quiz: ", error);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-linear-to-br from-blue-100 to-emerald-100 dark:from-gray-900 dark:to-gray-800 px-6 py-10"
    >
      {/* HEADER */}
      <div className="w-[98%] mx-auto mb-8 flex justify-between items-center sticky top-6 z-2">

        <Link
          to={`/quiz/${docId}`}
          className="text-lg font-semibold text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
        >
          ← Exit Quiz
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {title}
        </h1>

        <div className="flex items-center gap-4">
          <span className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 shadow text-emerald-600 font-bold">
            ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
          </span>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-900 shadow text-gray-700 dark:text-gray-200 font-semibold"
          >
            {theme === "light" ? "🌙 Dark" : "☀ Light"}
          </button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
          {progressPercent}% completed
        </p>

        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto flex gap-6">

        {/* QUESTION CARD */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 z-4">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
            Question {displayIndex} of {totalQuestions}
          </p>

          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`w-full text-left px-6 py-4 rounded-xl border transition font-medium
                  ${
                    selectedOption === index
                      ? "bg-emerald-100 dark:bg-emerald-900 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* NAVIGATION */}
          <div className="flex justify-between items-center mt-10">
            <button
              onClick={handlePrevious}
              className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium"
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold shadow-md"
            >
              Next →
            </button>
          </div>
        </div>

        {/* QUESTION NAVIGATOR */}
        <div className="w-24 bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex flex-col gap-3 items-center">
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setSelectedOption(answers[idx] ?? null);
              }}
              className={`w-12 h-10 rounded-lg font-bold transition
                ${
                  idx === currentIndex
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* SUBMIT */}
      <div className="flex justify-center mt-12">
        <button
          onClick={handleSubmit}
          className="px-14 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold shadow-xl"
        >
          Submit Quiz
        </button>
      </div>
    </motion.main>
  );
}
