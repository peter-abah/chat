// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbIMYH63LtW5-VIyM9_uqBbgr2Kqq4JfY",
  authDomain: "simple-chat-777.firebaseapp.com",
  projectId: "simple-chat-777",
  storageBucket: "simple-chat-777.appspot.com",
  messagingSenderId: "74265271175",
  appId: "1:74265271175:web:18d61e5c5266aa44995122"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app);

export default app;