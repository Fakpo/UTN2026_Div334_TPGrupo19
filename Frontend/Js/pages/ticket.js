import { obtenerCarrito , obtenerNombre , resetCarrito } from "../services/storage.js";
import { registrarVenta } from "../services/api.js";
import { iniciarTema } from "../services/tema.js";

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
    const {jsPDF} = window.jspdf;
    const doc = new jsPDF();

    const textNombre    = document.getElementById("nombre-cliente").textContent;
    const fecha     = document.getElementById("fecha-compra").textContent;
    const hora      = document.getElementById("hora-compra").textContent;
    const total     = document.getElementById("total-ticket").textContent;
    const items     = document.querySelectorAll(".item-ticket");

    let y = 20;

    doc.setFontSize(20);
    doc.text("TAKANA DRINKS", 105 , y , {align: "center"});
    y += 10;
    
    //SEPARADOR
    doc.setLineWidth(0.5);
    doc.line(20, y ,190 , y);
    y += 10;

    //DATOS CLIENTE
    doc.setFontSize(12);
    doc.text(textNombre, 20, y); y += 8;
    doc.text(fecha, 20, y); y += 8;
    doc.text(hora, 20, y); y += 12;

    //SEPARADOR
    doc.line(20, y , 190, y); y +=10;

    //PRODUCTOS
    doc.setFontSize(11);
    items.forEach((item) => {
        const partes = item.querySelectorAll("span");
        if (partes.length >= 2){
            doc.text(partes[0].textContent,20,y)
            doc.text(partes[1].textContent,170,y, {align: "right"});
            y += 8;
        }
    });

    //TOTAL
    y += 4;
    doc.line(20,y,190,y); y += 10;
    doc.setFontSize(13);
    doc.text(total,170,y,{align: "right"});

    doc.save("ticket-takana.pdf")
};

//--FINALIZO Y RESET--
btnFinalizar.addEventListener("click",() =>{
    resetCarrito();
    window.location.href = "../index.html";
});

btnPDF.addEventListener("click", descargarPDF);

//--INIT--
window.addEventListener("DOMContentLoaded", async () =>{
    iniciarTema();
    const total = renderTicket();
    await registrar(total);
});