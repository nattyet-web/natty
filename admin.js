// admin.js
import { auth, db, storage } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  collection, addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

// Login
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in!");
  } catch (err) {
    alert("Login error: " + err.message);
  }
});

// Upload Post
document.getElementById("uploadBtn").addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) {
    alert("You must log in first");
    return;
  }

  const file = document.getElementById("imageFile").files[0];
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  if (!file || !title || !description) {
    alert("Please fill all fields");
    return;
  }

  try {
    const fileRef = ref(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const imageUrl = await getDownloadURL(fileRef);

    await addDoc(collection(db, "posts"), {
      title,
      description,
      imageUrl,
      createdAt: serverTimestamp()
    });

    alert("Post uploaded successfully!");
    // Clear form
    document.getElementById("imageFile").value = "";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  } catch (err) {
    alert("Upload error: " + err.message);
  }
});
