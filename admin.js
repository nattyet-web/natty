import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

document.getElementById("postBtn").addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const caption = document.getElementById("caption").value.trim();
  const imageUrl = document.getElementById("imageUrl").value.trim();

  if (!title || !imageUrl) {
    alert("Title and Image URL are required.");
    return;
  }

  try {
    await addDoc(collection(db, "posts"), {
      title,
      caption,
      imageUrl,
      createdAt: serverTimestamp()
    });

    alert("Post uploaded!");
    document.getElementById("title").value = "";
    document.getElementById("caption").value = "";
    document.getElementById("imageUrl").value = "";
  } catch (err) {
    console.error("Error adding post: ", err);
    alert("Failed to post.");
  }
});
