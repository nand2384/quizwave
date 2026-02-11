// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0ThOxmW97K8-y8ZEsDtT24G9mZQiv3Rw",
  authDomain: "quiz-app-4c16c.firebaseapp.com",
  projectId: "quiz-app-4c16c",
  storageBucket: "quiz-app-4c16c.firebasestorage.app",
  messagingSenderId: "642920273696",
  appId: "1:642920273696:web:135199276d8e1ac367e945",
  measurementId: "G-3GKTWPVJRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export let db = getFirestore();