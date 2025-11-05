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
exports.userService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const client_js_1 = __importDefault(require("../../prisma/client.js"));
exports.userService = {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, address, role = client_1.Role.USER } = data;
            const existing = yield client_js_1.default.user.findUnique({ where: { email } });
            if (existing)
                throw new Error("User with this email already exists");
            const hashed = yield bcryptjs_1.default.hash(password, 10);
            const user = yield client_js_1.default.user.create({
                data: { name, email, password: hashed, address, role },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    address: true,
                    role: true,
                    createdAt: true,
                },
            });
            return user;
        });
    },
    getAllUsers(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield client_js_1.default.user.findMany({
                where: {
                    name: (filters === null || filters === void 0 ? void 0 : filters.name) ? { contains: filters.name, mode: "insensitive" } : undefined,
                    email: (filters === null || filters === void 0 ? void 0 : filters.email) ? { contains: filters.email, mode: "insensitive" } : undefined,
                    address: (filters === null || filters === void 0 ? void 0 : filters.address) ? { contains: filters.address, mode: "insensitive" } : undefined,
                    role: filters === null || filters === void 0 ? void 0 : filters.role,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    address: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: { id: "asc" },
            });
            return users;
        });
    },
    // Get a single user (Admin or self)
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield client_js_1.default.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    address: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                    stores: {
                        select: {
                            id: true,
                            name: true,
                            address: true,
                            ratings: {
                                select: { value: true },
                            },
                        },
                    },
                    ratings: {
                        select: {
                            id: true,
                            value: true,
                            store: { select: { id: true, name: true } },
                        },
                    },
                },
            });
            if (!user)
                throw new Error("User not found");
            return user;
        });
    },
    //Update user (Admin or self)
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield client_js_1.default.user.findUnique({ where: { id } });
            if (!user)
                throw new Error("User not found");
            const updated = yield client_js_1.default.user.update({
                where: { id },
                data,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    address: true,
                    role: true,
                    updatedAt: true,
                },
            });
            return updated;
        });
    },
    // Delete user (Admin only)
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield client_js_1.default.user.findUnique({ where: { id } });
            if (!user)
                throw new Error("User not found");
            yield client_js_1.default.user.delete({ where: { id } });
            return { message: "User deleted successfully" };
        });
    },
};
