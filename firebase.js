// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABbIwsM9laBkMmcUW63-yXdPQgEjRWVTw",
  authDomain: "lttbdd-1ed20.firebaseapp.com",
  projectId: "lttbdd-1ed20",
  storageBucket: "lttbdd-1ed20.firebasestorage.app",
  messagingSenderId: "818722725542",
  appId: "1:818722725542:web:c4d6e4be60753ba7d29e67",
  measurementId: "G-ZCQY00MCNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};