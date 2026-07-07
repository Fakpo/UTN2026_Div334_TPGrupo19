import express from "express";
import cors from "cors";
import session from "express-session"
import enviroments from "./src/api/config/enviroments.js";
import {loggerURL} from './src/api/middlewares/middlewares.js';
import { __dirname , join } from "./src/api/utils/index.js"; // Para armar las rutas de archivos
import { productRoutes, authRoutes, viewRoutes, userRoutes} from "./src/api/routes/index.js";


const {port, session_key} = enviroments;
const app= express();

app.set("view engine", "ejs");
app.set("views" , join(__dirname, "../Backend/src/views"))


// middlewares
app.use(cors());

app.use(loggerURL);

app.use(express.json());

app.use(express.urlencoded({extended: true}))

app.use(express.static(join(__dirname, "..", "Frontend")));

app.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized:true
}))

// Rutas

app.use("/api/products", productRoutes )
app.use("/api/usuarios", userRoutes )

app.use("/login",authRoutes);
app.use("/login",viewRoutes);

//listener
app.listen(port, () => {
    console.log("servidor corriendo en el puerto", port);
});

