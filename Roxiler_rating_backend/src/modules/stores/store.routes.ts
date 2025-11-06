import { Router } from "express";
import { authMiddleware } from "../../middlwares/auth.middleware";
import { roleMiddleware } from "../../middlwares/role.middleware";
import {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
  getMyStores,
} from "./store.controller.js";

const router = Router();

// Public routes
router.get("/", authMiddleware, getAllStores);

router.get("/:id", authMiddleware, getStoreById);

//store-owner only
router.get(
  "/get/my-stores",
  authMiddleware,
  roleMiddleware(["STORE_OWNER"]),
  getMyStores
);

// Admin-only routes
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN", "STORE_OWNER"]),
  createStore
);
console.log("hey 4");
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN", "STORE_OWNER"]),
  updateStore
);
console.log("hey 5");
router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), deleteStore);

export default router;
