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

/*
elemento.addEventListener("keydown",(event) => {
    console.log("la tecla pulsada fue", event.key)});
*/
// Endpoints 
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
            payload: rows
        });

    }catch(error){
        console.log("Error Obteniendo producto por id", error.message );
    }
});

// app.post("/api/users", async(req,res) => {

// });

app.listen(port, () => {
    console.log("servidor corriendo en el puerto", port);
});

