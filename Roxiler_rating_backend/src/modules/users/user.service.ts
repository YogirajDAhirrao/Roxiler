
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { CreateUserDTO, UpdateUserDTO, UserFilters } from "../../types/user.types.js";
import prisma from "../../prisma/client.js";

export const userService = {
  
  async createUser(data: CreateUserDTO) {
    const { name, email, password, address, role = Role.USER } = data;

   
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error("User with this email already exists");

    
    const hashed = await bcrypt.hash(password, 10);

   
    const user = await prisma.user.create({
      data: { name, email, password: hashed, address, role },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  },

  async getAllUsers(filters?: UserFilters) {
    const users = await prisma.user.findMany({
      where: {
        name: filters?.name ? { contains: filters.name, mode: "insensitive" } : undefined,
        email: filters?.email ? { contains: filters.email, mode: "insensitive" } : undefined,
        address: filters?.address ? { contains: filters.address, mode: "insensitive" } : undefined,
        role: filters?.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { id: "asc" },
    });

    return users;
  },

// Get a single user (Admin or self)
   
  async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        stores: {
          select: {
            id: true,
            name: true,
            address: true,
            ratings: {
              select: { value: true },
            },
          },
        },
        ratings: {
          select: {
            id: true,
            value: true,
            store: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!user) throw new Error("User not found");
    return user;
  },

 //Update user (Admin or self)
  async updateUser(id: number, data: UpdateUserDTO) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");

    const updated = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        updatedAt: true,
      },
    });

    return updated;
  },

  
   // Delete user (Admin only)
   
  async deleteUser(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");

    await prisma.user.delete({ where: { id } });
    return { message: "User deleted successfully" };
  },
};
