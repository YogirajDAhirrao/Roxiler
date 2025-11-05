import { Router } from "express";
import { authMiddleware } from "../../middlwares/auth.middleware";
import { roleMiddleware } from "../../middlwares/role.middleware";
import { create, getAll, getById, remove, update } from "./user.controllers";


const router = Router();

// Admin-only routes
router.post("/", authMiddleware, roleMiddleware(["ADMIN"]), create);
router.get("/", authMiddleware, roleMiddleware(["ADMIN"]), getAll);
router.get("/:id", authMiddleware, roleMiddleware(["ADMIN","USER"]), getById);
router.put("/:id", authMiddleware, roleMiddleware(["ADMIN"]), update);
router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), remove);

export default router;
