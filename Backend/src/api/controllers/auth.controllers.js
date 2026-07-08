//----------------CONTROLADORES DE AUTENTICACION--------------------

import conecction from "../database/db.js";
import bcrypt from "bcrypt";

//VISTA LOGIN - GET
export const loginView = (req, res) => {
    res.render("login", {
        title: "Login Admin",
        about: "Ingresá tu email y contraseña",
        error: undefined
    });
};

//POST validacion credenciales bcrypt
export const getAdminUser = async (req, res) => {
    console.log("BODY:" ,req.body)
    try{
        const {email , password} = req.body;
        if (!email || !password) {
            console.log ("no te estas en el body")
            return res.render("login", {
                title: "Login",
                about: "Introduci tu email y contraseña",
                error: "Todos los campos son obligatorios"
            });
        };
        
        //BCRYPT busca solo por mail
        const sql = "SELECT * FROM usuarios WHERE correo = ? ";
        const [rows] = await conecction.query(sql, [email]);

        if (rows.length === 0) {
            return res.render("login", {
                title: "Login",
                about: "Introduci tu email y password",
                error: "Credenciales incorrectas"
            });
        }

        console.log(rows);
        const user = rows[0];
        // Trae password del req.body comprueba si su hash es igual al de la DB
        const match = await bcrypt.compare(password, user.contrasenia);

        if (match) {
            // Guardamos una sesion
            req.session.user = {
                id: user.id,
                nombre: user.nombre,
                email: user.correo
            }
            res.redirect("/login/index");
        }else{
            console.log(password);
            console.log(user.contrasenia);
            return res.render("login", {
                title: "Login Admin",
                about: "Introduci tu email y contraseña",
                error: "Contraseña incorrecta"
        })
    }
    }catch(error){
        console.log("Error en login:", error);
        res.render("login", {
            title: "Login Admin",
            about: "Ingresá tu email y contraseña",
            error: "Error interno del servidor."
        });
    }
}

//CERRAR SESION
export const destroySession = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al destruir la sesion: ", err);
            return res.status(500).json({
                message: "Error al cerrar sesion"
            })
        }
        //REDIRIGE
        res.redirect("/login");
    })
}

