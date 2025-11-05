import { Request, Response, NextFunction } from "express";


export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Error:", err);

 
  const statusCode = err.statusCode || 500;

  
  if (err.code && err.code.startsWith("P")) {
    return res.status(400).json({
      success: false,
      message: "Database error occurred.",
      details: err.message,
    });
  }

 
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired. Please log in again.",
    });
  }


  if (err instanceof Error && !statusCode) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
