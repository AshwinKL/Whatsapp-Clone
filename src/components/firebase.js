import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "whatsapp-clone-kl.firebaseapp.com",
  projectId: "whatsapp-clone-kl",
  storageBucket: "whatsapp-clone-kl.appspot.com",
  messagingSenderId: "649140572289",
  appId: "1:649140572289:web:8dd5cade6d26190eae3d80",
  measurementId: "G-H2RX9SFEXQ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();

export default db;
