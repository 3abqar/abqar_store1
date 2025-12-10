import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZ39eY2JoPlF74F2vR6p2tHTC7n03vtXQ",
  authDomain: "abqar-store-sales.firebaseapp.com",
  projectId: "abqar-store-sales",
  storageBucket: "abqar-store-sales.firebasestorage.app",
  messagingSenderId: "185156639192",
  appId: "1:185156639192:web:9ced4866c5ed7be067faad",
  measurementId: "G-HFNT47KVSW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
