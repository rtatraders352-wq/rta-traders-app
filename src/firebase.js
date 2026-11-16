
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAKNZxXDjYRMZje1e583ZVkCkAQPRV4U",
  authDomain: "rta-traders-cf0b5.firebaseapp.com",
  projectId: "rta-traders-cf0b5",
  storageBucket: "rta-traders-cf0b5.firebasestorage.app",
  messagingSenderId: "817967546148",
  appId: "1:817967546148:web:71a1363201e44800387db1",
  measurementId: "G-J84P2J1944"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
