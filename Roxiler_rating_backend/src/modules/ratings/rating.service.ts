
import prisma from "../../prisma/client.js";
import { CreateOrUpdateRatingDTO } from "../../types/rating.types.js";

export const ratingService = {
  
    // Create or Update rating
   // Enforces unique (userId, storeId)
   
  async rateStore(userId: number, data: CreateOrUpdateRatingDTO) {
    const { storeId, value } = data;

    if (value < 1 || value > 5) throw new Error("Rating must be between 1 and 5");

    // Check if store exists
    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) throw new Error("Store not found");

    // Upsert rating (create or update)
    const rating = await prisma.rating.upsert({
      where: { userId_storeId: { userId, storeId } },
      update: { value },
      create: { userId, storeId, value },
      include: {
        store: { select: { id: true, name: true } },
        user: { select: { id: true, name: true } },
      },
    });

    return rating;
  },

  
   // Get all ratings (Admin only)
   
  async getAllRatings() {
    return prisma.rating.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        store: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  },

  
   //Get all ratings for a specific store (public)
   
  async getRatingsByStore(storeId: number) {
    const ratings = await prisma.rating.findMany({
      where: { storeId },
      include: {
        user: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return ratings;
  },

  
   // Get user’s own ratings
   
  async getRatingsByUser(userId: number) {
    return prisma.rating.findMany({
      where: { userId },
      include: {
        store: { select: { id: true, name: true } },
      },
      orderBy: { updatedAt: "desc" },
    });
  },

  
   // Delete a rating (Admin or owner)
   
  async deleteRating(id: number, currentUser: { id: number; role: string }) {
    const rating = await prisma.rating.findUnique({ where: { id } });
    if (!rating) throw new Error("Rating not found");

    // Only Admin or rating owner can delete
    if (currentUser.role !== "ADMIN" && currentUser.id !== rating.userId) {
      throw new Error("Not authorized to delete this rating");
    }

    await prisma.rating.delete({ where: { id } });
    return { message: "Rating deleted successfully" };
  },
};
