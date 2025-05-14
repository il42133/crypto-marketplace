// src/firebase.js
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCDsl2BodPCUzgOszG_lqekH8cd_XMqou8",
  authDomain: "crypto-marketplace-b455f.firebaseapp.com",
  projectId: "crypto-marketplace-b455f",
  storageBucket: "crypto-marketplace-b455f.firebasestorage.app",
  messagingSenderId: "229521514525",
  appId: "1:229521514525:web:53b1700bed48314d1066f4",
  measurementId: "G-GBFQBHKXWN"
}

const app  = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
}
