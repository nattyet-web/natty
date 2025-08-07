import { db } from './firebase.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const feed = document.getElementById('feed');

async function loadPosts() {
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <img src="${data.imageUrl}" alt="${data.title}" />
      <div class="post-content">
        <h2>${data.title}</h2>
        <p>${data.caption}</p>
        <small>${new Date(data.timestamp.toDate()).toLocaleString()}</small>
      </div>
    `;
    feed.appendChild(postEl);
  });
}

loadPosts();
