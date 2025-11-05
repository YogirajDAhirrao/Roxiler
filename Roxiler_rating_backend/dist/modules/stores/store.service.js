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
exports.storeService = void 0;
const client_js_1 = __importDefault(require("../../prisma/client.js"));
exports.storeService = {
    //Create store (Admin only)
    createStore(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.ownerId) {
                const owner = yield client_js_1.default.user.findUnique({
                    where: { id: data.ownerId },
                });
                if (!owner)
                    throw new Error("Owner not found");
                if (owner.role !== "STORE_OWNER")
                    throw new Error("Owner must have STORE_OWNER role");
            }
            const store = yield client_js_1.default.store.create({
                data,
                include: {
                    owner: { select: { id: true, name: true, email: true, role: true } },
                },
            });
            return store;
        });
    },
    //Get all stores (Public: searchable)
    // Includes Avg Rating
    getStores(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const stores = yield client_js_1.default.store.findMany({
                where: {
                    name: (filters === null || filters === void 0 ? void 0 : filters.name)
                        ? { contains: filters.name, mode: "insensitive" }
                        : undefined,
                    address: (filters === null || filters === void 0 ? void 0 : filters.address)
                        ? { contains: filters.address, mode: "insensitive" }
                        : undefined,
                    ownerId: filters === null || filters === void 0 ? void 0 : filters.ownerId,
                },
                include: {
                    ratings: { select: { value: true } },
                    owner: { select: { id: true, name: true } },
                },
                orderBy: { id: "asc" },
            });
            return stores.map((store) => (Object.assign(Object.assign({}, store), { avgRating: store.ratings.length > 0
                    ? store.ratings.reduce((acc, r) => acc + r.value, 0) /
                        store.ratings.length
                    : 0 })));
        });
    },
    // Get single store with all ratings
    getStoreById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield client_js_1.default.store.findUnique({
                where: { id },
                include: {
                    owner: { select: { id: true, name: true, email: true } },
                    ratings: {
                        select: {
                            id: true,
                            value: true,
                            user: { select: { id: true, name: true } },
                        },
                    },
                },
            });
            if (!store)
                throw new Error("Store not found");
            const avgRating = store.ratings.length > 0
                ? store.ratings.reduce((acc, r) => acc + r.value, 0) /
                    store.ratings.length
                : 0;
            return Object.assign(Object.assign({}, store), { avgRating });
        });
    },
    // Update store (Admin or Store Owner)
    updateStore(id, data, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield client_js_1.default.store.findUnique({ where: { id } });
            if (!store)
                throw new Error("Store not found");
            // Restrict access if user is STORE_OWNER
            if (currentUser.role === "STORE_OWNER" &&
                store.ownerId !== currentUser.id) {
                throw new Error("You can only update your own store");
            }
            //  Allow admin or owner
            const updatedStore = yield client_js_1.default.store.update({
                where: { id },
                data,
                include: { owner: { select: { id: true, name: true } } },
            });
            return updatedStore;
        });
    },
    //  Delete store (Admin only)
    deleteStore(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_js_1.default.store.delete({ where: { id } });
            return { message: "Store deleted successfully" };
        });
    },
};
