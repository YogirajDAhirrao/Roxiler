import { Role } from "@prisma/client";

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  address: string;
  role?: Role;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: Role;
  };
}

export interface JwtPayload {
  id: number;
  role: Role;
}
