import conecction from "../database/db.js";

export const insertUsuario = (nombre, correo, hashedPassword) => {
    const sql = "INSERT into usuarios (nombre, correo, contraseña) values (?, ?, ?)";
    return conecction.query(sql,[nombre, correo, hashedPassword]);
};