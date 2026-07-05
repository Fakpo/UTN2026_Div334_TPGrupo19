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
};




export default loggerURL;