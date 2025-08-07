import { db } from './firebase.js';
import { collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const feedContainer = document.getElementById("feed");

async function loadPosts() {
  if (!feedContainer) {
    console.error("❌ No #feed element found.");
    return;
  }

  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const post = doc.data();
    const postElement = createPostElement(post);
    feedContainer.appendChild(postElement);
  });

  // Hide preloader after loading
  document.getElementById("preloader")?.classList.add("hide-preloader");
}

function createPostElement(post) {
  const container = document.createElement("div");
  container.classList.add("post");

  const img = document.createElement("img");
  img.src = post.imageUrl;
  img.alt = post.caption;

  const caption = document.createElement("h3");
  caption.textContent = post.caption;

  const desc = document.createElement("p");
  desc.textContent = post.description;

  container.appendChild(img);
  container.appendChild(caption);
  container.appendChild(desc);

  return container;
}

loadPosts();

// Mobile menu toggle
function toggleNav() {
  const links = document.getElementById("myLinks");
  links.style.display = links.style.display === "block" ? "none" : "block";
}
