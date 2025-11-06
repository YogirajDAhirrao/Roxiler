"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlwares/auth.middleware");
const role_middleware_1 = require("../../middlwares/role.middleware");
const store_controller_js_1 = require("./store.controller.js");
const router = (0, express_1.Router)();
// Public routes
router.get("/", auth_middleware_1.authMiddleware, store_controller_js_1.getAllStores);
router.get("/:id", auth_middleware_1.authMiddleware, store_controller_js_1.getStoreById);
//store-owner only
router.get("/get/my-stores", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["STORE_OWNER"]), store_controller_js_1.getMyStores);
// Admin-only routes
router.post("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN", "STORE_OWNER"]), store_controller_js_1.createStore);
console.log("hey 4");
router.put("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN", "STORE_OWNER"]), store_controller_js_1.updateStore);
console.log("hey 5");
router.delete("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN"]), store_controller_js_1.deleteStore);
exports.default = router;
