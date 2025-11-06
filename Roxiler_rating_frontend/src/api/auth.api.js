import { apiFetch } from "./client";
//Register a new User
export function registerUser(payload) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: payload,
  });
}

// Login user
export function loginUser(payload) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: payload,
  });
}

// Get current logged-in user (from cookie)
export function getCurrentUser() {
  return apiFetch("/auth/me");
}

// Logout user
export function logoutUser() {
  return apiFetch("/auth/logout", {
    method: "POST",
  });
}
