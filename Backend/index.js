import express from "express";
import enviroments from "./src/api/config/enviroments.js";
import conecction from "./src/api/database/db.js";
import cors from "cors";

import { Connection } from "mysql2";
import loggerURL from './src/api/middlewares/middlewares.js';

import path, { dirname } from "path"; // Para armar las rutas de archivos
import { fileURLToPath } from "url";
import { error } from "console";


const app= express();
const port = enviroments.port;

//Conexion front
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// middlewares
app.use(cors());

app.use(loggerURL);

app.use(express.json());

const categoriasValidas = ["Hielo","Bebida"];
const validateProduct = (req,res,next) =>  {
    const {nombre, categoria, precio} = req.body;

    const errores = {};

    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener almenos 2 caracteres");
    };

    if (typeof price !== "number" || name <= 0) {
        errores.push("el precio no puede ser menor a 0");
    };

    // multer para imagenes

    if (!categoriasValidas.includes(categoria)) {
        errores.push("Categoria Invalida");
    };

    if (errores.leght() > 0){
        return res.status(400).json({
            message:"Datos invalidos", errores
        });
    }
};



const validateId = (req,res,next) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({
            error: "El ID debe ser un numero entero positivo"
        });
    }

    const parseID = parseInt(id, 10);

    if (parseID=== 0){
        return res.status(400).json({
            error: "El id debe ser mayor a 0"
        });
    }
    req.id = parseID;
};

app.use(express.static(path.join(__dirname, "..", "Frontend")));
// Endpoints 

//get
app.get("/" , (req,res) => {
    res.send("hola mundo desde express")
});
app.get("/api/products", async(req,res) => {
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
            total: rows.length(),
            payload: rows
        });

    } catch (error){
        console.log("Error obteniendo Prductos", error);

        res.status(500).json({
            message: "Error interno al obtener los productos"
        });
    };
});

//get by id
app.get("/api/products/:id", validateId, async(req,res) => {
    try{
        // const { id } = req.params; // SAME const id = req.params.id;

        const sql = "SELECT id, nombre, imagen, precio, estadoActivo FROM productos where productos.id = ?";
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
});

// POST
app.post("/api/products", validateProduct, async (req, res) => {
    try {
        console.log(req.body);
        
        const {nombre , imagen , categoria, precio, estadoActivo} = req.body;

        if (!name || !image || !category || !price) {
            return res.status(400).json({
                message: "datos invalidos, asegurate de incluir todas las columnas"
            });
        }

        const nombreLimpio = nombre.trim();

        const sql = `INSERT INTO productos (nombreLimpio, imagen, categoria, precio, estadoActivo) VALUES ( ? ,? , ? , ? ,?)`;
        
        const { rows } = await conecction.query(sql, [nombre , imagen , categoria, precio, estadoActivo]);

        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.instertId
        });
    } catch (error) {
        console.log("Error al conetar con la base de datos" , error);
        
    }
});


// DELETE   ( HACER BAJA LOGICA Y PONERLE ACTIVE EN 0)
app.delete("/api/products/:id",validateId, async(req,res) => {
    // const { id } = req.params;
    try {
        const sql = "DELETE FROM productos WHERE id = ? "
        await conecction.query(sql, [req.id]);

        res.status(200).json({
            message: `producto con id: ${req.id} Eliminado`
        });
        
        // res.status(204).json({}); Por si quisiera pasarlo son body

    } catch (error) {
        console.log("ERror al intentar conectar a la base de datos", error);
        
        res.status(500).json({
            message: "error interno de el servidor al intentar agarrar el Id"
        });
    }
});

// Update products ( Put)
app.put("/api/products", async(req,res) =>{
    try {
        
        const {id,nombre , imagen , categoria, precio, estadoActivo } = req.body;

        if (!name || !image || !category || !price) {
            return res.status(400).json({
                message: "datos invalidos, asegurate de incluir todas las columnas"
            });
        }

        const sql = "UPDATE productos SET nombre = ?, imagen = ?, categoria = ?, precio = ?, estadoActivo = ? WHERE id = ?"

        const { result } = await conecction.query(sql,[nombre,imagen,categoria,precio,,estadoActivo,id]);

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
        
    }

    
});


//listener
app.listen(port, () => {
    console.log("servidor corriendo en el puerto", port);
});

