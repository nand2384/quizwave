import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Send, Timer, HelpCircle } from "lucide-react";

export default function QuizAttemptPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { docId } = useParams();

  const questionsData = location.state?.questions;
  const questions = questionsData?.response || [];
  const title = location.state?.title || "Quiz";
  const timeLimit = location.state?.timeLimit || 0;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
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
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, timeLimit]);

  if (!questions.length) return null;

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const displayIndex = currentIndex + 1;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = Math.round((Object.keys(answers).length / totalQuestions) * 100);

  const handleSelect = (index) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: index }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      await fetch("http://localhost:3000/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ docId, answers }),
      });
      navigate(`/quiz/${docId}/results`, { state: { answers, questions } });
    } catch (error) {
      console.log("Error submitting quiz: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 overflow-hidden flex flex-col">
      {/* Immersive Header */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-8 px-8">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center glass border-black/5 dark:border-white/10 rounded-[2rem] px-8 py-4 shadow-2xl">
          <div className="flex items-center gap-6">
            <Link to={`/quiz/${docId}`} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group">
              <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-gray-900 dark:text-white">{title}</h1>
              <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Session Active
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Progress</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                </div>
                <span className="text-sm font-black text-gray-900 dark:text-white">{progressPercent}%</span>
              </div>
            </div>

            <div className={`px-6 py-3 rounded-2xl glass border-black/5 dark:border-white/10 flex items-center gap-3 transition-colors ${timeLeft < 60 ? 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-500' : 'text-emerald-600 dark:text-emerald-500'}`}>
              <Timer className="w-5 h-5" />
              <span className="text-xl font-black tabular-nums">{minutes}:{seconds.toString().padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mt-32 p-8 flex flex-col items-center justify-center relative">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 -z-10" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 -z-10" />

        <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 items-stretch">
          <div className="hidden lg:flex flex-col gap-3 glass border-black/5 dark:border-white/5 p-4 rounded-[2rem] h-fit sticky top-40">
            {Array.from({ length: totalQuestions }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-12 h-12 rounded-xl font-black text-xs transition-all duration-300 ${idx === currentIndex
                    ? "bg-gray-900 dark:bg-white text-white dark:text-black scale-110 shadow-xl"
                    : answers[idx] !== undefined
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20"
                      : "bg-black/5 dark:bg-white/5 text-gray-400 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/20"
                  }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98, x: -20 }}
                className="glass border-black/5 dark:border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden flex-1"
              >
                <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500">
                      <HelpCircle size={20} />
                    </div>
                    <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Objective {displayIndex} / {totalQuestions}</span>
                  </div>
                  {answers[currentIndex] !== undefined && (
                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">Answer Stored</span>
                  )}
                </div>

                <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-16 leading-tight">
                  {currentQuestion.question}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      className={`group w-full text-left px-8 py-6 rounded-2xl border transition-all duration-300 flex items-center justify-between ${answers[currentIndex] === index
                          ? "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500 text-white shadow-2xl shadow-blue-600/20 scale-[1.02]"
                          : "bg-black/3 dark:bg-white/3 border-black/5 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:border-black/10 dark:hover:border-white/20 hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                    >
                      <span className="text-lg font-bold">{option}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${answers[currentIndex] === index ? "border-white bg-white text-blue-600" : "border-black/10 dark:border-white/10"
                        }`}>
                        {answers[currentIndex] === index && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-between items-center gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-8 py-4 rounded-2xl glass border-black/5 dark:border-white/10 text-gray-400 font-black text-xs uppercase tracking-widest hover:bg-black/5 dark:hover:bg-white/5 transition-all disabled:opacity-0"
              >
                <ChevronLeft className="inline mr-2" /> Previous
              </button>

              <div className="flex items-center gap-4">
                {currentIndex === totalQuestions - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="px-12 py-5 rounded-[1.5rem] bg-emerald-500 hover:bg-emerald-600 text-white font-black tracking-widest transition-all shadow-2xl shadow-emerald-500/20 flex items-center gap-3 hover:scale-105 active:scale-95"
                  >
                    <Send size={18} /> SUBMIT RESOLUTION
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-12 py-5 rounded-[1.5rem] bg-gray-900 dark:bg-white hover:bg-blue-600 text-white dark:text-black hover:dark:text-white font-black tracking-widest transition-all shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95"
                  >
                    NEXT OBJECTIVE <ChevronRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-8 text-center">
        <p className="text-[10px] font-black text-gray-300 dark:text-gray-800 uppercase tracking-[0.5em]">
          End-to-End Encrypted Session • QuizWave Core
        </p>
      </footer>
    </div>
  );
}
