// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsF-i5jnwqbqyjYMNuZ-EvOQpjiForgc8",
  authDomain: "netflixgpt-8b487.firebaseapp.com",
  projectId: "netflixgpt-8b487",
  storageBucket: "netflixgpt-8b487.appspot.com",
  messagingSenderId: "258047865306",
  appId: "1:258047865306:web:054e6f878ab2a3f93d10e3",
  measurementId: "G-HEFY20Q6HF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();