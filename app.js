// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjizs0KiGZP43hUFT7xW5jXYJgCWfzyrk",
  authDomain: "web-app-6e349.firebaseapp.com",
  databaseURL: "https://web-app-6e349-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-app-6e349",
  storageBucket: "web-app-6e349.firebasestorage.app",
  messagingSenderId: "727450871818",
  appId: "1:727450871818:web:3c5cd598850282c745d7f3",
  measurementId: "G-ZJT339TSLN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// === DOM Elements ===
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send");
const messageInput = document.getElementById("message");
const usernameInput = document.getElementById("username");

// === Send Message ===
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const username = usernameInput.value.trim() || "Anonymous";
  const message = messageInput.value.trim();

  if (message !== "") {
    const msgRef = db.ref("messages").push();
    msgRef.set({
      username,
      message,
      timestamp: Date.now()
    });
    messageInput.value = "";
  }
}

// === Display Messages in Realtime ===
db.ref("messages").on("child_added", (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");

  // Check if this message was sent by current user
  const currentUser = usernameInput.value.trim();
  if (data.username === currentUser) {
    msgDiv.classList.add("sent");
  } else {
    msgDiv.classList.add("received");
  }

  msgDiv.innerHTML = `<strong>${data.username}</strong> ${data.message}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});
