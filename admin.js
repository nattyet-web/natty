// admin.js
import { db, auth } from './firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const loginForm = document.getElementById('login-form');
const postFormContainer = document.getElementById('post-form-container');
const postForm = document.getElementById('post-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      loginForm.style.display = 'none';
      postFormContainer.style.display = 'block';
    })
    .catch(err => alert("Login failed"));
});

onAuthStateChanged(auth, user => {
  if (user) {
    loginForm.style.display = 'none';
    postFormContainer.style.display = 'block';
  }
});

postForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const imageUrl = document.getElementById('imageUrl').value;
  const caption = document.getElementById('caption').value;

  await addDoc(collection(db, 'posts'), {
    title,
    imageUrl,
    caption,
    timestamp: serverTimestamp(),
  });

  postForm.reset();
  alert("Posted!");
});
