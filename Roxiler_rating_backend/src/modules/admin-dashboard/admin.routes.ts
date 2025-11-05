import { Router } from "express";
import { authMiddleware } from "../../middlwares/auth.middleware.js";
import { roleMiddleware } from "../../middlwares/role.middleware.js";
import { getDashboardStats } from "./admin.controller.js";

const router = Router();

// Admin-only Routes
//Base path → /api/admin

// ✅ Dashboard stats
router.get(
  "/stats",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  getDashboardStats
);

export default router;
