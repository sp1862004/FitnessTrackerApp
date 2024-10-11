

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAADC9W3E4PvUYLCDi64JkpI30KI97ZIZw",
  authDomain: "quizapp-a7542.firebaseapp.com",
  databaseURL: "https://quizapp-a7542-default-rtdb.firebaseio.com",
  projectId: "quizapp-a7542",
  storageBucket: "quizapp-a7542.appspot.com",
  messagingSenderId: "808620614646",
  appId: "1:808620614646:web:1917cf7122cc3b4d745dd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
export default db