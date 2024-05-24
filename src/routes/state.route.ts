import express from "express";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";
import { getStatesController } from "../controllers/state.controller";

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get states
router.get("/", getStatesController);

export default router;
