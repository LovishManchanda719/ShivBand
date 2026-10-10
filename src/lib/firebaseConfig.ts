import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase App singleton safely
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Safely initialize Firebase / Google Analytics on client side when supported
let analytics: Analytics | null = null;
let analyticsPromise: Promise<Analytics | null> | null = null;

export const initFirebaseAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window === "undefined") return null;
  if (analytics) return analytics;
  if (!analyticsPromise) {
    analyticsPromise = isSupported()
      .then((supported) => {
        if (supported && firebaseConfig.measurementId) {
          analytics = getAnalytics(app);
          return analytics;
        }
        return null;
      })
      .catch(() => null);
  }
  return analyticsPromise;
};

// Export instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export { analytics };