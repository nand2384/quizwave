import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

  // 🔥 SUBMIT HANDLER
  const handleSubmit = async () => {
    // basic validation
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
      // 🔗 YOU ALREADY HAVE THIS API
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

      if(response.status == 200) {
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
    <>
      <NavbarLoggedIn />

      <motion.main
        className="min-h-screen bg-linear-to-br from-blue-100 to-emerald-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
              Add Questions
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Quiz ID: <span className="font-mono">{docId}</span>
            </p>
          </div>

          {/* Questions */}
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="mb-6 bg-white/85 dark:bg-gray-800/75 rounded-3xl p-8 shadow-xl border border-white/60 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                  Question {qIndex + 1}
                </h2>

                <button
                  onClick={() => removeQuestion(qIndex)}
                  disabled={questions.length === 1}
                  className="text-red-500 text-xl font-bold hover:cursor-pointer disabled:opacity-30"
                >
                  ×
                </button>
              </div>

              <textarea
                value={q.question}
                onChange={(e) =>
                  updateQuestion(qIndex, "question", e.target.value)
                }
                placeholder="Enter question"
                className="w-full mb-4 px-4 py-3 rounded-lg border dark:border-gray-600 bg-transparent"
              />

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {q.options.map((opt, optIndex) => (
                  <input
                    key={optIndex}
                    value={opt}
                    onChange={(e) =>
                      updateOption(qIndex, optIndex, e.target.value)
                    }
                    placeholder={`Option ${optIndex + 1}`}
                    className="px-3 py-2 rounded-lg border dark:border-gray-600 bg-transparent"
                  />
                ))}
              </div>

              <select
                value={q.correctIndex}
                onChange={(e) =>
                  updateQuestion(
                    qIndex,
                    "correctIndex",
                    Number(e.target.value)
                  )
                }
                className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-transparent"
              >
                <option value={0}>Option 1</option>
                <option value={1}>Option 2</option>
                <option value={2}>Option 3</option>
                <option value={3}>Option 4</option>
              </select>
            </div>
          ))}

          {/* ACTION BUTTONS */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={addNewQuestion}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold"
            >
              + Add Question
            </button>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </button>
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default AddQuestions;
