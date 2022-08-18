import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDXq8rW0o1sffE4K1qxjvdm7PYlFeg1vJs",
  authDomain: "thetalkingcity.firebaseapp.com",
  projectId: "thetalkingcity",
  storageBucket: "thetalkingcity.appspot.com",
  messagingSenderId: "651635883245",
  appId: "1:651635883245:web:0e4f234c92441d90fd20e4"
  
  };
  

export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);
