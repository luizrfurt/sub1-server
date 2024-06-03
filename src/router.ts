import { Router } from "express";
import countryRouter from "./routes/country.route";
import stateRouter from "./routes/state.route";
import cityRouter from "./routes/city.route";
import initializeRouter from "./routes/initialize.route";

const router = Router();

/**
 * Auth: Only operations with authentication
 */

router.use("/api/sub1/countries", countryRouter);
router.use("/api/sub1/states", stateRouter);
router.use("/api/sub1/cities", cityRouter);
router.use("/api/sub1/initialize", initializeRouter);

/**
 * No auth: Only operations without authentication
 */

export default router;
