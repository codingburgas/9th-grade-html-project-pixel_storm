
let isLogin = true;

function toggleForms() {
  isLogin = !isLogin;
  document.getElementById("loginForm").style.display = isLogin ? "block" : "none";
  document.getElementById("signupForm").style.display = isLogin ? "none" : "block";
  document.getElementById("formTitle").innerText = isLogin ? "Login" : "Sign Up";
  document.querySelector(".toggle-button").innerText = isLogin ? "Switch to Sign Up" : "Switch to Login";
  document.getElementById("message").innerText = "";
}

function signup() {
  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const message = document.getElementById("message");

  if (!username || !email || !password) {
    message.innerText = "Please fill in all fields.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[username]) {
    message.innerText = "This user already exists.";
  } else {
    users[username] = { email, password };
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "index.html";
  }
}

function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const message = document.getElementById("message");

  if (!username || !password) {
    message.innerText = "Please fill in all fields.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users[username]) {
    message.innerText = "This account does not exist.";
} else if (users[username].password !== password) {
  message.innerText = "Incorrect password.";
} else {
  localStorage.setItem('currentUser', username); 
  window.location.href = "index.html";
}




}
