"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_js_1 = require("../../middlwares/auth.middleware.js");
const role_middleware_js_1 = require("../../middlwares/role.middleware.js");
const rating_controller_js_1 = require("./rating.controller.js");
const router = (0, express_1.Router)();
// Rating Routes
//Base path → /api/ratings
//  Public route — Get all ratings for a store
router.get("/store/:storeId", rating_controller_js_1.getRatingsByStore);
// User route — Create or update a rating for a store
router.post("/", auth_middleware_js_1.authMiddleware, (0, role_middleware_js_1.roleMiddleware)(["USER"]), rating_controller_js_1.rateStore);
// User route — Get own ratings
router.get("/me", auth_middleware_js_1.authMiddleware, (0, role_middleware_js_1.roleMiddleware)(["USER"]), rating_controller_js_1.getMyRatings);
// Admin route — View all ratings in the system
router.get("/", auth_middleware_js_1.authMiddleware, (0, role_middleware_js_1.roleMiddleware)(["ADMIN"]), rating_controller_js_1.getAllRatings);
//  Admin/User — Delete a rating (authorization checked inside service)
router.delete("/:id", auth_middleware_js_1.authMiddleware, rating_controller_js_1.deleteRating);
exports.default = router;
