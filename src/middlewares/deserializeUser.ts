require("dotenv").config();
import config from "config";
import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { sendResponse } from "../utils/sendResponse";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.locals.user = null;

    let accessToken = req.cookies.__Acs_tkn;

    const portMain = config.get<string>("portMain");

    // Validates whether accessToken has an active session
    let response = null;
    try {
      response = await axios.post(
        `http://localhost:${portMain}/api/main/sessions/validate`,
        {
          accessToken: accessToken,
        }
      );
    } catch (err: any) {
      response = err.response;
    }

    if (response.data.status !== "success") {
      return sendResponse(req, res, 401, "Acesso negado!", []);
    } else {
      res.locals.user = response.data.data[0];
      next();
    }
  } catch (err: any) {
    next(err);
  }
};
