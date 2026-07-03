const e = require("express");

window.addEventListener("DOMContentLoaded", () =>{
    const btnIngresar = document.getElementById("btn-ingresar");
    const inputNombre = document.getElementById("nombre-cliente");

    btnIngresar.addEventListener("click",() => {
        const nombre = inputNombre.value.trim();

        if(nombre === ""){
            alert("Ingrese su nombre para continuar.");
            return
        }

        sessionStorage.setItem("nombre-cliente",nombre);

        window.location.href = "pages/productos.html";
    });

    inputNombre.addEventListener("keydown", (e) => {
        if(e.key === "Enter") btnIngresar.click();
    });

});