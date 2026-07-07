import conecction from "../database/db.js";

const selectAllProducts = () => {
    const sql = "SELECT id, nombre, imagen, precio, estadoActivo FROM productos";
    return conecction.query(sql);
};

const selectProductsById = (id) => {
    const sql = "SELECT id, nombre, descripcion, imagen, precio, estadoActivo FROM productos where productos.id = ?";
    return conecction.query(sql, [id]);
};

const insertProduct = (nombre, imagen, categoria, precio, estadoActivo) => {
    const sql = "INSERT INTO productos (nombre, imagen, categoria, precio, estadoActivo) VALUES (?, ?, ?, ?, ?)";
    return conecction.query(sql, [nombre, imagen, categoria, precio, estadoActivo]);
};

const updateProduct = (id, nombre, imagen, categoria, precio, estadoActivo) => {
    const sql = "UPDATE productos SET nombre = ?,  imagen = ?, categoria = ?, precio = ?, estadoActivo = ? WHERE id = ?";
    return conecction.query(sql,[nombre,imagen,categoria,precio,estadoActivo,id]);
};

const deleteProduct = (id) => {
    const sql = "DELETE FROM productos WHERE id = ?";
    return conecction.query(sql, [id]);
};

export {
    selectAllProducts,
    selectProductsById,
    insertProduct,
    updateProduct,
    deleteProduct
}