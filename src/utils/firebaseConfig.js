import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD-j9jmDAxXqtkoLf1iFqVyhLd5qP11WfI',
  authDomain: 'trivia-quiz-bink.firebaseapp.com',
  projectId: 'trivia-quiz-bink',
  storageBucket: 'trivia-quiz-bink.appspot.com',
  messagingSenderId: '102970497799',
  appId: '1:102970497799:web:59da2ed3ab9e2bf952c3a2',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
