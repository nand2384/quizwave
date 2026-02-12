// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //YOUR FIREBASE CONFIG GOES HERE
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export let db = getFirestore();
