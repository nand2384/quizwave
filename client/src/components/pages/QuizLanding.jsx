import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import Navbar from "../navbar/Navbar";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

export default function QuizLanding() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Auth source of truth
  const isLogged = !!localStorage.getItem("userToken");

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isQuestionReady, setIsQuestionReady] = useState(false);

  const [title, setTitle] = useState();
  const [timeLimit, setTimeLimit] = useState();

  const { data } = location.state || {};

  /* ---------------- FETCH QUIZ META ---------------- */

  const fetchLoggedQuiz = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/fetch/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ docId }),
      });

      const result = await response.json();

      if (response.status === 200) {
        setQuiz(prev => ({
          ...prev,              // keep UI data
          ...result.quizData,  // backend truth
          isCreator: result.isCreator
        }));
        setTitle(result.quizData.title);
        setTimeLimit(result.quizData.timeLimit);
      }
    } catch (error) {
      console.log("Error fetching quiz:", error);
    }
  };


  const fetchNotLoggedQuiz = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/quiz/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ docId }),
      });

      const result = await response.json();

      if (response.status === 200) {
        setQuiz(prev => ({
          ...prev,
          ...result.quizData,
          isCreator: false
        }));
      }
    } catch (error) {
      console.log("Error fetching quiz:", error);
    }
  };


  /* ---------------- FETCH QUESTIONS ---------------- */

  const fetchQuestions = async () => {
    try {
      setIsQuestionReady(false);

      const response = await fetch(
        "http://localhost:3000/api/quiz/fetch/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ docId }),
        }
      );

      const result = await response.json();
      setQuestions(result);
      setIsQuestionReady(true);
    } catch (error) {
      console.log("Error fetching questions:", error);
    }
  };

  const deleteQuiz = async () => {
    if (window.confirm("Delete this quiz? This action cannot be undone.")) {
     const response = fetch("http://localhost:3000/api/user/delete/quiz", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify({ docId })
     });
     navigate("/myQuizzes");
    };
  };

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {
    if(data) {
      setQuiz(data);
    }

    if (isLogged) {
      fetchLoggedQuiz();
    } else {
      fetchNotLoggedQuiz();
    }
  }, [data, isLogged, docId]);

  useEffect(() => {
    fetchQuestions();
  }, [docId]);

  /* ---------------- LOADER ---------------- */

  if (!quiz) {
    return (
      <>
        {isLogged ? <NavbarLoggedIn /> : <Navbar />}
        <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
          Loading quiz...
        </div>
      </>
    );
  }

  const isCreator = quiz.isCreator === true;

  /* ---------------- UI ---------------- */

  return (
    <>
      {isLogged ? <NavbarLoggedIn /> : <Navbar />}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="min-h-screen bg-linear-to-br from-blue-100 to-emerald-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/75 backdrop-blur rounded-2xl p-8 border border-white/60 dark:border-gray-700 shadow-lg">

            {/* Title */}
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
                {quiz.title}
              </h1>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  quiz.difficulty === "Easy"
                    ? "bg-green-100 text-green-700"
                    : quiz.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {quiz.difficulty}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl">
              {quiz.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <Stat label="Category" value={quiz.category} />
              <Stat label="Questions" value={quiz.totalQuestions} />
              <Stat label="Time Limit" value={`${quiz.timeLimit} min`} />
              <Stat label="Created By" value={quiz.createdBy} />
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between mt-10 w-full">

              {/* LEFT SLOT — Start/Login */}
              <div className="flex items-center gap-3">
                {!isLogged ? (
                  <button
                    onClick={() => navigate("/login")}
                    className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition"
                  >
                    Login to Start Quiz
                  </button>
                ) : (
                  <button
                    disabled={!isQuestionReady}
                    onClick={() => {
                      if (!isQuestionReady) return;
                      navigate(`/quiz/${docId}/attempt`, {
                        state: { questions, title: title, timeLimit: timeLimit },
                      });
                    }}
                    className={`px-8 py-3 rounded-xl text-lg font-semibold transition shadow-md ${
                      isQuestionReady
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isQuestionReady ? "Start Quiz" : "Loading..."}
                  </button>
                )}
              </div>

              {/* RIGHT SLOT — Edit/Delete (creator only) */}
              <div className="flex items-center gap-3">
                {isLogged && isCreator && (
                  <>
                    <button
                      onClick={() => navigate(`/quiz/${docId}/edit`)}
                      className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-700 transition"
                      title="Edit Quiz"
                    >
                      <Pencil size={20} />
                    </button>

                    <button
                      onClick={deleteQuiz}
                      className="p-3 rounded-xl bg-red-500 dark:bg-red-700 border border-gray-400 dark:border-gray-700 text-white hover:bg-red-600 dark:hover:bg-red-800 transition"
                      title="Delete Quiz"
                    >
                      <Trash2 size={20} />
                    </button>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </motion.main>
    </>
  );
}

/* STAT CARD */
function Stat({ label, value }) {
  return (
    <div className="bg-white/70 dark:bg-gray-900/60 rounded-xl p-4 text-center border border-white/60 dark:border-gray-700">
      <p className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wide">
        {label}
      </p>
      <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">
        {value}
      </p>
    </div>
  );
}
