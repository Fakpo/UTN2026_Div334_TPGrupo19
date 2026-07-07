import { Router } from "express";
import { getDashboard, indexDashboard, changeDashboard, createDashboard } from "../controllers/dashboard.controllers";

const router = Router();

router.get("/dashboard", indexDashboard);

export default router;