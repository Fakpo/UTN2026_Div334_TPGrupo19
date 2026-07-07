//EXPORTS
import conecction from "../database/db.js";


//controladores

export const getAllProducts = async(req,res) => {
    try {
        // El front tiene q apuntar a esta url y leer ese json
        const sql = "SELECT id, nombre, imagen, precio, estadoActivo FROM productos";

        const [rows] = await conecction.query(sql);
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
        // const { id } = req.params; // SAME const id = req.params.id;

        const sql = "SELECT id, nombre, descripcion, imagen, precio, estadoActivo FROM productos where productos.id = ?";
        const [rows] = await conecction.query(sql, [req.id]);

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

const {nombre , descripcion, imagen , categoria, precio, estadoActivo} = req.body;

if (!name || !image || !category || !price) {
return res.status(400).json({
message: "datos invalidos, asegurate de incluir todas las columnas"
});
}

const nombreLimpio = nombre.trim();

const sql = `INSERT INTO productos (nombreLimpio, descripcion, imagen, categoria, precio, estadoActivo) VALUES ( ? ,?, ? , ? , ? ,?)`;

const { rows } = await conecction.query(sql, [nombre , descripcion , imagen , categoria, precio, estadoActivo]);

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
        
        const {id,nombre , descripcion, imagen , categoria, precio, estadoActivo } = req.body;

        if (!name || !image || !category || !price) {
            return res.status(400).json({
                message: "datos invalidos, asegurate de incluir todas las columnas"
            });
        }

        const sql = "UPDATE productos SET nombre = ?, descripcion = ?, imagen = ?, categoria = ?, precio = ?, estadoActivo = ? WHERE id = ?"

        const { result } = await conecction.query(sql,[nombre,descripcion,imagen,categoria,precio,,estadoActivo,id]);

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
        const sql = "DELETE FROM productos WHERE id = ? "
        await conecction.query(sql, [req.id]);

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