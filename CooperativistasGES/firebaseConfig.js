import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB2YtpdQNNSyqzLSBEdAKFAa2KAqmHB9D0",
  authDomain: "cooperativistasges.firebaseapp.com",
  projectId: "cooperativistasges",
  storageBucket: "cooperativistasges.firebasestorage.app",
  messagingSenderId: "16742635042",
  appId: "1:16742635042:web:15c1da6cf4d2b5eae49c7b"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
