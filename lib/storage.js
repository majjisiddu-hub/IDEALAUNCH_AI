export const STORAGE_KEYS = { users: "startupHubUsers", userIdeas: "startupHubUserIdeas", favourites: "startupHubFavourites", viewed: "startupHubViewed", aiChat: "startupHubAIChat" };

export function readJSON(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try { const value = JSON.parse(window.localStorage.getItem(key) || ""); return value ?? fallback; } catch { return fallback; }
}

export function writeJSON(key, value) { if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(value)); }
export function getUsername() { return typeof window === "undefined" ? "Explorer" : window.sessionStorage.getItem("username") || "Explorer"; }
export function getCurrentUser() { if (typeof window === "undefined") return { id: "", username: "Explorer", fullName: "Explorer", email: "" }; return { id: sessionStorage.getItem("userId") || "", username: getUsername(), fullName: sessionStorage.getItem("fullName") || getUsername(), email: sessionStorage.getItem("email") || "" }; }
function accountStorage(key) { const username = getUsername(); const stored = readJSON(key, {}); if (Array.isArray(stored)) { writeJSON(key, { [username]: stored }); return stored; } return Array.isArray(stored?.[username]) ? stored[username] : []; }
function saveAccountStorage(key, value) { const stored = readJSON(key, {}); const accounts = stored && !Array.isArray(stored) ? stored : {}; accounts[getUsername()] = value; writeJSON(key, accounts); }
export function getFavouriteIds() { return accountStorage(STORAGE_KEYS.favourites); }
export function getViewedIds() { return accountStorage(STORAGE_KEYS.viewed); }
export function toggleFavourite(id) { const current = getFavouriteIds(); const next = current.includes(id) ? current.filter((value) => value !== id) : [id, ...current]; saveAccountStorage(STORAGE_KEYS.favourites, next); return next; }
export function markAsViewed(id) { saveAccountStorage(STORAGE_KEYS.viewed, [id, ...getViewedIds().filter((value) => value !== id)].slice(0, 6)); }
export function getUserIdeas() { const value = readJSON(STORAGE_KEYS.userIdeas, []); return Array.isArray(value) ? value.filter((idea) => idea?.id) : []; }
export function saveUserIdeas(value) { writeJSON(STORAGE_KEYS.userIdeas, value); }
export function isLoggedIn() { return typeof window !== "undefined" && (sessionStorage.getItem("isLoggedIn") === "true" || sessionStorage.getItem("loggedIn") === "true"); }
