//CAMBIOS DE TEMA CLARO / OSCURO
export const iniciartema = () =>{
    const temaGuardado = localStorage.getItem("tema");
    if(temaGuardado === "claro"){
        document.body.classList.add("tema-claro");
    }

    const btn = document.getElementById("btn-tema");
    if (!btn) return;

    //Actualiza el text del boton segun tema
    btn.textContent = document.body.classList.contains("tema-claro") ? "Oscuro" : "Claro";

    btn.addEventListener("click", () =>{
        document.body.classList.toggle("tema-claro")
        const temaActual = document.body.classList.contains("tema-claro") ? "Claro" : "Oscuro"
        localStorage.setItem("tema", temaActual); //queda guardado cuando se recarga
        btn.textContent = temaActual === "Claro" ? "Oscuro" : "Claro"
    })
}