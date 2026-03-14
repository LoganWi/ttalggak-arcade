import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment, collection, query, orderBy, limit, getDocs, serverTimestamp } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

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

// Only initialize analytics on the client side
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const db = getFirestore(app);

export { db, doc, getDoc, updateDoc, setDoc, increment, collection, query, orderBy, limit, getDocs, serverTimestamp, analytics };
