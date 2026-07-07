import bcrypt from "bcrypt";
import { insertUsuario } from "../models/user.models.js";

export const createAdminUser = async (req, res) => {
    try {

        const { nombre, correo, contraseña } = req.body;

        if (!nombre || !correo || !contraseña) {
            return res.status(400).json({
                message: "Datos invalidos, faltan campos"
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passwordUser, saltRounds);

        const [rows] = await insertUsuario(nombre,correo,hashedPassword);

        res.status(201).json({
            message: "Usuario admin creado con exito"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}