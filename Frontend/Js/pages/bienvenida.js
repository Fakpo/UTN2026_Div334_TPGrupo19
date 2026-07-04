import { guardarNombre } from "../services/storage.js";

window.addEventListener("DOMContentLoaded", () =>{
    const btnIngresar = document.getElementById("btn-ingresar");
    const inputNombre = document.getElementById("nombre-cliente");

    const ingresar = () => {
        const nombre = inputNombre.value.trim();

        if(nombre === ""){
            alert("Ingrese su nombre para continuar.");
            return
        }

        guardarNombre(nombre)
        window.location.href = "pages/productos.html";
    };

    btnIngresar.addEventListener("click", ingresar)

    //ENTER = INGRESAR
    inputNombre.addEventListener("keydown", (e) => {
        if(e.key === "Enter") ingresar;
    });

});