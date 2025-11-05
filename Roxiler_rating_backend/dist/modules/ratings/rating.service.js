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
exports.ratingService = void 0;
const client_js_1 = __importDefault(require("../../prisma/client.js"));
exports.ratingService = {
    // Create or Update rating
    // Enforces unique (userId, storeId)
    rateStore(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { storeId, value } = data;
            if (value < 1 || value > 5)
                throw new Error("Rating must be between 1 and 5");
            // Check if store exists
            const store = yield client_js_1.default.store.findUnique({ where: { id: storeId } });
            if (!store)
                throw new Error("Store not found");
            // Upsert rating (create or update)
            const rating = yield client_js_1.default.rating.upsert({
                where: { userId_storeId: { userId, storeId } },
                update: { value },
                create: { userId, storeId, value },
                include: {
                    store: { select: { id: true, name: true } },
                    user: { select: { id: true, name: true } },
                },
            });
            return rating;
        });
    },
    // Get all ratings (Admin only)
    getAllRatings() {
        return __awaiter(this, void 0, void 0, function* () {
            return client_js_1.default.rating.findMany({
                include: {
                    user: { select: { id: true, name: true, email: true } },
                    store: { select: { id: true, name: true } },
                },
                orderBy: { createdAt: "desc" },
            });
        });
    },
    //Get all ratings for a specific store (public)
    getRatingsByStore(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ratings = yield client_js_1.default.rating.findMany({
                where: { storeId },
                include: {
                    user: { select: { id: true, name: true } },
                },
                orderBy: { createdAt: "desc" },
            });
            return ratings;
        });
    },
    // Get user’s own ratings
    getRatingsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return client_js_1.default.rating.findMany({
                where: { userId },
                include: {
                    store: { select: { id: true, name: true } },
                },
                orderBy: { updatedAt: "desc" },
            });
        });
    },
    // Delete a rating (Admin or owner)
    deleteRating(id, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const rating = yield client_js_1.default.rating.findUnique({ where: { id } });
            if (!rating)
                throw new Error("Rating not found");
            // Only Admin or rating owner can delete
            if (currentUser.role !== "ADMIN" && currentUser.id !== rating.userId) {
                throw new Error("Not authorized to delete this rating");
            }
            yield client_js_1.default.rating.delete({ where: { id } });
            return { message: "Rating deleted successfully" };
        });
    },
};
