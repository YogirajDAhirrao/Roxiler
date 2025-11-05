"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlwares/auth.middleware");
const role_middleware_1 = require("../../middlwares/role.middleware");
const user_controllers_1 = require("./user.controllers");
const router = (0, express_1.Router)();
// Admin-only routes
router.post("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN"]), user_controllers_1.create);
router.get("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN"]), user_controllers_1.getAll);
router.get("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN", "USER"]), user_controllers_1.getById);
router.put("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN"]), user_controllers_1.update);
router.delete("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["ADMIN"]), user_controllers_1.remove);
exports.default = router;
