import { obtenerCarrito , obtenerNombre , resetCarrito } from "../services/storage.js";
import { registrarVenta } from "../services/api.js";
import { iniciartema } from "../services/tema.js";

//--ELEMENTOS DEL DOM---
const pNombre      = document.getElementById("nombre-cliente");
const pFecha       = document.getElementById("fecha-compra");
const pHora        = document.getElementById("hora-compra");
const listaTicket  = document.getElementById("lista-ticket");
const pTotal       = document.getElementById("total-ticket");
const btnPDF       = document.getElementById("btn-descargar-pdf");
const btnFinalizar = document.getElementById("btn-finalizar");

//--DATOS DEL CLIENTE--
const nombre = obtenerNombre();
const hoy = new Date();
const fecha = hoy.toLocaleDateString("es-AR")
const hora = hoy.toLocaleTimeString("es-AR", {hour: "2-digit", minute: "2-digit"});

//--RENDER--
const renderTicket = () =>{
    pNombre.textContent = `Cliente ${nombre}`;
    pFecha.textContent = `Fecha ${fecha}`;
    pHora.textContent = `Hora ${hora}`;

    const carrito = obtenerCarrito();
    let total = 0;
    
    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad;

        const li = document.createElement("li");
        li.classList.add("item-ticket");
        li.innerHTML = `
            <span>${producto.nombre}</span>
            <span>cant: ${producto.cantidad}</span>
            <span>$${producto.precio * producto.cantidad}</span>
        `;
        listaTicket.appendChild(li);
    });

    pTotal.textContent = `Total: $${total}`;

    return total;
};

//--REGISTRAR VENTA--
const registrar = async (total) => {
    try{
        const carrito = obtenerCarrito();
        await registrarVenta({
            nombre_cliente : nombre,
            precio_total : total,
            productos: carrito.map((p) =>({
                id: p.id,
                cantidad: p.cantidad,
                precio_unitario: p.precio
            }))
        });
    }catch (Error){
        console.warn("No se pudo registrar el pago", Error.message);
    }
};

//--DESCARGA PDF--
const descargarPDF = ()=>{
    window.print();
};

//--FINALIZO Y RESET--
btnFinalizar.addEventListener("click",() =>{
    resetCarrito();
    window.location.href = "../index.html";
});

btnPDF.addEventListener("click", descargarPDF);
 
//--INIT--
window.addEventListener("DOMContentLoaded", async () =>{
    iniciartema();
    const subtotal = renderTicket();
    await registrar(subtotal);
});