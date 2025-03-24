import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const API_KEY = import.meta.env.VITE_FIREBASE_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'trivia-quiz-bink.firebaseapp.com',
  projectId: 'trivia-quiz-bink',
  storageBucket: 'trivia-quiz-bink.appspot.com',
  messagingSenderId: '102970497799',
  appId: '1:102970497799:web:59da2ed3ab9e2bf952c3a2',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
