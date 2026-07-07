//CAMBIOS DE TEMA CLARO / OSCURO
export const iniciarTema = () =>{
    const checkbox = document.querySelector(".checkbox");
    if (!checkbox) return;

    const temaGuardado = localStorage.getItem("tema");
    if(temaGuardado === "claro"){
        document.body.classList.add("tema-claro");
        checkbox.checked = true;
    }

    checkbox.addEventListener("change", () =>{  //Cambia los temas
        if (checkbox.checked) {
            document.body.classList.add("tema-claro");
            localStorage.setItem("tema", "claro");
        } else {
            document.body.classList.remove("tema-claro");
            localStorage.setItem("tema", "oscuro");
        }
    })
}