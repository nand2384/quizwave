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
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      // 🔗 TODO: Send this data to Firebase / API
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
    <>
      <NavbarLoggedIn />

      <motion.main
        className="min-h-screen bg-linear-to-br from-blue-100 to-emerald-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="bg-white/85 dark:bg-gray-800/75 backdrop-blur-xl border border-white/60 dark:border-gray-700 rounded-3xl p-8 shadow-2xl shadow-gray-300/60"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white text-center mb-2">
              Create New Quiz
            </h1>
            <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
              Give your quiz a title, choose a category and difficulty. You can
              add questions after creating the quiz.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quiz Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  placeholder="e.g. Space Exploration"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  placeholder="e.g. Test your knowledge of cosmic milestones..."
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Time limit (in minutes)
                </label>
                <input
                  type="number"
                  name="timeLimit"
                  value={formData.timeLimit}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
              </div>

              {/* Rating (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Initial Rating (optional)
                </label>
                <input
                  type="number"
                  name="rating"
                  min={0}
                  max={5}
                  step={0.1}
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  placeholder="0 — 5"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={creating}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg transition disabled:opacity-60"
                >
                  {creating ? "Creating..." : "Create Quiz"}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Helpful tips */}
          <motion.div
            className="mt-6 p-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700 shadow-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
              Tips
            </h3>
            <ul className="text-xs text-gray-600 dark:text-gray-300 list-disc ml-5 space-y-1">
              <li>Keep questions short and clear.</li>
              <li>Use distractor options that are plausible.</li>
              <li>Test your quiz once before publishing.</li>
            </ul>
          </motion.div>
        </div>
      </motion.main>
    </>
  );
};

export default CreateQuiz;
