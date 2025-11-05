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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const client_js_1 = __importDefault(require("../../prisma/client.js"));
const config_1 = require("../../config");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET)
    throw new Error("JWT_SECRET is not defined in .env");
exports.authService = {
    registerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, address, role = client_1.Role.USER } = data;
            const existingUser = yield client_js_1.default.user.findUnique({ where: { email } });
            if (existingUser)
                throw new Error("User with this email already exists");
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const user = yield client_js_1.default.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    address,
                    role,
                },
            });
            const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, config_1.config.jwtSecret, {
                expiresIn: "1d",
            });
            return {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            };
        });
    },
    loginUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const user = yield client_js_1.default.user.findUnique({ where: { email } });
            if (!user)
                throw new Error("Invalid email or password");
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                throw new Error("Invalid email or password");
            const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, {
                expiresIn: "1d",
            });
            return {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            };
        });
    },
    updatePassword(userId, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield client_js_1.default.user.findUnique({ where: { id: userId } });
            if (!user)
                throw new Error("User not found");
            const valid = yield bcryptjs_1.default.compare(oldPassword, user.password);
            if (!valid)
                throw new Error("Old password is incorrect");
            const hashed = yield bcryptjs_1.default.hash(newPassword, 10);
            yield client_js_1.default.user.update({
                where: { id: userId },
                data: { password: hashed },
            });
            return "Password updated successfully";
        });
    },
};
