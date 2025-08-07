// index.js
import { db } from './firebase.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const feed = document.getElementById('feed');
const postsQuery = query(collection(db, 'posts'), orderBy("timestamp", "desc"));

getDocs(postsQuery).then(snapshot => {
  snapshot.forEach(doc => {
    const post = doc.data();
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <h2>${post.title}</h2>
      ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image">` : ''}
      <p>${post.caption}</p>
      <small>${new Date(post.timestamp?.seconds * 1000).toLocaleString()}</small>
    `;
    feed.appendChild(div);
  });
});
