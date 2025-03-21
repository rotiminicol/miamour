// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyDajX08D_mVxq4ZKxj2wFv2Dqt84pHPI24",
   authDomain: "clot-tl27lz.firebaseapp.com",
   projectId: "clot-tl27lz",
   storageBucket: "clot-tl27lz.firebasestorage.app",
   messagingSenderId: "125667112543",
   appId: "1:125667112543:web:447d42c23640278bc64dea"
 };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };