import {obtenerCarrito,actualizarCantidad,eliminarDelCarrito} from "../services/storage.js";
import { iniciartema } from "../services/tema.js";

//-------ELEMENTOS DEL DOM----------
const listarCarrito = document.getElementById("contenedor-carrito");
const pTotal = document.getElementById("total");
const btnSeguir = document.getElementById("btn-seguir-comprando");
const btnFinalizar = document.getElementById("btn-finalizar-compra");
const modal = document.getElementById("modal-confirmacion");
const modalAlert = document.getElementById("modal-vacio")
const btnAceptar = document.getElementById("btn-aceptar-modal")
const btnConfirmar = document.getElementById("btn-confirmar-modal") 
const btnCancelar = document.getElementById("btn-cancelar-modal") 

//-------RENDER----------
const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    listarCarrito.innerHTML = "";

    if(carrito.length === 0){
        listarCarrito.innerHTML = `
            <li style="text-align:center; padding:20px; font-size: 25px;">
            Tu carrito esta vacio.
            </li>`;
        pTotal.textContent = "Total :$0";
        return;
    }

    let total = 0;
    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad;
        
        const li = document.createElement("li");
        li.classList.add("item-carrito");
        li.innerHTML = `
            <span>${producto.nombre}</span>
            <span class="controles-cantidad">
                <button class="btn-secundario btn-cantidad" data-id="${producto.id}" data-accion="restar"> − </button>
                <span>${producto.cantidad}</span>
                <button class="btn-secundario btn-cantidad" data-id="${producto.id}" data-accion="sumar"> + </button>
            </span>
            <span>$${producto.precio * producto.cantidad}</span>
            <button class="btn-secundario btn-eliminar" data-id="${producto.id}">✕</button>
        `;
        listarCarrito.appendChild(li);
    });

    pTotal.textContent = `Total :$${total}`;

    // EVENTOS CANTIDAD
    document.querySelectorAll(".btn-cantidad").forEach((btn) => {
        btn.addEventListener("click", () => {
            actualizarCantidad(Number(btn.dataset.id), btn.dataset.accion);
            renderizarCarrito();
        });
    });
    //EVENTO ELIMINAR
    document.querySelectorAll(".btn-eliminar").forEach((btn) => {
        btn.addEventListener("click", () => {
            eliminarDelCarrito(Number(btn.dataset.id));
            renderizarCarrito();
        })
    });
};

//MODAL CONFIRMACION
const confirmarCompra = () =>{
    const carrito = obtenerCarrito();
    if(carrito.length === 0){
        modalAlert.style.display = "flex"
        return;
    }
    modal.style.display = "flex";
};

btnAceptar.addEventListener("click" , () =>{
    modalAlert.style.display = "none"
})

btnConfirmar.addEventListener("click", () =>{
    modal.style.display = "none";
    window.location.href = "ticket.html";
});

btnCancelar.addEventListener("click",() => {
    modal.style.display = "none";
})


//-----NAVEGACION-----

btnSeguir.addEventListener("click",() => {
    window.location.href = "productos.html";
});

btnFinalizar.addEventListener("click", confirmarCompra);

//INIT
window.addEventListener("DOMContentLoaded", () =>{
    iniciartema();
    renderizarCarrito();
});