const express = require("express");
const { registerUser, loginUser, extractTokenData, fetchUser, fetchQuiz, verifyCreator, createQuiz, addQuestions, fetchQuizzes, deleteQuiz, fetchQuestions, submitQuiz } = require("../Models/userModel");
const { auth } = require("firebase-admin");

const router = express.Router();

router.post("/user/register", async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const token = await registerUser(email, username, password);

        if(token == null) {
            const token = await registerUser(email, username, password);
        } else if(token == true) {
            res.status(401).json({ message: "There is a user registered to this email!" });
        } else if (token != true || token != null) {
            // res.status(200).json({ message: "User Registered!", token });
            const userData = await fetchUser(token);
            res.status(200).json({ message: "User Registered!", token, userData });
        }
    } catch (error) {
        console.log("Error calling registerUser: ", error);
    }
});

router.post("/user/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await loginUser(username, password);

        if(token == null) {
            res.status(404).json({ message: "This username is not registered!"});
        } else if(token == false) {
            res.status(401).json({ message: "Incorrect Password!"});
        } else if(token != false && token != null) {
            // res.status(200).json({ message: "User Logged In!", token });
            const userData = await fetchUser(token);
            res.status(200).json({ message: "User Logged In!", token, userData });
        }
    } catch (error) {
        console.log("Error in login route: ", error);
    }
});

router.post("/user/detail", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    const response = await fetchUser(token);

    if (response) {
      res.status(200).json({ response });
    } else if(response == null) {
      res.status(404).json({ message: "Email changed!" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/user/create/quiz", async (req,res) => {
    const authHeader = req.headers.authorization;
    const { quizData } = req.body;

    if(authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        const response = await createQuiz(token, quizData);

        if(response == false) {
            res.status(400).json({ message: "Error creating quiz!" });
        } else if(response) {
            res.status(200).json({ message: "Quiz Created!", docId: response.docId});
        }
    }
});

router.post("/user/add/questions", async (req, res) => {
    const authHeader = req.headers.authorization;
    const { docId, questions, numberOfQuestions } = req.body;

    if(authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        
        const verify = await fetchUser(token);

        let response;

        if(verify) {
            response = await addQuestions(docId, questions, numberOfQuestions);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }

        if(response == false) {
            res.status(400).json({ message: "Error adding questions!" });
        } else if(response == true) {
            res.status(200).json({ message: "Questions Added!" });
        }
    }
});

router.post("/user/fetch/quizzes", async (req, res) => {
    const authHeader = req.headers.authorization;
    
    if(authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        const userData = await fetchUser(token);
        const username = userData.username;
        
        const response = await fetchQuizzes(username);

        if(response != 0) {
            res.status(200).json({ quizzes: response });
        } else if(response == 0) {
            res.status(404).json({ message: "No quizzes found!"});
        }
    }
});

router.post("/user/fetch/quiz", async (req, res) => {
    const authHeader = req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        const data = await extractTokenData(token);
        const username = data.username;

        const { docId } = req.body;

        const quizData = await fetchQuiz(docId);
        const createdBy = quizData.createdBy;

        if(!quizData) {
            return res.status(404).json({ message: "Quiz not found!" });
        }

        const isCreator = await verifyCreator(username, quizData);

        res.status(200).json({ quizData, isCreator });
    }
});

router.post("/user/delete/quiz", async (req, res) => {
    const authHeader = req.headers.authorization;
    const { docId } = req.body;

    if(authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        const verify = await fetchUser(token);

        let response;

        if(verify) {
            response = await deleteQuiz(docId);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }

        if(response == 1) {
            res.status(200).json({ message: "Quiz Deleted!" });
        } else {
            res.status(400).json({ message: "Error deleting quiz!" });
        }
    }
});

router.post("/quiz/fetch", async (req, res) => {
    const { docId } = req.body;

    try {
        const quizData = await fetchQuiz(docId);   // FIXED

        if(quizData) {
            res.status(200).json({ quizData });
        } else {
            res.status(404).json({ message: "Quiz not found!" });
        }
    } catch (error) {
        console.log("Error fetching quiz: ", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/quiz/fetch/questions", async (req, res) => {
    const { docId } = req.body;

    try {
        const response = await fetchQuestions(docId);

        if(response !== null) {
            res.status(200).json({ response });
        } else if (response == null) {
            res.status(404).json({ message: "Questions not found!" });
        }
    } catch (error) {
        console.log("Error fetching questions: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/quiz/submit", async (req, res) => {
    const { docId, answers } = req.body;
    const authHeader = req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        const extractedToken = await extractTokenData(token);
        const username = extractedToken.username;

        // const response = await submitQuiz(docId, answers, username);
        console.log("Answers: ", answers);

    }
});

module.exports = router;