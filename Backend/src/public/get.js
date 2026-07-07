async function obtenerProductos() {
    try {
        const respuesta = await fetch("http://localhost:3000/api/products");
        
        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const productos = await respuesta.json();
        
        console.log("Productos:", productos);

        return productos
    } catch (error) {
        console.error("Hubo un problema al traer los productos:", error);
    }
}