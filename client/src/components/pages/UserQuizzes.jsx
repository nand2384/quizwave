import React, { useEffect, useState } from "react";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

export default function UserQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuizzes = localStorage.getItem("quizzes");
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
      fetchQuizzes();
      setLoading(false);
    } else {
      fetchQuizzes();
    }
  }, []);

  const fetchQuizzes = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch("http://localhost:3000/api/user/fetch/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setQuizzes(data.quizzes);
        localStorage.setItem("quizzes", JSON.stringify(data.quizzes));
        setLoading(false);
      } else if (response.status === 404) {
        setQuizzes([]);
        localStorage.setItem("quizzes", JSON.stringify([]));
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching quizzes: ", error);
      setQuizzes([]);
      setLoading(false);
    }
  }

  const deleteQuiz = async (id) => {
    try {
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
      localStorage.setItem("quizzes", JSON.stringify(quizzes.filter((quiz) => quiz.id !== id)));
      await fetch("http://localhost:3000/api/user/delete/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ docId: id }),
      });
    } catch (error) {
      console.log("Error deleting quiz: ", error);
    }
  };

  const viewQuiz = (docId) => {
    navigate(`/quiz/${docId}`, {
      state: { data: quizzes.find((quiz) => quiz.id === docId) }
    });
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 overflow-hidden">
      <NavbarLoggedIn />

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
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-500 text-xs font-black uppercase tracking-widest mb-6"
            >
              Creator Studio
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Library</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Manage your creations, monitor their performance, and update your content. Your contribution to the QuizWave community.
            </p>
          </motion.header>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="h-[350px] rounded-[2.5rem] glass border-black/5 dark:border-white/5 animate-pulse"
                  />
                ))
              ) : quizzes.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center glass border-black/5 dark:border-white/10 rounded-[3rem]"
                >
                  <div className="text-6xl mb-6">📚</div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">No Quizzes Found</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-10 max-w-md mx-auto">Your library is currently empty. Start your journey by creating your first masterpiece.</p>
                  <button
                    onClick={() => navigate('/createQuiz')}
                    className="px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black transition-all shadow-xl"
                  >
                    CREATE YOUR FIRST +
                  </button>
                </motion.div>
              ) : (
                quizzes.map((quiz, index) => (
                  <motion.article
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative h-full"
                  >
                    <div className="glass border-black/5 dark:border-white/10 rounded-[2.5rem] p-8 h-full flex flex-col hover:border-black/10 dark:hover:border-white/20 transition-all duration-300">
                      <div className="flex justify-between items-start mb-6">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black bg-black/5 dark:bg-white/5 text-gray-400 border border-black/5 dark:border-white/5 uppercase tracking-widest">
                          {quiz.category}
                        </span>
                        <div className="flex items-center gap-1 text-amber-600 dark:text-amber-500">
                          <span className="text-xs font-black">{quiz.rating}</span>
                          <span className="text-sm">⭐</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {quiz.title}
                      </h3>

                      <div className="flex gap-2 mb-8">
                        <span className={`px-4 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${quiz.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500" :
                            quiz.difficulty === "Medium" ? "bg-amber-500/10 text-amber-600 dark:text-amber-500" :
                              "bg-rose-500/10 text-rose-600 dark:text-rose-500"
                          }`}>
                          {quiz.difficulty}
                        </span>
                      </div>

                      <div className="mt-auto pt-8 border-t border-black/5 dark:border-white/5 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Created: {quiz.createdAt}</span>
                          <span className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest">Active</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => viewQuiz(quiz.id)}
                            className="flex-1 py-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-900 dark:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                          >
                            View
                          </button>
                          <button
                            onClick={() => navigate(`/quiz/${quiz.id}/edit`)}
                            className="flex-1 py-3 rounded-xl bg-blue-500/10 hover:bg-blue-600 dark:hover:bg-blue-500 text-blue-600 dark:text-blue-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm("Delete this masterpiece?")) {
                                deleteQuiz(quiz.id);
                              }
                            }}
                            className="flex-1 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-600 dark:hover:bg-rose-500 text-rose-600 dark:text-rose-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              )}
            </AnimatePresence>
          </section>
        </div>
      </motion.main>
    </div>
  );
}
