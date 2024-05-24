import { NextFunction, Request, Response } from "express";
import { getStatesService } from "../services/state.service";
import { sendResponse } from "../utils/sendResponse";

// Get all states
export const getStatesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const states = await getStatesService();

    // Send response
    return sendResponse(req, res, 200, "", states);
  } catch (err: any) {
    next(err);
  }
};
