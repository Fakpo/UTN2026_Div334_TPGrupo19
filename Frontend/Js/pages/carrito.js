import {obtenerCarrito,actualizarCantidad,eliminarDelCarrito} from "../services/storage.js";

//-------ELEMENTOS DEL DOM----------
const listarCarrito = document.getElementById("contenedor-carrito");
const pSubtotal = document.getElementById("subtotal");
const pTotal = document.getElementById("total");
const btnSeguir = document.getElementById("btn-seguir-comprando");
const btnFinalizar = document.getElementById("btn-finalizar-compra");
const modal = document.getElementById("modal-confirmacion");
const btnConfirmar = document.getElementById("btn-confirmar-modal") 
const btnCancelar = document.getElementById("btn-cancelar-modal") 

//-------RENDER----------
const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    listarCarrito.innerHTML = "";

    if(carrito.length === 0){
        listarCarrito.innerHTML = `
            <li style="text-align:center; padding:20px;">
            Tu carrito está vacío.
            </li>`;
        pSubtotal.textContent = "Subtotal :$0";
        pTotal.textContent = "Total :$0";
        return;
    }

    let subtotal = 0;
    carrito.forEach((producto) => {
        subtotal += producto.precio * producto.cantidad;
        
        const li = document.createElement("li");
        li.classList.add("item-carrito");
        li.innerHTML = `
            <span>${producto.nombre}</span>
            <span class="controles-cantidad">
                <button class="btn-secundario btn-cantidad" data-id="${producto.id}" data-accion="restar">−</button>
                <span>${producto.cantidad}</span>
                <button class="btn-secundario btn-cantidad" data-id="${producto.id}" data-accion="sumar">+</button>
            </span>
            <span>$${producto.precio * producto.cantidad}</span>
            <button class="btn-secundario btn-eliminar" data-id="${producto.id}">✕</button>
        `;
        listarCarrito.appendChild(li);
    });

    pSubtotal.textContent = `Subtotal :$${subtotal}`;
    pTotal.textContent = `Total :$${subtotal}`;

    // EVENTOS CANTIDAD
    document.querySelectorAll(".btn-cantidad").forEach((btn) => {
        btn.addEventListener("click", () => {
            actualizarCantidad(Number(btn.dataset.id), btn.dataset.accion);
            renderizarCarrito();
        });
    });
};

//MODAL CONFIRMACION
const confirmarCompra = () =>{
    const carrito = obtenerCarrito();
    if(carrito.length === 0){
        alert("Tu carrito esta vacio, debes agregar productos")
        return;
    }
    modal.style.display = "flex";
};

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
window.addEventListener("DOMContentLoaded", renderizarCarrito);