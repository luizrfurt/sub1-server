import { NextFunction, Request, Response } from "express";
import { initializeService } from "../services/initialize.service";
import { sendResponse } from "../utils/sendResponse";

// Initialize
export const initializeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // params
    const userId = res.locals.user.id as unknown as number;

    const initialize = await initializeService(userId);

    // Send response
    return sendResponse(req, res, 200, "", initialize);
  } catch (err: any) {
    next(err);
  }
};
