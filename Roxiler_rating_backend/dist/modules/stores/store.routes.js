"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlwares/auth.middleware");
const role_middleware_1 = require("../../middlwares/role.middleware");
const store_controller_js_1 = require("./store.controller.js");
const router = (0, express_1.Router)();
// Public routes
router.get("/", store_controller_js_1.getAllStores);
router.get("/:id", store_controller_js_1.getStoreById);
// Admin-only routes
router.post("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN"]), store_controller_js_1.createStore);
router.put("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN", "STORE_OWNER"]), store_controller_js_1.updateStore);
router.delete("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN"]), store_controller_js_1.deleteStore);
exports.default = router;
