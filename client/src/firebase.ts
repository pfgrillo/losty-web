// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
  } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvj2NCKOKoyFn-TF43rfpIOb7ud5SOqGQ",
  authDomain: "losty-maps.firebaseapp.com",
  projectId: "losty-maps",
  storageBucket: "losty-maps.appspot.com",
  messagingSenderId: "551381662280",
  appId: "1:551381662280:web:be1501ed9299f49d4d367d",
  measurementId: "G-XWZ8L1TMS0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
  }
export default app;