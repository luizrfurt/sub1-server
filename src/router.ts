import { Router } from "express";
import countryRouter from "./routes/country.route";
import stateRouter from "./routes/state.route";
import cityRouter from "./routes/city.route";

const router = Router();

/**
 * Auth: Only operations with authentication
 */

router.use("/api/sub1/countries", countryRouter);
router.use("/api/sub1/states", stateRouter);
router.use("/api/sub1/cities", cityRouter);

/**
 * No auth: Only operations without authentication
 */

export default router;
