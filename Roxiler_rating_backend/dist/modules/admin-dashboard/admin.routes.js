"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_js_1 = require("../../middlwares/auth.middleware.js");
const role_middleware_js_1 = require("../../middlwares/role.middleware.js");
const admin_controller_js_1 = require("./admin.controller.js");
const router = (0, express_1.Router)();
// Admin-only Routes
//Base path → /api/admin
// ✅ Dashboard stats
router.get("/stats", auth_middleware_js_1.authMiddleware, (0, role_middleware_js_1.roleMiddleware)(["ADMIN"]), admin_controller_js_1.getDashboardStats);
exports.default = router;
