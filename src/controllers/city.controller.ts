import { NextFunction, Request, Response } from "express";
import { getCitiesService } from "../services/city.service";
import { sendResponse } from "../utils/sendResponse";

// Get all cities
export const getCitiesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cities = await getCitiesService();

    // Send response
    return sendResponse(req, res, 200, "", cities);
  } catch (err: any) {
    next(err);
  }
};
