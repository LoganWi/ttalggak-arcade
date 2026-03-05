import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCawc0Ux__BVNUYo59N0exQsEvhmEyvXCM",
  authDomain: "ttalggak-arcade.firebaseapp.com",
  projectId: "ttalggak-arcade",
  storageBucket: "ttalggak-arcade.firebasestorage.app",
  messagingSenderId: "842031171632",
  appId: "1:842031171632:web:6cc2efb9fcc7272be385f5",
  measurementId: "G-SX9HVL60RV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, doc, getDoc, updateDoc, setDoc, increment };
