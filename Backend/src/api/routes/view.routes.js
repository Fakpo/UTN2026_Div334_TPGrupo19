import { Router } from "express";
import { requireLogin } from "../middlewares/middlewares.js";
import { indexView, getView,createView, changeView } from "../controllers/view.controllers.js";
const router = Router()

router.get("/index", requireLogin, indexView);
router.get("/get", requireLogin, getView);
router.get("/post", requireLogin, createView);
router.get("/put",requireLogin ,changeView);

export default router