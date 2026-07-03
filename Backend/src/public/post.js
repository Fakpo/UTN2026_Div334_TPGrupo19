const contenedorProductos = document.getElementById("contenedor-productos");
const postProductForm = document.getElementById("postProduct-form");

postProductForm.addEventListener("submit", async event => {
    event.preventDefault();

    const idProd = event.target.idProd.value.trim();

    try {
        const response = fetch(`http://localhost:3000/api/products/${idProd}`)

        const datos = await response.json();

        const producto = datos.payload[0];

    } catch (error) {
        console.log("Error al obtener el producto");
        
    }
})