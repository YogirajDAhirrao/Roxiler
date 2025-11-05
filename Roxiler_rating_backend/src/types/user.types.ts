import { Role } from "@prisma/client";

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  address: string;
  role?: Role;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  address?: string;
  role?: Role;
}

export interface UserFilters {
  name?: string;
  email?: string;
  address?: string;
  role?: Role;
}
