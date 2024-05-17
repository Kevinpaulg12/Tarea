// clientes.js

// Esta función maneja la creación de un nuevo cliente
async function crearCliente(datosCliente) {
    try {
        const respuesta = await fetch('/crear_cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosCliente)
        });

        if (respuesta.ok) {
            const datos = await respuesta.json();
            // Manejar la respuesta del servidor
        } else {
            throw new Error('Error al crear cliente');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Ejemplo de uso
const nuevoCliente = {
    dni: '1234567890',
    nombre: 'Juan',
    apellido: 'Pérez',
    num_telef: '987654321'
};

crearCliente(nuevoCliente);