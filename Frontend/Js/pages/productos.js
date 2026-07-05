import { agregarAlCarrito } from "../services/storage.js";
import { fetchProductos } from "../services/api.js";


//------ESTADO-------
let todosLosProductos = [];
let categoriaActiva = 1;
let paginaActual = 1;
const PRODUCTOS_POR_PAGINA = 4;

//--------ELEMENTOS DOM-------
const listaBebidas = document.getElementById("listado-bebidas");
const listaHielo = document.getElementById("listado-hielo");
const secBebidas = document.getElementById("bebidas")
const secHielo = document.getElementById("hielo")
const btnBebidas = document.getElementById("btn-filtro-bebidas");
const btnHielo = document.getElementById("btn-filtro-hielo");
const contenedorPaginacion = document.getElementById("paginacion");

//-----------CARGA PRODUCTS---------
const cargaProductos = async () => {
    try{
        const data = await fetchProductos();
        todosLosProductos = data.productos;
    }catch (Error){
        //SI EL BACK AUN NO ESTA SE USA LOS HARCODEADO
        console.warn("Backend no disponible,")
        const res = await fetch("../Js/datos/productos.json")
        const fallback = await res.json()
        todosLosProductos = fallback.filter((p) => p.activo);
    }
    renderizar();
};

//--------RENDER----------
const renderizar = () => {
    const filtrados = todosLosProductos.filter(
        (p) => p.categoria === categoriaActiva
    );

    //---PAGINACION---
    const totalPaginas = Math.ceil(filtrados.length / PRODUCTOS_POR_PAGINA);
    const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const paginados = filtrados.slice(inicio,inicio + PRODUCTOS_POR_PAGINA);

    //--RENDERIZA SEGUN LISTA--
    const lista = categoriaActiva === "bebidas" ? listaBebidas : listaHielo;
    lista.innerHTML = "";

    paginados.forEach((producto) => {
        const li = document.createElement("li");
        li.classList.add(categoriaActiva === "bebidas" ? "li-bebidas" : "li-hielo");
        li.innerHTML = `
            <img class="img-producto" src="${producto.imagen}" alt="${producto.nombre}">
            <h3 class="nombre-producto">${producto.nombre}</h3>
            <p class="precio-producto">$${producto.precio}</p>
            <button class="btn-primario agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
            `;
        lista.appendChild(li);
    });

    // EVENTOS BOTONES
    lista.querySelectorAll(".agregar-carrito").forEach((btn) => {
        btn.addEventListener("click",() =>{
            const id = Number(btn.dataset.id);
            const producto = todosLosProductos.find((p) => p.id === id);
            agregarAlCarrito(producto);

            btn.textContent = "Agregado correctamente";
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = "Agregar al carrito";
                btn.disabled = false;
            },1000);
        });
    });

    renderizarPaginacion(totalPaginas);
};

//-------------PAGINACION----------
const renderizarPaginacion = (totalPaginas) =>{
    if(!contenedorPaginacion) return;
    contenedorPaginacion.innerHTML = "";
    if(totalPaginas <= 1) return;

    for (let i = 1 ; i <= totalPaginas; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add(i === paginaActual ? "btn-primario": "btn-secundario");
        btn.addEventListener("click", () => {
            paginaActual = i;
            renderizar ();
        });
        contenedorPaginacion.appendChild(btn)
    }
};

//--FILTROS CATG--
const mostrarCategoria = (categoria) => {
    categoriaActiva = categoria;
    paginaActual = 1;

    //MUESTRA/OCULTA SECCIONES
    secBebidas.style.display = categoria === "bebidas" ? "block" : "none";
    secHielo.style.display = categoria === "hielo" ? "block" : "none";

    //CAMBIA ESTILO BTN ACT/INAC
    btnBebidas.className = categoria === "bebidas" ? "btn-primario" : "btn-secundario";
    btnHielo.className = categoria === "hielo" ? "btn-primario" : "btn-secundario";

    renderizar();
};


//INIT

window.addEventListener("DOMContentLoaded", () => {
    btnBebidas.addEventListener("click" , () => mostrarCategoria("bebidas"));
    btnHielo.addEventListener("click" , () => mostrarCategoria("hielo"));
    
    mostrarCategoria("bebidas"); //Arranca mostrando las bebidas
    cargaProductos();
})
