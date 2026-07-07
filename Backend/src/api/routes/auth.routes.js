//---------RUTAS DE AUTENTICACION---------------

import { Router} from "express";
import { loginView,getAdminUser, destroySession} from "../controllers/auth.controllers.js";

const router = Router()

//VISTA LOGIN
router.get("/", loginView);

//OBTENER USUARIOS ADMIN
router.post("/",getAdminUser);

//Cerrar sesion
router.post("/logout", destroySession);

export default router;