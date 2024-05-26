// src/firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebaseプロジェクトの構成
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);

// Firebase認証の初期化とサービスへの参照の取得
const auth = getAuth(app);

export { auth };
