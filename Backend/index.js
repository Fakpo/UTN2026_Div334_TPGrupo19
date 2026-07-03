import express from "express";
import enviroments from "./src/api/config/enviroments.js";
import conecction from "./src/api/database/db.js";

const app= express();
const port = enviroments.port;

app.get("/" , (req,res) => {
    res.send("hola mundo desde express")


});

/*
elemento.addEventListener("keydown",(event) => {
    console.log("la tecla pulsada fue", event.key)});
*/

//// PARA OBTENER PRODUCTOS
app.get("/api/products", async(req,res) => {
    try {
        const [rows] = await conecction.query("SELECT * FROM productos");
        // console.log(rows);
        
        res.status(200).json({
            payload: rows
        });

    } catch (error){
        console.log("che paso un ", error);
    };
});

app.listen(port, () => {
    console.log("servidor corriendo en el puerto", port);
});

