import dotenv from "dotenv";

// Load .env variables once here
dotenv.config();

export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 5001,
  env: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "SuperSecretKey",
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  databaseUrl: process.env.DATABASE_URL || "",
};
