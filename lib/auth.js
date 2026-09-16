import { STORAGE_KEYS, readJSON } from "./storage";
export function loginUser(user) { Object.entries({ isLoggedIn: "true", loggedIn: "true", username: user.username, userId: user.id, fullName: user.fullName, email: user.email }).forEach(([key, value]) => sessionStorage.setItem(key, value)); }
export function logoutUser() { ["isLoggedIn", "loggedIn", "username", "userId", "fullName", "email"].forEach((key) => sessionStorage.removeItem(key)); }
export function getUsers() { const users = readJSON(STORAGE_KEYS.users, []); return Array.isArray(users) ? users : []; }
