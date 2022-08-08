import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBqi5vJD3rMCULZcjWO7ZXZkrAcqOQBRAQ",
    authDomain: "the-city-talks.firebaseapp.com",
    projectId: "the-city-talks",
    storageBucket: "the-city-talks.appspot.com",
    messagingSenderId: "585065905667",
    appId: "1:585065905667:web:d6c46dd0876a2f1d18d836"
  
  };
  

export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);