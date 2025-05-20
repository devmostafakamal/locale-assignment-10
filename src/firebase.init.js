// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0bwArecXa2lwmtr42Kpn2aRgZpt5Puqc",
  authDomain: "garden-client-app.firebaseapp.com",
  projectId: "garden-client-app",
  storageBucket: "garden-client-app.firebasestorage.app",
  messagingSenderId: "735743617578",
  appId: "1:735743617578:web:b112b3c885df5d4222b153",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
