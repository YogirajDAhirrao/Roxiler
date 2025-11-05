import { Request, Response, NextFunction } from "express";
import { ratingService } from "./rating.service.js";


 // Controller for rating operations
 // Handles: create/update, fetch (store/user/all), delete
 

//  Create or update a rating
export const rateStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user; 
    if (!user) throw new Error("Unauthorized");

    const rating = await ratingService.rateStore(user.id, req.body);
    res.status(201).json({
      message: "Rating submitted successfully",
      rating,
    });
  } catch (err) {
    next(err);
  }
};

//  Get all ratings(admin only)
export const getAllRatings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ratings = await ratingService.getAllRatings();
    res.json(ratings);
  } catch (err) {
    next(err);
  }
};

//  Get ratings for a specific store
export const getRatingsByStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const storeId = Number(req.params.storeId);
    const ratings = await ratingService.getRatingsByStore(storeId);
    res.json(ratings);
  } catch (err) {
    next(err);
  }
};

//  Get ratings of the logged-in user
export const getMyRatings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Unauthorized");

    const ratings = await ratingService.getRatingsByUser(user.id);
    res.json(ratings);
  } catch (err) {
    next(err);
  }
};

// Delete a rating (admin or owner)
export const deleteRating = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Unauthorized");

    const id = Number(req.params.id);
    const result = await ratingService.deleteRating(id, user);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
