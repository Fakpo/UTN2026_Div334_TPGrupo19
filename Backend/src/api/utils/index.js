// logica de archivos y rutas
import { fileURLToPath } from "url";
import {join, dirname } from "path";

//conexion con el front
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename));

export {
    __dirname,
    join
};
