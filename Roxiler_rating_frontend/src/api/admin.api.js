import { apiFetch } from "./client";

// admin specific requests

export function getAdminStats() {
  return apiFetch("/admin/stats", { method: "GET" });
}

export function createUser(payload) {
  return apiFetch("/users", { method: "POST", body: payload });
}

// payload type = {
//   name: string;
//   email: string;
//   password: string;
//   address: string;
//   role?: Role;
// }

export function getAllUsers() {
  return apiFetch("/users", { method: "GET" });
}
