import { application } from "express";

const contenedorProductos = document.getElementById("contenedor-productos");
const postProductForm = document.getElementById("postProduct-form");

// postProductForm.addEventListener("submit", async event => {
//     event.preventDefault();

//     const idProd = event.target.idProd.value.trim();

//     try {
//         const response = fetch(`http://localhost:3000/api/products/${idProd}`)

//         const datos = await response.json();

//         const producto = datos.payload[0];

//     } catch (error) {
//         console.log("Error al obtener el producto");
        
//     }
// })

postProductForm.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    const data = Object.fromEntries(formData.entries());

    try {
        const url= `https:/localhost:3000/api/products`
        const response = fetch(url , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        console.log(result.message);
    } catch (error) {
        console.log("Error al enviar los datos", error);
    }
})