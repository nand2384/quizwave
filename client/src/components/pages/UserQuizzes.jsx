import React, { useEffect, useState } from "react";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import { motion } from "framer-motion";
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

      if(response.status === 200) {
        setQuizzes(data.quizzes);
        localStorage.setItem("quizzes", JSON.stringify(data.quizzes));
        setLoading(false);
      } else if(response.status === 404) {
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

  const deleteQuiz = async(id) => {
    try {
      localStorage.setItem("quizzes", JSON.stringify(quizzes.filter((quiz) => quiz.id !== id)));

      const response = await fetch("http://localhost:3000/api/user/delete/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ docId: id }),
      });

      if(response.status === 400) {
        console.error("Error deleting quiz");
      }
    } catch (error) {
      console.log("Error deleting quiz: ", error);
    }
  };

  const viewQuiz = async (docId) => {
    navigate(`/quiz/${docId}`, {
      state: {
        data: quizzes.find((quiz) => quiz.id === docId),
      }
    });
  }

  return (
    <>
      <NavbarLoggedIn />

      <motion.main
        className="min-h-screen bg-linear-to-br from-blue-100 to-emerald-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
              Your Quizzes
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Quizzes you created — manage, edit, or delete them.
            </p>
          </header>

          <section
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            aria-live="polite"
          >
            {loading ? (
              // simple loading state
              Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  className="h-40 bg-white/80 dark:bg-gray-800/70 rounded-2xl border border-white/50 dark:border-gray-700 shadow-sm animate-pulse"
                />
              ))
            ) : quizzes.length === 0 ? (
              <div className="col-span-full text-center text-gray-600 dark:text-gray-300">
                You haven't created any quizzes yet.
              </div>
            ) : (
              quizzes.map((quiz, index) => (
                <motion.article
                  key={quiz.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.36 }}
                  className="bg-white/85 dark:bg-gray-800/75 p-4 rounded-xl border border-white/60 dark:border-gray-700 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {quiz.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                        Category: <span className="text-gray-700 dark:text-gray-100 font-medium">{quiz.category}</span>
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            quiz.difficulty === "Easy"
                              ? "bg-green-100 text-green-700"
                              : quiz.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {quiz.difficulty}
                        </span>

                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <span aria-hidden>⭐</span>
                          <span>{quiz.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 dark:text-gray-400 mt-3">
                        Created on {quiz.createdAt}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => viewQuiz(quiz.id)}
                        className="px-3 py-1 rounded-full text-sm bg-white border border-gray-200 hover:bg-blue-50 hover:cursor-pointer text-blue-700 shadow-sm transition"
                      >
                        View
                      </button>

                      <button
                        onClick={() => {
                          // TODO: navigate to edit page
                          alert(`Edit ${quiz.title}`);
                        }}
                        className="px-3 py-1 rounded-full text-sm bg-white border border-gray-200 hover:bg-emerald-50 hover:cursor-pointer text-emerald-700 shadow-sm transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm("Delete this quiz? This action cannot be undone.")) {
                            setQuizzes((prev) => prev.filter((q) => q.id !== quiz.id));
                            deleteQuiz(quiz.id);
                          }
                        }}
                        className="px-3 py-1 rounded-full text-sm bg-white border border-gray-200 hover:bg-red-50 hover:cursor-pointer text-red-600 shadow-sm transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </section>
        </div>
      </motion.main>
    </>
  );
}
