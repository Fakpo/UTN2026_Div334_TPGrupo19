const deleteProduct = document.getElementById("deleteProduct-button")

deleteProduct.addEventListener("click", async event => {
    event.stopPropagation;

    const confirmacion = confirm("¿Queres eliminar este producto?");

    if(!confirmacion) {
        alert ("eliminacion cancelada");
    } else {
        eliminarProducto(producto.id)
    }
});

async function eliminarProducto(id) {
    try {
        const response = await fetch(`https://localhost:3000/api/products/${id}`,{
            method: "DELETE"
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);

            

            // contenedor productos.innerhtml = ""
        } else {
            console.log("Error: ", result.message);
            alert("No se pudo eliminar el producto");
            
        }

    } catch (error) {
        console.log("Error en la solccitud DELETE ", eroor);
        
    }
};