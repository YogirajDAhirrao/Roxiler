import prisma from "../../prisma/client.js";
import {
  CreateStoreDTO,
  UpdateStoreDTO,
  StoreFilters,
} from "../../types/store.types.js";

export const storeService = {
  //Create store (Admin only)

  async createStore(data: CreateStoreDTO) {
    if (data.ownerId) {
      const owner = await prisma.user.findUnique({
        where: { id: data.ownerId },
      });
      if (!owner) throw new Error("Owner not found");
      if (owner.role !== "STORE_OWNER")
        throw new Error("Owner must have STORE_OWNER role");
    }

    const store = await prisma.store.create({
      data,
      include: {
        owner: { select: { id: true, name: true, email: true, role: true } },
      },
    });

    return store;
  },

  //Get all stores (Public: searchable)
  // Includes Avg Rating

  async getStores(filters?: StoreFilters) {
    const stores = await prisma.store.findMany({
      where: {
        name: filters?.name
          ? { contains: filters.name, mode: "insensitive" }
          : undefined,
        address: filters?.address
          ? { contains: filters.address, mode: "insensitive" }
          : undefined,
        ownerId: filters?.ownerId,
      },
      include: {
        ratings: { select: { value: true } },
        owner: { select: { id: true, name: true } },
      },
      orderBy: { id: "asc" },
    });

    return stores.map((store) => ({
      ...store,
      avgRating:
        store.ratings.length > 0
          ? store.ratings.reduce((acc, r) => acc + r.value, 0) /
            store.ratings.length
          : 0,
    }));
  },

  // Get single store with all ratings
  async getStoreById(id: number) {
    const store = await prisma.store.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        ratings: {
          select: {
            id: true,
            value: true,
            user: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!store) throw new Error("Store not found");

    const avgRating =
      store.ratings.length > 0
        ? store.ratings.reduce((acc, r) => acc + r.value, 0) /
          store.ratings.length
        : 0;

    return { ...store, avgRating };
  },

  //get my store as store owner
  async getMyStores(id: number) {
    const stores = await prisma.store.findMany({ where: { ownerId: id },include:{ratings:{include:{user:true}}} });
    if (!stores) throw new Error("Store not found");
    return stores;
  },

  // Update store (Admin or Store Owner)
  async updateStore(
    id: number,
    data: UpdateStoreDTO,
    currentUser: { id: number; role: string }
  ) {
    const store = await prisma.store.findUnique({ where: { id } });
    if (!store) throw new Error("Store not found");

    // Restrict access if user is STORE_OWNER
    if (
      currentUser.role === "STORE_OWNER" &&
      store.ownerId !== currentUser.id
    ) {
      throw new Error("You can only update your own store");
    }

    //  Allow admin or owner
    const updatedStore = await prisma.store.update({
      where: { id },
      data,
      include: { owner: { select: { id: true, name: true } } },
    });

    return updatedStore;
  },
  //  Delete store (Admin only)

  async deleteStore(id: number) {
    await prisma.store.delete({ where: { id } });
    return { message: "Store deleted successfully" };
  },
};
