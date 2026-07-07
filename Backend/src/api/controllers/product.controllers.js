//EXPORTS
import { selectAllProducts, insertProduct, updateProduct, selectProductsById, deleteProduct, selectAllProductsWhereActive} from "../controllers/product.models.js";


//controladores

export const getAllProducts = async(req,res) => {
    try {
        // El front tiene q apuntar a esta url y leer ese json
        const [rows] = await selectAllProducts();
        console.log(rows);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron Productos"
            });
        }
        res.status(200).json({
            // total: rows.length(),
            payload: rows
        });

    } catch (error){
        console.log("Error obteniendo Prductos", error);

        res.status(500).json({
            message: "Error interno al obtener los productos"
        });
    };
};

export const getAllActiveProductsWhereActive = async(req,res) => {
    try {
        // El front tiene q apuntar a esta url y leer ese json
        const [rows] = await selectAllProductsWhereActive();
        console.log(rows);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron Productos"
            });
        }
        res.status(200).json({
            // total: rows.length(),
            payload: rows
        });

    } catch (error){
        console.log("Error obteniendo Prductos", error);

        res.status(500).json({
            message: "Error interno al obtener los productos"
        });
    };
};


export const getProductById = async(req,res) => {
    try{
        const [rows] = await selectProductsById(req.id);

        // console.log(rows);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontraron Productos con id: ${req.id}`
            });
        } 

        res.status(200).json({
            payload: rows[0]
        });

    }catch(error){
        console.log("Error Obteniendo producto por id", error.message );

        res.status(500).json({
            error: "Error inerno al obtener prodcuto con id"
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        console.log(req.body);

        const {nombre, imagen , categoria, precio, estadoActivo} = req.body;

        if (!nombre || !imagen || !categoria || !precio || !estadoActivo) {
            return res.status(400).json({
            message: "datos invalidos, asegurate de incluir todas las columnas"
        });
        };

        const nombreLimpio = nombre.trim();

        const { rows } = await insertProduct(nombreLimpio, imagen, categoria, precio, estadoActivo);

        res.status(201).json({
        message: "Producto creado con exito",
        productId: rows.instertId
        });
    } catch (error) {
        console.log("Error al conetar con la base de datos" , error);
    };
};

export const modifyProduct = async(req,res) =>{
    try {
        
        const {id,nombre, imagen , categoria, precio, estadoActivo } = req.body;

        if (!nombre || !imagen || !categoria || !precio || !estadoActivo) {
            return res.status(400).json({
                message: "datos invalidos, asegurate de incluir todas las columnas"
            });
        }

        const nombreLimpio = nombre.trim();

        const { result } = await updateProduct(id, nombreLimpio, imagen, categoria, precio, estadoActivo);

        if (result.affectedRows === 0 ) {
            return res.status(404).json({
                message: "No se actualizo nada"
            });
        }
        res.status(200).json({
            message: "Producto con id actualizado correctamente"
        });   
    } catch (error) {
        console.log(error);
    };
};

export const removeProduct = async(req,res) => {
    // const { id } = req.params;
    try {
        await deleteProduct(req.id);

        res.status(200).json({
            message: `producto con id: ${req.id} Eliminado`
        });
        
        // res.status(204).json({}); Por si quisiera pasarlo son body

    } catch (error) {
        console.log("Error al intentar conectar a la base de datos", error);
        
        res.status(500).json({
            message: "error interno de el servidor al intentar agarrar el Id"
        });
    };
};