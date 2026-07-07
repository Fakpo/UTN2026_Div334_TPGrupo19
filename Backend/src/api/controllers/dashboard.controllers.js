import { fetchProductos } from "../../../../Frontend/Js/services/api.js"

export const indexDashboard = (req,res) => {
    res.render("index");
};

export const getDashboard = async (req,res) => {
    try {


        res.render("get",
            fetchProductos
        );
        
    } catch (error) {
        
    }
};

export const createDashboard = (req,res) => {
    res.render("post");
};

// dentro se buscara por id y se va a poder, eliminar, cambiar, y cambiar su estadoActivo
export const changeDashboard = (req,res) => {
    res.render("put");
};