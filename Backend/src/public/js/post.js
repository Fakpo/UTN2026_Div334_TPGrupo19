    // 1. Escuchamos el evento 'submit' cuando se envía el formulario
    document.getElementById('formCrearProducto').addEventListener('submit', async (evento) => {
        evento.preventDefault(); // Evita que la página se recargue por defecto

        // 2. Agarramos el formulario de la pantalla
        const formulario = evento.target;
        const formData = new FormData(formulario);
        
        // 3. Armamos el objeto EXACTO con los nombres que espera tu backend (req.body)
        const nuevoProducto = {
            nombre: formData.get('nombre').trim(),
            imagen: formData.get('imagen'),
            categoria: parseInt(formData.get('categoria')),       // Lo pasa a número (id_categoria)
            precio: parseFloat(formData.get('precio')),           // Lo pasa a decimal (float)
            estadoActivo: parseInt(formData.get('estadoActivo'))  // Lo pasa a 1 o 0
        };

        try {
            // 4. Enviamos la petición por FETCH POST a tu controlador
            // (Ajustá la URL '/api/products/productos' según cómo tengas nombrada tu ruta en Express)
            const respuesta = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Le avisamos al Back que va un JSON limpio
                },
                body: JSON.stringify(nuevoProducto) // Transformamos el objeto a texto string
            });

            // 5. Esperamos la respuesta en formato JSON de tu controlador
            const data = await respuesta.json();

            if (respuesta.ok) {
                // Si el backend respondió con un estatus 200 o 201 (Éxito)
                alert('¡Producto creado con éxito!');
                console.log('Respuesta del servidor:', data);
                formulario.reset(); // Limpia los campos del formulario para poder cargar otro
            } else {
                // Si el backend rebotó la petición (ej: estatus 400 de datos inválidos)
                alert('Error al crear el producto: ' + (data.message || 'Datos inválidos'));
                console.error('Detalle del error:', data);
            }

        } catch (error) {
            // Por si el servidor está apagado o no hay internet
            console.error('Error de red/conexión:', error);
            alert('No se pudo conectar con el servidor backend.');
        }
    });
