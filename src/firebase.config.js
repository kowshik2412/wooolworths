import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB5p9oHBFGfKfj_Lq5axrJvxomEb9KR4Co",
  authDomain: "wooolworths.firebaseapp.com",
  projectId: "wooolworths",
  storageBucket: "wooolworths.appspot.com",
  messagingSenderId: "902419846368",
  appId: "1:902419846368:web:8d530f0f5e0be397f1ac85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;