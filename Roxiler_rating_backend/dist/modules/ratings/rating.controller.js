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
exports.deleteRating = exports.getMyRatings = exports.getRatingsByStore = exports.getAllRatings = exports.rateStore = void 0;
const rating_service_js_1 = require("./rating.service.js");
// Controller for rating operations
// Handles: create/update, fetch (store/user/all), delete
//  Create or update a rating
const rateStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user)
            throw new Error("Unauthorized");
        const rating = yield rating_service_js_1.ratingService.rateStore(user.id, req.body);
        res.status(201).json({
            message: "Rating submitted successfully",
            rating,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.rateStore = rateStore;
//  Get all ratings(admin only)
const getAllRatings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ratings = yield rating_service_js_1.ratingService.getAllRatings();
        res.json(ratings);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllRatings = getAllRatings;
//  Get ratings for a specific store
const getRatingsByStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storeId = Number(req.params.storeId);
        const ratings = yield rating_service_js_1.ratingService.getRatingsByStore(storeId);
        res.json(ratings);
    }
    catch (err) {
        next(err);
    }
});
exports.getRatingsByStore = getRatingsByStore;
//  Get ratings of the logged-in user
const getMyRatings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user)
            throw new Error("Unauthorized");
        const ratings = yield rating_service_js_1.ratingService.getRatingsByUser(user.id);
        res.json(ratings);
    }
    catch (err) {
        next(err);
    }
});
exports.getMyRatings = getMyRatings;
// Delete a rating (admin or owner)
const deleteRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user)
            throw new Error("Unauthorized");
        const id = Number(req.params.id);
        const result = yield rating_service_js_1.ratingService.deleteRating(id, user);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteRating = deleteRating;
