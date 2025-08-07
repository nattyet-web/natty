import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");
const uploadBtn = document.getElementById("uploadBtn");

let isAuthenticated = false;

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful");
    isAuthenticated = true;
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

uploadBtn.addEventListener("click", async () => {
  if (!isAuthenticated) {
    alert("Please login first.");
    return;
  }

  const imageUrl = document.getElementById("imageUrl").value;
  const caption = document.getElementById("caption").value;
  const description = document.getElementById("description").value;

  if (!imageUrl || !caption) {
    alert("Please provide image URL and caption.");
    return;
  }

  try {
    await addDoc(collection(db, "posts"), {
      imageUrl,
      caption,
      description,
      createdAt: serverTimestamp()
    });

    alert("Post uploaded!");
    document.getElementById("imageUrl").value = '';
    document.getElementById("caption").value = '';
    document.getElementById("description").value = '';
  } catch (err) {
    alert("Upload failed: " + err.message);
  }
});
