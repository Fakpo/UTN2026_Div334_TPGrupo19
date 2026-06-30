import mysql from "mysql2/promise";
import enviroments from "../config/enviroments.js";
import { createPool } from "mysql2";

const { database } = enviroments;

const conecction = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default conecction;