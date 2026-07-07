

export const indexDashboard = (req,res) => {
    res.render("index");
};

export const getDashboard = (req,res) => {
    res.render("get");
};

export const createDashboard = (req,res) => {
    res.render("post");
};

// dentro se buscara por id y se va a poder, eliminar, cambiar, y cambiar su estadoActivo
export const changeDashboard = (req,res) => {
    res.render("index");
};