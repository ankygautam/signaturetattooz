import { FirebaseOptions, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const fallbackFirebaseConfig = {
  apiKey: "AIzaSyBVlA4To3cSwmy03XyvaNfPMX0l1Q795-s",
  authDomain: "signaturetattooz-8a3a1.firebaseapp.com",
  projectId: "signaturetattooz-8a3a1",
  storageBucket: "signaturetattooz-8a3a1.firebasestorage.app",
  messagingSenderId: "868503435345",
  appId: "1:868503435345:web:87e1b9ba5bb3d84f21a070",
} as const;

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || fallbackFirebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || fallbackFirebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || fallbackFirebaseConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || fallbackFirebaseConfig.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || fallbackFirebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || fallbackFirebaseConfig.appId,
};

export const firebaseConfigured = Object.values(firebaseConfig).every(Boolean);

export const app = firebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const auth: Auth | null = app ? getAuth(app) : null;
export const db: Firestore | null = app ? getFirestore(app) : null;
