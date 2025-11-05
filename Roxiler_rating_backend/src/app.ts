import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes";
import storeRoutes from "./modules/stores/store.routes";
import ratingRoutes from "./modules/ratings/rating.routes";
import adminRoutes from "./modules/admin-dashboard/admin.routes"
import { errorHandler } from "./middlwares/errorHandler";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

app.get("/", (_, res) => res.send("Store Rating API running"));

export default app;
