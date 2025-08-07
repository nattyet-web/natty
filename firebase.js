import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5ZatulVEicBeWqNciKtjd4fcQeAvohmY",
  authDomain: "natty-caa61.firebaseapp.com",
  projectId: "natty-caa61",
  storageBucket: "natty-caa61.appspot.com",
  messagingSenderId: "822585320498",
  appId: "1:822585320498:web:01f76915ec4735bb6d082b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
