import { Router } from "express";
import { getAllProducts, getProductById, createProduct, modifyProduct, removeProduct } from "../controllers/product.controllers.js";
import { validateId, validateProduct } from "../middlewares/middlewares.js";
const router = Router();

router.get("/", getAllProducts);

//get by id
router.get("/:id", validateId, getProductById);

// POST
router.post("/", validateProduct, createProduct );


// DELETE   ( HACER BAJA LOGICA Y PONERLE ACTIVE EN 0)
router.delete("/:id",validateId, removeProduct);

// Update products ( Put)
router.put("/", modifyProduct);

export default router;
