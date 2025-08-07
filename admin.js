import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const postsEl = document.getElementById("posts");
const searchBar = document.getElementById("searchBar");
const paginationEl = document.getElementById("pagination");

let allPosts = [];
let currentPage = 1;
const postsPerPage = 6;

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hide-preloader");
});

async function fetchPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  allPosts = querySnapshot.docs.map(doc => doc.data());
  renderPosts();
}

function renderPosts() {
  const search = searchBar.value.toLowerCase();
  const filteredPosts = allPosts.filter(post =>
    post.title.toLowerCase().includes(search) ||
    post.caption.toLowerCase().includes(search)
  );

  const start = (currentPage - 1) * postsPerPage;
  const paginated = filteredPosts.slice(start, start + postsPerPage);

  postsEl.innerHTML = "";
  paginated.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <img src="${post.imageUrl}" alt="Post image">
      <h3>${post.title}</h3>
      <p>${post.caption}</p>
    `;
    postsEl.appendChild(div);
  });

  renderPagination(filteredPosts.length);
}

function renderPagination(totalPosts) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  paginationEl.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderPosts();
    });
    paginationEl.appendChild(btn);
  }
}

searchBar.addEventListener("input", () => {
  currentPage = 1;
  renderPosts();
});

fetchPosts();
