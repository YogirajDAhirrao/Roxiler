import { Request, Response, NextFunction } from "express";
import { userService } from "./user.service.js";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers(req.query);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await userService.updateUser(
      Number(req.params.id),
      req.body
    );
    res.json({ message: "User updated successfully", updated });
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.deleteUser(Number(req.params.id));
    res.json(result);
  } catch (err) {
    next(err);
  }
};
