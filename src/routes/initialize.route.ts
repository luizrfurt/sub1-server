import express from "express";
import { deserializeUser } from "../middlewares/deserializeUser";
import { requireUser } from "../middlewares/requireUser";
import { initializeController } from "../controllers/initialize.controller";

const router = express.Router();

router.use(deserializeUser, requireUser);

// Initialize
router.post("/", initializeController);

export default router;
