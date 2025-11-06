import { apiFetch } from "./client";
// get all stores
export function getAllStores() {
  return apiFetch("/stores", { method: "GET" });
}

export function getMyStores() {
  return apiFetch("/stores/get/my-stores", { method: "GET" });
}
