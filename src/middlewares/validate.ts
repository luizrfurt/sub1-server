import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { sendResponse } from "../utils/sendResponse";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        // Send response
        return sendResponse(req, res, 400, err.errors.toString(), []);
      }
      next(err);
    }
  };
