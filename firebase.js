// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
   apiKey: "AIzaSyA5ZatulVEicBeWqNciKtjd4fcQeAvohmY",
  authDomain: "natty-caa61.firebaseapp.com",
  projectId: "natty-caa61",
  storageBucket: "natty-caa61.firebasestorage.app",
  messagingSenderId: "822585320498",
  appId: "1:822585320498:web:01f76915ec4735bb6d082b",
  measurementId: "G-3RVDQ36T50"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);




  // firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const firebaseConfig = {
   apiKey: "AIzaSyA5ZatulVEicBeWqNciKtjd4fcQeAvohmY",
  authDomain: "natty-caa61.firebaseapp.com",
  projectId: "natty-caa61",
  storageBucket: "natty-caa61.firebasestorage.app",
  messagingSenderId: "822585320498",
  appId: "1:822585320498:web:01f76915ec4735bb6d082b",
  measurementId: "G-3RVDQ36T50"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
