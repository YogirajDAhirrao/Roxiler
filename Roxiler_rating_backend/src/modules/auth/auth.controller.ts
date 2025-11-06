import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { config } from "../../config";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.registerUser(req.body);
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: config.env === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: result.user });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.loginUser(req.body);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: config.env === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", user: result.user });
  } catch (err) {
    next(err);
  }
};
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const message = await authService.updatePassword(
      req.user!.id,
      oldPassword,
      newPassword
    );
    res.json({ message });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
};

//to get the logged in user on page refresh
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.getCurrentUser(req.user!.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
