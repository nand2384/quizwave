import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Quizzes from "../components/pages/Quizzes";
import Register from "../components/pages/Register";
import Leaderboard from "../components/pages/Leaderboard";
import UserProfile from "../components/pages/UserProfile";
import UserQuizzes from "../components/pages/UserQuizzes";
import CreateQuiz from "../components/pages/CreateQuiz";
import AddQuestions from "../components/pages/AddQuestions";
import About from "../components/pages/About";
import QuizLanding from "../components/pages/QuizLanding";
import QuizAttemptPage from "../components/pages/QuizAttemptPage";

function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<Register />}></Route>
        <Route path="/signIn" element={<Login />}></Route>
        <Route path="/quizzes" element={<Quizzes />}></Route>
        <Route path="/leaderboard" element={<Leaderboard />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/myQuizzes" element={<UserQuizzes />}></Route>
        <Route path="/createQuiz" element={<CreateQuiz />}></Route>
        <Route path="/quiz/:docId/addQuestions" element={<AddQuestions />}></Route>
        <Route path="/quiz/:docId" element={<QuizLanding />} />
        <Route path="/quiz/:docId/attempt" element={<QuizAttemptPage />}></Route>
      </Routes>
    </> 
  );
}

export default AllRoutes;
