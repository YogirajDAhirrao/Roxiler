import { apiFetch } from "./client";
// get all stores
export function getAllStores() {
  return apiFetch("/stores", { method: "GET" });
}
