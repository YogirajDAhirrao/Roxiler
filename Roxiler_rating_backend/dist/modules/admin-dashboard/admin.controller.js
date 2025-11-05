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
exports.getDashboardStats = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
//Admin Dashboard Controller
//Returns total number of users, stores, and ratings
const getDashboardStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [userCount, storeCount, ratingCount] = yield Promise.all([
            client_1.default.user.count(),
            client_1.default.store.count(),
            client_1.default.rating.count(),
        ]);
        res.json({
            totalUsers: userCount,
            totalStores: storeCount,
            totalRatings: ratingCount,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getDashboardStats = getDashboardStats;
