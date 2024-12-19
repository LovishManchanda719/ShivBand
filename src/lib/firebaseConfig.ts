import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzE84J_ac3FU8RmsRM0sl0tGCeCvLgW-8",
  authDomain: "shivband-5fc30.firebaseapp.com",
  projectId: "shivband-5fc30",
  storageBucket: "shivband-5fc30.firebasestorage.app",
  messagingSenderId: "475590308098",
  appId: "1:475590308098:web:ca1c72af30de48a7e4d21b",
  measurementId: "G-FD1Q452WVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export instances
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore instance
