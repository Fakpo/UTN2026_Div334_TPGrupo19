import express from "express";
import enviroments from "./src/api/config/enviroments.js";
import cors from "cors";
import {loggerURL} from './src/api/middlewares/middlewares.js';
import path, { dirname , join } from "path"; // Para armar las rutas de archivos
import { fileURLToPath } from "url";
import { productRoutes } from "./src/api/routes/index.js";


const app= express();
const port = enviroments.port;

//Conexion front
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views" , join(__dirname, "../Backend/src/views"))


// middlewares
app.use(cors());

app.use(loggerURL);

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "Frontend")));
// Endpoints 

//get
app.get("/" , (req,res) => {
    res.send("hola mundo desde express")
});

app.use("/api/products", productRoutes )

app.use( "/dashboard" , (req,res) => {
    res.render("index")
});
//listener
app.listen(port, () => {
    console.log("servidor corriendo en el puerto", port);
});

