import { auth, db, storage } from './firebase.js';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const loginBtn = document.getElementById("loginBtn");
const uploadForm = document.getElementById("uploadForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

loginBtn.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      uploadForm.style.display = "block";
    })
    .catch(err => alert("Login failed: " + err.message));
});

document.getElementById("uploadBtn").addEventListener("click", async () => {
  const file = document.getElementById("imageFile").files[0];
  const title = document.getElementById("title").value;
  const caption = document.getElementById("caption").value;

  if (!file || !title || !caption) {
    alert("Please fill in all fields.");
    return;
  }

  const fileRef = ref(storage, 'images/' + file.name);
  await uploadBytes(fileRef, file);
  const imageUrl = await getDownloadURL(fileRef);

  await addDoc(collection(db, "posts"), {
    title,
    caption,
    imageUrl,
    timestamp: serverTimestamp()
  });

  alert("Post uploaded!");
  location.reload();
});
