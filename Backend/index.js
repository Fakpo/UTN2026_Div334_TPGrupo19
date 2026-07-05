import express from "express";
import enviroments from "./src/api/config/enviroments.js";
import conecction from "./src/api/database/db.js";
import cors from "cors";
import middlewares from "./src/api/middlewares/middlewares.js"
import { Connection } from "mysql2";

const app= express();
const port = enviroments.port;


// middlewares
app.use(cors());

app.use(loggerURL);

app.use(express.json());

/*
elemento.addEventListener("keydown",(event) => {
    console.log("la tecla pulsada fue", event.key)});
*/
// Endpoints 

//get
app.get("/" , (req,res) => {
    res.send("hola mundo desde express")
});
app.get("/api/products", async(req,res) => {
    try {
        // El front tiene q apuntar a esta url y leer ese json
        const sql = "SELECT * FROM productos";
        const [rows] = await conecction.query(sql);
        console.log(rows);
        
        res.status(200).json({
            payload: rows
        });

    } catch (error){
        console.log("Error obteniendo Prductos", error);
    };
});


app.get("/api/products/:id", async(req,res) => {
    try{
        const { id } = req.params; // SAME const id = req.params.id;

        const sql = "SELECT * FROM productos where productos.id = ?";
        const [rows] = await conecction.query(sql, [id]);

        console.log(rows);

        res.status(200).json({
            payload: rows[0]
        });

    }catch(error){
        console.log("Error Obteniendo producto por id", error.message );
    }
});

// POST
app.post("/api/products", async (req, res) => {
    try {
        console.log(req.body);
        
        const {nombre , imagen , categoria, precio} = req.body;

        const sql = `INSERT INTO productos (nombre, imagen, categoria, precio) VALUES ( ? ,? , ? , ? )`;
        
        await conecction.query(sql, [nombre , imagen , categoria, precio]);

        res.status(200).json({
            message: "Producto creado con exito"
        });
    } catch (error) {
        console.log("" , error);
        
    }
});


// DELETE   ( HACER BAJA LOGICA Y PONERLE ACTIVE EN 0)
app.delete("/api/products/:id", async(req,res) => {
    const { id } = req.params;

    await conecction.query(sql, [id]);
    const sql = "DELETE FROM productos WHERE id = ?"
    res.status(200).json({
        message: `producto con id: ${id} Eliminado`
    });
});

// Update products ( Put)
app.put("/api/products", async(req,res) =>{
    try {
        
        const {id,nombre , imagen , categoria, precio, estadoActivo } = req.body;

        const sql = "UPDATE productos SET nombre = ?, imagen = ?, categoria = ?, precio = ?, estadoActivo = ? WHERE id = ?"

        await conecction.query(sql,[nombre,imagen,categoria,precio,,estadoActivo,id]);

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });

        
    } catch (error) {
        console.log(error);
        
    }

    
});


//listener
app.listen(port, () => {
    console.log("servidor corriendo en el puerto", port);
});

