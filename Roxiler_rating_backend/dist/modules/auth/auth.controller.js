"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.logout = exports.changePassword = exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const config_1 = require("../../config");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.authService.registerUser(req.body);
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: config_1.config.env === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res
            .status(201)
            .json({ message: "User registered successfully", user: result.user });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.authService.loginUser(req.body);
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: config_1.config.env === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ message: "Login successful", user: result.user });
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { oldPassword, newPassword } = req.body;
        const message = yield auth_service_1.authService.updatePassword(req.user.id, oldPassword, newPassword);
        res.json({ message });
    }
    catch (err) {
        next(err);
    }
});
exports.changePassword = changePassword;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token", {
        httpOnly: true,
        secure: config_1.config.env === "production",
        sameSite: "strict",
    });
    res.json({ message: "Logged out successfully" });
});
exports.logout = logout;
//to get the logged in user on page refresh
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_service_1.authService.getCurrentUser(req.user.id);
        res.json(user);
    }
    catch (err) {
        next(err);
    }
});
exports.getMe = getMe;
