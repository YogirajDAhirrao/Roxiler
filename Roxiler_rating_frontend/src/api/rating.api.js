import { apiFetch } from "./client";

// Create or update a rating
export function rateStore(payload) {
  return apiFetch("/ratings", {
    method: "POST",
    body: payload, // { storeId, value }
  });
}
export function getRatingForStoreByMe() {
  return apiFetch("/ratings/me", {
    method: "GET",
  });
}
