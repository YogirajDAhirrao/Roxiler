import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Role } from "@prisma/client";
import { RegisterDTO, LoginDTO, AuthResponse } from "../../types/auth.types.js";
import prisma from "../../prisma/client.js";
import { config } from "../../config";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in .env");

export const authService = {
  async registerUser(data: RegisterDTO): Promise<AuthResponse> {
    const { name, email, password, address, role = Role.USER } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("User with this email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role,
      },
    });

    const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, {
      expiresIn: "1d",
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },

  async loginUser(data: LoginDTO): Promise<AuthResponse> {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },

  async updatePassword(
    userId: number,
    oldPassword: string,
    newPassword: string
  ): Promise<string> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) throw new Error("Old password is incorrect");

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return "Password updated successfully";
  },
  async getCurrentUser(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true },
    });
    if (!user) throw new Error("User not found");
    return user;
  },
};
