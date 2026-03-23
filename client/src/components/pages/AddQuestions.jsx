import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";

const createEmptyQuestion = () => ({
  question: "",
  options: ["", "", "", ""],
  correctIndex: 0,
});

const AddQuestions = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const [questions, setQuestions] = useState([createEmptyQuestion()]);
  const [submitting, setSubmitting] = useState(false);

  const updateQuestion = (qIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addNewQuestion = () => {
    setQuestions([...questions, createEmptyQuestion()]);
  };

  const removeQuestion = (qIndex) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, index) => index !== qIndex));
  };

  const handleSubmit = async () => {
    for (const q of questions) {
      if (!q.question.trim()) {
        alert("Each question must have text");
        return;
      }
      if (q.options.some((opt) => !opt.trim())) {
        alert("All options must be filled");
        return;
      }
    }

    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/api/user/add/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          docId,
          questions,
          numberOfQuestions: questions.length,
        }),
      });

      if (response.status === 200) {
        navigate(`/quiz/${docId}`);
      } else {
        alert("Failed to save questions");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save questions");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 overflow-hidden">
      <NavbarLoggedIn />

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 pt-32 pb-20 px-4"
      >
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-12 flex flex-col md:flex-row justify-between items-end gap-8"
          >
            <div className="max-w-xl">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-500 text-xs font-black uppercase tracking-widest mb-6"
              >
                Step 02: Core Content
              </motion.div>
              <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
                Question <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Forge</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Add questions, define choices, and mark the correct path. Professional quizzes usually have 5-10 questions.</p>
            </div>

            <div className="flex items-center gap-4 glass border-black/5 dark:border-white/10 p-4 rounded-3xl">
              <div className="text-right">
                <div className="text-2xl font-black text-gray-900 dark:text-white">{questions.length}</div>
                <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Total Questions</div>
              </div>
              <div className="w-[1px] h-10 bg-black/10 dark:bg-white/10" />
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-500">Live</div>
                <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Status</div>
              </div>
            </div>
          </motion.div>

          {/* Question List */}
          <div className="space-y-12">
            <AnimatePresence>
              {questions.map((q, qIndex) => (
                <motion.div
                  key={qIndex}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="group relative"
                >
                  <div className="absolute -left-12 top-10 hidden lg:flex flex-col items-center gap-4">
                    <div className="w-8 h-8 rounded-full glass border-black/5 dark:border-white/10 flex items-center justify-center text-xs font-black text-gray-900 dark:text-white shadow-xl">
                      {qIndex + 1}
                    </div>
                    <div className="w-[1px] h-32 bg-linear-to-b from-black/5 dark:from-white/10 to-transparent" />
                  </div>

                  <div className="glass border-black/5 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-black/10 dark:hover:border-white/20">
                    <div className="flex justify-between items-start mb-10">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Question Content</label>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Definition {qIndex + 1}</h2>
                      </div>

                      <button
                        onClick={() => removeQuestion(qIndex)}
                        disabled={questions.length === 1}
                        className="w-10 h-10 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-600 dark:text-rose-500 hover:text-white transition-all duration-300 flex items-center justify-center font-black disabled:opacity-20"
                      >
                        ✕
                      </button>
                    </div>

                    <textarea
                      value={q.question}
                      onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
                      placeholder="What is the question you want to ask?"
                      className="w-full mb-10 px-8 py-6 rounded-[2rem] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-blue-500/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-300 resize-none text-lg font-medium"
                      rows="2"
                    />

                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                      {q.options.map((opt, optIndex) => (
                        <div key={optIndex} className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-4">Choice {optIndex + 1}</label>
                          <div className="relative">
                            <input
                              value={opt}
                              onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                              placeholder={`Option ${optIndex + 1}`}
                              className={`w-full px-6 py-4 rounded-2xl bg-black/3 dark:bg-white/3 border ${q.correctIndex === optIndex ? 'border-emerald-500/50' : 'border-black/5 dark:border-white/5'} focus:border-blue-500/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-700 outline-none transition-all duration-300`}
                            />
                            {q.correctIndex === optIndex && (
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-500 text-sm font-black">✓</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-black/5 dark:border-white/5">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Select Valid Answer:</span>
                          <div className="flex gap-2">
                            {[0, 1, 2, 3].map((num) => (
                              <button
                                key={num}
                                onClick={() => updateQuestion(qIndex, "correctIndex", num)}
                                className={`w-10 h-10 rounded-xl border font-black text-xs transition-all ${q.correctIndex === num
                                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                    : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-400 dark:text-gray-500 hover:border-black/20 dark:hover:border-white/20'
                                  }`}
                              >
                                {num + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-500/50 uppercase tracking-[0.2em]">Auto-saving Enabled</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Floating Actions */}
          <div className="mt-20 flex flex-col md:flex-row justify-center items-center gap-6">
            <button
              onClick={addNewQuestion}
              className="group px-10 py-5 glass border-black/5 dark:border-white/10 text-gray-900 dark:text-white rounded-[2rem] font-black tracking-widest hover:bg-black/5 dark:hover:bg-white/10 transition-all flex items-center gap-3"
            >
              <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
              ADD NEW QUESTION
            </button>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-12 py-5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-[2rem] font-black tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] disabled:opacity-50 active:scale-95"
            >
              {submitting ? "FINALIZING CONTENT..." : "PUBLISH MASTERPIECE →"}
            </button>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default AddQuestions;
