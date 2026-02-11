const { db, admin } = require("../../firebase.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const e = require("express");
dotenv.config();

const SECRET_KEY = process.env.JWT_KEY;

const saltRounds = 10;

const registerUser = async (email, username, password) => {
    let hashedPassword = await bcrypt.hash(password, saltRounds);

    const userRef = db.collection("users");
    const snapshot = await userRef.where("email", "==", email).get();

    if(snapshot.empty) {
        try {
            const docRef = await db.collection("users").add({
                username,
                email,
                password: hashedPassword,
                quizzes: 0,
                
            });

            if(docRef) {
                try {
                    const registeredUser = await userRef.where("email", "==", email).get();

                    if(registeredUser.empty) {
                        return null;
                    } else {
                        const UserDoc = registeredUser.docs[0];
                        const userData = UserDoc.data();

                        try {
                            const token = jwt.sign(
                                { id: UserDoc.id, email: userData.email, username: userData.username},
                                SECRET_KEY,
                                { expiresIn: "1h" }
                            );
                            return token;
                        } catch (error) {
                            console.log("Error generating token: ", error)
                        }
                    }
                } catch(error) {
                    console.log("Error fetching the registered user: ", error);
                }
            }
        } catch (error) {
            console.log("Register user Error: ", error);
        }
    } else {
        return true;
    }
};

const loginUser = async (username, password) => {
    const userRef = db.collection("users").where("username", "==", username);
    const snapshot = await userRef.get();

    if(snapshot.empty) {
        return null;
    } else {
        const doc = snapshot.docs[0];
        const data = doc.data();
        const storedPassword = data.password;
        
        try {
            let compareResult = await bcrypt.compare(password, storedPassword);
            
            if(compareResult) {
                const token = jwt.sign(
                    { id: doc.id, email: data.email, username: data.username },
                    SECRET_KEY,
                    { expiresIn: "1h" }
                );
                return token;
            } else {
                return false;
            }
        } catch (error) {
            console.log("loginUser Model Error: ", error);
        }
    }
};

const extractTokenData = async (token) => {
    const payload = jwt.decode(token, SECRET_KEY);
    const email = payload.email;
    const username = payload.username;
    const userDocId = payload.id;

    const data = {
        email,
        username,
        userDocId,
    };
    
    return data;
};

const fetchUser = async (token) => {
    const payload = jwt.decode(token, SECRET_KEY);
    const email = payload.email;
    const docId = payload.id;

    const docRef = db.collection("users").doc(docId);
    const doc = await docRef.get();

    const data = doc.data();

    if(data.email == email) {
        return data;
    } else {
        return null;
    }
};

const fetchQuiz = async (docId) => {
    const docRef = db.collection("quizzes").doc(docId);
    const doc = await docRef.get();
    
    const data = doc.data();
    
    if(data) {
        return data;
    } else {
        return null;
    }
};

const verifyCreator = async (username, quizData) => {
    return quizData.createdBy === username;
};

const createQuiz = async (token, quizData) => {
    const quizRef = db.collection("quizzes");
    const payload = jwt.decode(token, SECRET_KEY);
    const username = payload.username;
    
    try {
        const docRef = await quizRef.add({
            title: quizData.title,
            description: quizData.description,
            category: quizData.category,
            difficulty: quizData.difficulty,
            timeLimit: quizData.timeLimit,
            rating: quizData.rating,
            createdAt: quizData.createdAt,
            createdBy: username,
        });

        const data = await docRef.get();
        const docId = data.id;

        if(docRef) {
            return { docId };
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error creating quiz: ", error);
    }
};

const addQuestions = async (docId, questions, numberOfQuestions) => {
  const quizRef = db.collection("quizzes").doc(docId);
  const batch = db.batch();

  questions.forEach((q, index) => {
    const questionRef = quizRef.collection("questions").doc();

    batch.set(questionRef, {
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      order: index + 1,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  batch.set(quizRef, {
    totalQuestions: numberOfQuestions,
  }, { merge: true });

  let response;

  try {
    response = await batch.commit();
    console.log("All questions added successfully");
  } catch (error) {
    console.error("Error adding questions:", error);
    throw error;
  }

  if(response) {
    return true;
  } else {
    return false;
  }
};

const fetchQuizzes = async (username) => {
    const quizzesRef = db.collection("quizzes");
    const snapshot = await quizzesRef.where("createdBy", "==", username).get();

    if(snapshot.empty) {
        return 0;
    } else {
        const quizzes = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            quizzes.push({
                id: doc.id,
                title: data.title,
                description: data.description,
                category: data.category,
                difficulty: data.difficulty,
                rating: data.rating,
                createdAt: data.createdAt,
                createdBy: data.createdBy,
                totalQuestions: data.totalQuestions,
                timeLimit: data.timeLimit,
                isCreator: true,
            });
        });
        return quizzes;
    }
};

const deleteQuiz = async (docId) => {
    const quizRef = db.collection("quizzes").doc(docId);

    try {
        const response = await quizRef.delete();
        console.log("Response: ", response);
        return 1;
    } catch (error) {
        console.log("Error deleting quiz: ", error);
    }
};

const fetchQuestions = async (docId) => {
    const quizRef = db.collection("quizzes").doc(docId);
    const questionsRef = quizRef.collection("questions");

    const snapshot = await questionsRef.get();

    if(snapshot) {
        const questions = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            questions.push({
                id: doc.id,
                question: data.question,
                options: data.options,
                correctIndex: data.correctIndex,
                order: data.order,
                createdAt: data.createdAt,
            });
        });
        return questions;
    } else {
        return null;
    }
};

const submitQuiz = async (docId, answers, username) => {
    const resultRef = db.collection("results");
}

module.exports = {
    registerUser,
    loginUser,
    extractTokenData,
    fetchUser,
    fetchQuiz,
    verifyCreator,
    createQuiz,
    addQuestions,
    fetchQuizzes,
    deleteQuiz,
    fetchQuestions,
    submitQuiz,
};