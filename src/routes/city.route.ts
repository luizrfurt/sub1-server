import express from "express";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";
import { getCitiesController } from "../controllers/city.controller";

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get cities
router.get("/", getCitiesController);

export default router;
