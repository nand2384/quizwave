import React, { useState } from "react";
import NavbarLoggedIn from "../navbar/NavbarLoggedIn";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const categories = [
  "General Knowledge",
  "Science",
  "Literature",
  "Entertainment",
  "History",
  "Sports",
  "Technology",
  "Programming",
];

const CreateQuiz = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  const token = localStorage.getItem("userToken");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Easy",
    timeLimit: 0,
    rating: 0,
    createdAt: formattedDate,
  });

  const [creating, setCreating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const response = await fetch("http://localhost:3000/api/user/create/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quizData: formData }),
      });
      const data = await response.json();
      const docId = data.docId;
      navigate(`/quiz/${docId}/addQuestions`);
    } catch (err) {
      console.error("Create error:", err);
      alert("Failed to create quiz — try again.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 overflow-hidden">
      <NavbarLoggedIn />

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 pt-32 pb-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.header
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-12 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-500 text-xs font-black uppercase tracking-widest mb-6"
            >
              Master Creator
            </motion.div>
            <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
              Construct a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Masterpiece</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Define the core parameters of your quiz. You'll add questions in the next step.</p>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="glass border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] -mr-16 -mt-16 rounded-full" />

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Quiz Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 focus:border-emerald-500/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-300"
                        placeholder="e.g. Quantum Physics 101"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 focus:border-emerald-500/50 text-gray-900 dark:text-white outline-none transition-all duration-300 appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-white dark:bg-[#030712]">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat} className="bg-white dark:bg-[#030712]">{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 focus:border-emerald-500/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-300 resize-none"
                      placeholder="Give a brief overview of what players should expect..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Difficulty Level</label>
                      <div className="flex gap-2">
                        {['Easy', 'Medium', 'Hard'].map((diff) => (
                          <button
                            key={diff}
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, difficulty: diff }))}
                            className={`flex-1 py-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all duration-300 ${formData.difficulty === diff
                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-black/10 dark:hover:border-white/20'
                              }`}
                          >
                            {diff}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Time Limit (Min)</label>
                      <input
                        type="number"
                        name="timeLimit"
                        value={formData.timeLimit}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 focus:border-emerald-500/50 text-gray-900 dark:text-white outline-none transition-all duration-300"
                        min="1"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={creating}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-5 rounded-[2rem] font-black text-lg transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] disabled:opacity-50 active:scale-95"
                  >
                    {creating ? "Processing Workspace..." : "Initialize Quiz Builder →"}
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="glass border-black/5 dark:border-white/10 rounded-[2.5rem] p-8">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                  Pro Tips
                </h3>
                <ul className="space-y-6">
                  {[
                    { icon: "💡", title: "Be Clear", desc: "Use clear, concise language for titles and descriptions." },
                    { icon: "🎨", title: "Categorize", desc: "Picking the right category helps players find your content." },
                    { icon: "⌛", title: "Timed Challenge", desc: "Add a challenge by setting a reasonable time limit." },
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-2xl">{tip.icon}</span>
                      <div>
                        <h4 className="text-sm font-black text-gray-900 dark:text-white mb-1 uppercase tracking-widest">{tip.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{tip.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass border-black/5 dark:border-white/5 rounded-[2.5rem] p-8 bg-linear-to-br from-blue-500/5 to-transparent">
                <h3 className="text-sm font-black text-gray-900 dark:text-white mb-2 uppercase tracking-widest">Next Step</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-4">You will be redirected to the interactive question builder where you can add as many questions as you like.</p>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-black text-[10px] uppercase tracking-tighter">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  Live Preview Available
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default CreateQuiz;
