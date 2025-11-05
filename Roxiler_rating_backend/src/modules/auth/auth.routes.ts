import { Router } from "express";
import { register, login, changePassword, logout } from "./auth.controller.js";
import { authMiddleware } from "../../middlwares/auth.middleware.js";


const router = Router();

router.post("/register", register);


router.post("/login", login);

router.put("/change-password", authMiddleware, changePassword);


router.post("/logout", authMiddleware, logout);

export default router;
