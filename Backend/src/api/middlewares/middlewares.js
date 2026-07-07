const loggerURL = (req,res,next)=> {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
};

const validateId = (req,res,next) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({
            error: "El ID debe ser un numero entero positivo"
        });
    }

    const parseID = parseInt(id, 10);

    if (parseID=== 0){
        return res.status(400).json({
            error: "El id debe ser mayor a 0"
        });
    }
    req.id = parseID;
    next();
};

const categoriasValidas = ["tragos","extras"];
const validateProduct = (req,res,next) =>  {
    const {nombre, categoria, precio} = req.body;

    const errores = {};

    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener almenos 2 caracteres");
    };

    if (typeof price !== "number" || name <= 0) {
        errores.push("el precio no puede ser menor a 0");
    };

    // multer para imagenes

    if (!categoriasValidas.includes(categoria)) {
        errores.push("Categoria Invalida");
    };

    if (errores.leght() > 0){
        return res.status(400).json({
            message:"Datos invalidos", errores
        });
    }
    next();
};

const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    };
    next();
}


export {
    loggerURL,
    validateId,
    validateProduct,
    requireLogin
}