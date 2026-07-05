// -------- NOMBRE DEL CLIENTE ---------

export const guardarNombre = (nombre) => {
    sessionStorage.setItem("nombreCliente", nombre);
};

export const obtenerNombre = () => {
    return sessionStorage.getItem("nombreCliente") || "";
};

//----- CARRITO -----
export const obtenerCarrito = () => {
    const data = sessionStorage.getItem("carrito");
    return data ? JSON.parse(data) : [];
};

export const guardarCarrito = (carrito) => {
    sessionStorage.setItem("carrito",JSON.stringify(carrito)); 
};

export const agregarAlCarrito = (producto) => {
    const carrito = obtenerCarrito();
    const carritoExistente = carrito.find((p) => p.id === producto.id);
    if (carritoExistente){
        carritoExistente.cantidad ++;
    }
        else{
            carrito.push({...producto,cantidad: 1});
        }
    guardarCarrito(carrito);
};

export const actualizarCantidad = (id, accion) => {
    const carrito = obtenerCarrito();
    const index = carrito.findIndex((p) => p.id === id);
    if(index === -1) return;

    if(accion === "sumar"){
        carrito[index].cantidad++;
    }else{
        carrito[index].cantidad--;
        if(carrito[index].cantidad <= 0){
            carrito.splice(index,1);
        }
    }
    guardarCarrito(carrito);
};

export const eliminarDelCarrito = (id) => {
    const carrito= obtenerCarrito().filter((p) => p.id !== id);
    guardarCarrito(carrito);
};

//---------RESET CARRITO Y NOMBRE---------------
export const resetCarrito = () => {
    sessionStorage.removeItem("carrito");
    sessionStorage.removeItem("nombreCliente");
};