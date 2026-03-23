import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import Navbar from "../navbar/Navbar";
import { motion } from "framer-motion";
import { Pencil, Trash2, Clock, BookOpen, Star, User } from "lucide-react";

export default function QuizLanding() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogged = !!localStorage.getItem("userToken");

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isQuestionReady, setIsQuestionReady] = useState(false);
  const [title, setTitle] = useState();
  const [timeLimit, setTimeLimit] = useState();

  const { data } = location.state || {};

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
        setQuiz(prev => ({ ...prev, ...result.quizData, isCreator: result.isCreator }));
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docId }),
      });
      const result = await response.json();
      if (response.status === 200) {
        setQuiz(prev => ({ ...prev, ...result.quizData, isCreator: false }));
      }
    } catch (error) {
      console.log("Error fetching quiz:", error);
    }
  };

  const fetchQuestions = async () => {
    try {
      setIsQuestionReady(false);
      const response = await fetch("http://localhost:3000/api/quiz/fetch/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docId }),
      });
      const result = await response.json();
      setQuestions(result);
      setIsQuestionReady(true);
    } catch (error) {
      console.log("Error fetching questions:", error);
    }
  };

  const deleteQuiz = async () => {
    if (window.confirm("Delete this masterpiece?")) {
      await fetch("http://localhost:3000/api/user/delete/quiz", {
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

  useEffect(() => {
    if (data) setQuiz(data);
    if (isLogged) fetchLoggedQuiz(); else fetchNotLoggedQuiz();
  }, [data, isLogged, docId]);

  useEffect(() => {
    fetchQuestions();
  }, [docId]);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest animate-pulse">
        Initializing Workspace...
      </div>
    );
  }

  const isCreator = quiz.isCreator === true;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 overflow-hidden">
      {isLogged ? <NavbarLoggedIn /> : <Navbar />}

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
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass border-black/5 dark:border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32 rounded-full" />

            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-500 text-xs font-black uppercase tracking-widest">
                    {quiz.category}
                  </span>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${quiz.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500" :
                      quiz.difficulty === "Medium" ? "bg-amber-500/10 text-amber-600 dark:text-amber-500" :
                        "bg-rose-500/10 text-rose-600 dark:text-rose-500"
                    }`}>
                    {quiz.difficulty}
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                  {quiz.title}
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-2xl">
                  {quiz.description || "Challenge yourself with this expertly crafted quiz. Test your limits, improve your skills, and earn your place on the leaderboard."}
                </p>
              </div>

              {isCreator && (
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/quiz/${docId}/edit`)}
                    className="w-14 h-14 rounded-2xl glass border-black/5 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all hover:scale-110"
                    title="Edit Content"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={deleteQuiz}
                    className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-500 hover:bg-rose-500 hover:text-white transition-all hover:scale-110"
                    title="Delete Quiz"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                { icon: <BookOpen size={18} />, label: "Questions", value: quiz.totalQuestions || "—" },
                { icon: <Clock size={18} />, label: "Time Limit", value: `${quiz.timeLimit} Min` },
                { icon: <Star size={18} />, label: "Top Rank", value: quiz.rating || "4.5" },
                { icon: <User size={18} />, label: "Architect", value: quiz.createdBy || "Member" },
              ].map((stat, i) => (
                <div key={i} className="glass border-black/3 dark:border-white/5 p-6 rounded-[2rem] text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <div className="text-blue-600 dark:text-blue-500 mb-3 flex justify-center">{stat.icon}</div>
                  <div className="text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-lg font-black text-gray-900 dark:text-white">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              {!isLogged ? (
                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-5 rounded-[2rem] bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-black tracking-widest shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all hover:scale-[1.02] active:scale-95 uppercase"
                >
                  Sign In to Resume Progress
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
                  className={`w-full py-6 rounded-[2rem] text-xl font-black tracking-[0.2em] transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] uppercase ${isQuestionReady
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white hover:scale-[1.02]"
                      : "bg-black/5 dark:bg-white/5 text-gray-300 dark:text-gray-700 cursor-not-allowed border border-black/5 dark:border-white/5"
                    }`}
                >
                  {isQuestionReady ? "Initialize Sequence →" : "Synchronizing..."}
                </button>
              )}
            </div>

            <div className="mt-12 text-center">
              <p className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-[0.4em]">
                Verified Content Module 88-X
              </p>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}
