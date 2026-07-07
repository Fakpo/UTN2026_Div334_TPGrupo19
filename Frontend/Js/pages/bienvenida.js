import { guardarNombre } from "../services/storage.js";

window.addEventListener("DOMContentLoaded", () =>{
    const btnIngresar = document.getElementById("btn-ingresar");
    const inputNombre = document.getElementById("nombre-cliente");
    const mensajeError = document.getElementById("mensaje-error");

    const ingresar = () => {
        const nombre = inputNombre.value.trim();

        if(nombre === ""){
            mensajeError.style.display = "block";
            return
        }
        mensajeError.style.display = "none";
        guardarNombre(nombre)
        window.location.href = "pages/productos.html";
    };

    btnIngresar.addEventListener("click", ingresar)

    //ENTER = INGRESAR
    window.addEventListener("keydown", (e) => {
        if(e.key === "Enter"){
            ingresar();
        } 
    });

});