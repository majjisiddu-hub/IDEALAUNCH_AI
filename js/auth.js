const USERS_KEY = "startupHubUsers";

function getUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(users) ? users : [];
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function ensureDemoAccount() {
  const users = getUsers();
  if (!users.some((user) => user.username.toLowerCase() === "admin")) {
    users.push({ id: "demo-admin", fullName: "IDEALAUNCH Admin", username: "admin", email: "admin@idealaunch.demo", password: "123456", createdAt: "2026-09-10" });
    saveUsers(users);
  }
}

function isLoggedIn() {
  return sessionStorage.getItem("isLoggedIn") === "true" || sessionStorage.getItem("loggedIn") === "true";
}

function loginUser(user) {
  sessionStorage.setItem("isLoggedIn", "true");
  sessionStorage.setItem("loggedIn", "true");
  sessionStorage.setItem("username", user.username);
  sessionStorage.setItem("userId", user.id);
  sessionStorage.setItem("fullName", user.fullName);
  sessionStorage.setItem("email", user.email);
}

function logoutUser() {
  ["isLoggedIn", "loggedIn", "username", "userId", "fullName", "email"].forEach((key) => sessionStorage.removeItem(key));
  window.location.href = "index.html";
}

ensureDemoAccount();

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("#signup-form");
  if (signupForm) {
    if (isLoggedIn()) {
      window.location.href = "dashboard.html";
      return;
    }
    const message = document.querySelector("#signup-message");
    const password = document.querySelector("#signup-password");
    const confirmPassword = document.querySelector("#confirm-password");
    const strength = document.querySelector("#password-strength");
    document.querySelectorAll("[data-password-toggle]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const input = document.querySelector(`#${toggle.dataset.passwordToggle}`);
        const visible = input.type === "password";
        input.type = visible ? "text" : "password";
        toggle.textContent = visible ? "Hide" : "Show";
      });
    });
    password.addEventListener("input", () => {
      const score = [password.value.length >= 6, /[A-Z]/.test(password.value) || /\d/.test(password.value), /[^A-Za-z0-9]/.test(password.value)].filter(Boolean).length;
      strength.className = `password-strength strength-${score}`;
    });
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const fullName = document.querySelector("#full-name").value.trim();
      const username = document.querySelector("#signup-username").value.trim();
      const email = document.querySelector("#signup-email").value.trim().toLowerCase();
      message.className = "form-message";
      if (!fullName || !username || !email || !password.value || !confirmPassword.value || !document.querySelector("#terms").checked) {
        message.classList.add("error"); message.textContent = "Complete all fields and accept the demo terms to continue."; return;
      }
      if (username.length < 3) { message.classList.add("error"); message.textContent = "Username must be at least 3 characters."; return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { message.classList.add("error"); message.textContent = "Enter a valid email address."; return; }
      if (password.value.length < 6) { message.classList.add("error"); message.textContent = "Password must be at least 6 characters."; return; }
      if (password.value !== confirmPassword.value) { message.classList.add("error"); message.textContent = "Passwords do not match."; return; }
      const users = getUsers();
      if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) { message.classList.add("error"); message.textContent = "Username already exists. Please choose another username."; return; }
      if (users.some((user) => user.email.toLowerCase() === email)) { message.classList.add("error"); message.textContent = "An account with this email already exists."; return; }
      users.push({ id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, fullName, username, email, password: password.value, createdAt: new Date().toISOString().slice(0, 10) });
      saveUsers(users);
      message.classList.add("success"); message.textContent = "Account created successfully! Redirecting to login...";
      document.querySelector("#signup-submit").disabled = true;
      window.setTimeout(() => { window.location.href = "index.html"; }, 800);
    });
    return;
  }

  if (isLoggedIn()) {
    window.location.href = "dashboard.html";
    return;
  }

  const form = document.querySelector("#login-form");
  const usernameInput = document.querySelector("#username");
  const passwordInput = document.querySelector("#password");
  const passwordToggle = document.querySelector("#password-toggle");
  const message = document.querySelector("#login-message");

  passwordToggle.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    passwordToggle.textContent = isPassword ? "Hide" : "Show";
    passwordToggle.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    message.className = "form-message";
    message.textContent = "";

    if (!username || !password) {
      message.classList.add("error");
      message.textContent = "Enter both your username and password to continue.";
      return;
    }

    const user = getUsers().find((account) => (account.username.toLowerCase() === username.toLowerCase() || account.email.toLowerCase() === username.toLowerCase()) && account.password === password);
    if (user) {
      loginUser(user);
      message.classList.add("success");
      message.textContent = "Access confirmed. Opening your workspace...";
      window.setTimeout(() => { window.location.href = "dashboard.html"; }, 350);
      return;
    }

    message.classList.add("error");
    message.textContent = "Those credentials do not match an IDEALAUNCH account.";
  });
});
