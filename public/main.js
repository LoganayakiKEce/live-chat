let socket;
let token;

function showRegister() {
  document.getElementById("login").style.display = "none";
  document.getElementById("register").style.display = "block";
}

function showLogin() {
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "block";
}

function showChat() {
  document.getElementById("login").style.display = "none";
  document.getElementById("register").style.display = "none";
  document.getElementById("chat").style.display = "block";
}

async function register() {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    token = data.token;
    connectSocket();
    showChat();
  } else {
    alert("Registration failed");
  }
}

async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    token = data.token;
    connectSocket();
    showChat();
  } else {
    alert("Login failed");
  }
}

function connectSocket() {
  socket = io({
    query: { token },
  });

  socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit("joinRoom", { room: "gen" });
  });

  socket.on("message", (data) => {
    const messages = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.textContent = `${data.user}: ${data.message}`;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
}

function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;
  socket.emit("sendMessage", { room: "gen", message });
  messageInput.value = "";
}

function logout() {
  token = null;
  socket.disconnect();
  document.getElementById("chat").style.display = "none";
  showLogin();
}
