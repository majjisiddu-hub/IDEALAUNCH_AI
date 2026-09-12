const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function apiRequest(path, options = {}) {
  const token = typeof window !== "undefined" ? window.sessionStorage.getItem("idealaunchToken") : null;
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) }, cache: "no-store" });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || "Something went wrong. Please try again.");
  return payload;
}
export const api = {
  get: (path) => apiRequest(path),
  post: (path, body) => apiRequest(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => apiRequest(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path) => apiRequest(path, { method: "DELETE" })
};
export function setSession(user, token) { if (typeof window === "undefined") return; sessionStorage.setItem("idealaunchToken", token); sessionStorage.setItem("isLoggedIn", "true"); sessionStorage.setItem("loggedIn", "true"); sessionStorage.setItem("username", user.username); sessionStorage.setItem("userId", user.id); sessionStorage.setItem("fullName", user.fullName); sessionStorage.setItem("email", user.email); }
export function clearSession() { if (typeof window === "undefined") return; ["idealaunchToken", "isLoggedIn", "loggedIn", "username", "userId", "fullName", "email"].forEach((key) => sessionStorage.removeItem(key)); }
