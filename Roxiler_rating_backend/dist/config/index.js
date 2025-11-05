"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Load .env variables once here
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT ? Number(process.env.PORT) : 5001,
    env: process.env.NODE_ENV || "development",
    jwtSecret: process.env.JWT_SECRET || "SuperSecretKey",
    clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
    databaseUrl: process.env.DATABASE_URL || "",
};
