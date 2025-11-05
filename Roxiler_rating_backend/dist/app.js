"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("./modules/users/user.routes"));
const store_routes_1 = __importDefault(require("./modules/stores/store.routes"));
const rating_routes_1 = __importDefault(require("./modules/ratings/rating.routes"));
const admin_routes_1 = __importDefault(require("./modules/admin-dashboard/admin.routes"));
const errorHandler_1 = require("./middlwares/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // React frontend
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/stores", store_routes_1.default);
app.use("/api/ratings", rating_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use(errorHandler_1.errorHandler);
app.get("/", (_, res) => res.send("Store Rating API running"));
exports.default = app;
