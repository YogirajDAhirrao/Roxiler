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
exports.deleteStore = exports.updateStore = exports.getStoreById = exports.getAllStores = exports.createStore = exports.getMyStores = void 0;
const store_service_js_1 = require("./store.service.js");
const getMyStores = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield store_service_js_1.storeService.getMyStores(req.user.id);
        res.json(stores);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.getMyStores = getMyStores;
const createStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield store_service_js_1.storeService.createStore(req.body);
        res.status(201).json({
            message: "Store created successfully",
            store,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createStore = createStore;
const getAllStores = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = req.query;
        const stores = yield store_service_js_1.storeService.getStores(filters);
        res.json(stores);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllStores = getAllStores;
const getStoreById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield store_service_js_1.storeService.getStoreById(Number(req.params.id));
        res.json(store);
    }
    catch (err) {
        next(err);
    }
});
exports.getStoreById = getStoreById;
const updateStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedStore = yield store_service_js_1.storeService.updateStore(Number(req.params.id), req.body, req.user);
        res.json({
            message: "Store updated successfully",
            store: updatedStore,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateStore = updateStore;
const deleteStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield store_service_js_1.storeService.deleteStore(Number(req.params.id));
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteStore = deleteStore;
