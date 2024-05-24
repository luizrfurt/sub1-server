import express from "express";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";
import { getCountriesController } from "../controllers/country.controller";

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get countries
router.get("/", getCountriesController);

export default router;
