import { STORAGE_KEYS, readJSON } from "./storage";
export function ensureDemoAccount() { if (typeof window === "undefined") return; const users = readJSON(STORAGE_KEYS.users, []); if (!users.some((user) => user.username?.toLowerCase() === "admin")) { window.localStorage.setItem(STORAGE_KEYS.users, JSON.stringify([...users, { id: "demo-admin", fullName: "IDEALAUNCH Admin", username: "admin", email: "admin@idealaunch.demo", password: "123456", createdAt: "2026-09-10" }])); } }
export function loginUser(user) { Object.entries({ isLoggedIn: "true", loggedIn: "true", username: user.username, userId: user.id, fullName: user.fullName, email: user.email }).forEach(([key, value]) => sessionStorage.setItem(key, value)); }
export function logoutUser() { ["isLoggedIn", "loggedIn", "username", "userId", "fullName", "email"].forEach((key) => sessionStorage.removeItem(key)); }
export function getUsers() { const users = readJSON(STORAGE_KEYS.users, []); return Array.isArray(users) ? users : []; }
