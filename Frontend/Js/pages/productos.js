window.addEventListener("DOMContentLoaded",() =>{
    const btnBebidas = document.getElementById("btn-filtro-bebidas");
    const btnHielo = document.getElementById("btn-filtro-hielo");
    const secBebidas = document.getElementById("bebidas");
    const secHielo = document.getElementById("hielo");

    function mostrarBebidas(){
        secBebidas.style.display = "block"
        secHielo.style.display = "none"
    }

})
