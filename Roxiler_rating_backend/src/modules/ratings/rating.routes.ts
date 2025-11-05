import { Router } from "express";
import { authMiddleware } from "../../middlwares/auth.middleware.js";
import { roleMiddleware } from "../../middlwares/role.middleware.js";
import {
  rateStore,
  getAllRatings,
  getRatingsByStore,
  getMyRatings,
  deleteRating,
} from "./rating.controller.js";

const router = Router();

// Rating Routes
//Base path → /api/ratings

//  Public route — Get all ratings for a store
router.get("/store/:storeId", getRatingsByStore);

// User route — Create or update a rating for a store
router.post("/", authMiddleware, roleMiddleware(["USER"]), rateStore);

// User route — Get own ratings
router.get("/me", authMiddleware, roleMiddleware(["USER"]), getMyRatings);

// Admin route — View all ratings in the system
router.get("/", authMiddleware, roleMiddleware(["ADMIN"]), getAllRatings);

//  Admin/User — Delete a rating (authorization checked inside service)
router.delete("/:id", authMiddleware, deleteRating);

export default router;
