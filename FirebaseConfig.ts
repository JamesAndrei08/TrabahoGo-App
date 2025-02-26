import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeiBWWV3xPSAw8MZKDwCQTy8ASYwDwHZs",
  authDomain: "trabahogo-app.firebaseapp.com",
  projectId: "trabahogo-app",
  storageBucket: "trabahogo-app.firebasestorage.app",
  messagingSenderId: "985673074729",
  appId: "1:985673074729:web:99b90902c7b0d96a6b7438",
  measurementId: "G-YGJ98G2XMY"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);