import { Request, Response, NextFunction } from "express";
import { storeService } from "./store.service.js";

export const getMyStores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const stores = await storeService.getMyStores(req.user!.id);
    res.json(stores);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const createStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const store = await storeService.createStore(req.body);
    res.status(201).json({
      message: "Store created successfully",
      store,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllStores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = req.query;
    const stores = await storeService.getStores(filters);
    res.json(stores);
  } catch (err) {
    next(err);
  }
};

export const getStoreById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const store = await storeService.getStoreById(Number(req.params.id));
    res.json(store);
  } catch (err) {
    next(err);
  }
};

export const updateStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedStore = await storeService.updateStore(
      Number(req.params.id),
      req.body,
      req.user!
    );
    res.json({
      message: "Store updated successfully",
      store: updatedStore,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await storeService.deleteStore(Number(req.params.id));
    res.json(result);
  } catch (err) {
    next(err);
  }
};
