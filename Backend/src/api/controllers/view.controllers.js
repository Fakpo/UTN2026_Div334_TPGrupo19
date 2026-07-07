import { obtenerProductos } from "../../public/js/get.js"
import { selectAllProductsWhereActive } from "../models/product.models.js";

export const indexView = (req,res) => {
    res.render("index",{
        title: "Dashboard"
    });
};

export const getView = async (req,res) => {
    try {
        const [productosArray] = await selectAllProductsWhereActive();
        res.render("get",{
            title: "Productos",
            productosArray
        });
    } catch (error) {
        console.log("error al cargar los productos del dashboard", error);
        res.status(500).send("Error al cargar los productos");
    }
};

export const createView = (req,res) => {
    res.render("post");
};

// dentro se buscara por id y se va a poder, eliminar, cambiar, y cambiar su estadoActivo
export const changeView = (req,res) => {
    res.render("put");
};