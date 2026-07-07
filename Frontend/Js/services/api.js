const BASE_URL = "http://localhost:3000/api/products"

//-----PRODUCTOS--------
export const fetchProductos = async (pagina = 1, limite = 8) => {
    const res = await fetch(`${BASE_URL}/productos?page=${pagina}&limit=${limite}`);
    if(!res.ok) throw new Error("Error al obtener productos:");
    const data = await res.json();
    return data.payload;
};

export const registrarVenta = async (ventaData) => {
    const res = await fetch(`${BASE_URL}/ventas`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body : JSON.stringify(ventaData)
    });
    if (!res.ok) throw new Error("Error al registrar la venta");
    const data = await res.json();
    return data.payload;
}
