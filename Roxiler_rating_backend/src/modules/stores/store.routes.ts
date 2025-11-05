import { Router } from "express";
import { authMiddleware } from "../../middlwares/auth.middleware";
import { roleMiddleware } from "../../middlwares/role.middleware";
import {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
} from "./store.controller.js";

const router = Router();

// Public routes
router.get("/", getAllStores);
router.get("/:id", getStoreById);

// Admin-only routes
router.post("/", authMiddleware, roleMiddleware(["ADMIN"]), createStore);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN", "STORE_OWNER"]),
  updateStore
);
router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), deleteStore);

export default router;
