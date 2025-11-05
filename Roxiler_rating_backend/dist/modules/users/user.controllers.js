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
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const user_service_js_1 = require("./user.service.js");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_js_1.userService.createUser(req.body);
        res.status(201).json({ message: "User created successfully", user });
    }
    catch (err) {
        next(err);
    }
});
exports.create = create;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_js_1.userService.getAllUsers(req.query);
        res.json(users);
    }
    catch (err) {
        next(err);
    }
});
exports.getAll = getAll;
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_js_1.userService.getUserById(Number(req.params.id));
        res.json(user);
    }
    catch (err) {
        next(err);
    }
});
exports.getById = getById;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield user_service_js_1.userService.updateUser(Number(req.params.id), req.body);
        res.json({ message: "User updated successfully", updated });
    }
    catch (err) {
        next(err);
    }
});
exports.update = update;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_js_1.userService.deleteUser(Number(req.params.id));
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.remove = remove;
