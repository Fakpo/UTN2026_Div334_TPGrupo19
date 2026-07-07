import { Router } from "express";
import { getDashboard, indexDashboard, changeDashboard, createDashboard } from "../controllers/dashboard.controllers.js";

const router = Router();

router.get("/", indexDashboard);
router.get("/get", getDashboard);
router.get("/post", createDashboard);
router.get("/put", changeDashboard);

export default router;