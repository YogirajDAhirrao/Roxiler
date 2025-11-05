import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/client";



 //Admin Dashboard Controller
 //Returns total number of users, stores, and ratings
 
export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [userCount, storeCount, ratingCount] = await Promise.all([
      prisma.user.count(),
      prisma.store.count(),
      prisma.rating.count(),
    ]);

    res.json({
      totalUsers: userCount,
      totalStores: storeCount,
      totalRatings: ratingCount,
    });
  } catch (err) {
    next(err);
  }
};
