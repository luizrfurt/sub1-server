import { NextFunction, Request, Response } from "express";
import { getCountriesService } from "../services/country.service";
import { sendResponse } from "../utils/sendResponse";

// Get all countries
export const getCountriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const countries = await getCountriesService();

    // Send response
    return sendResponse(req, res, 200, "", countries);
  } catch (err: any) {
    next(err);
  }
};
