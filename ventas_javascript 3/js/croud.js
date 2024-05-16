class CrudClients {
    constructor() {
        this.storage = new LocalStorageFile('clientes');
    }

    create() {
        let dni = document.getElementById('dni').value;
        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let num_telef = document.getElementById('num_telef').value;

        // Verificar que el DNI y el número de teléfono tengan 10 dígitos y sean números enteros positivos
        if (!/^\d{10}$/.test(dni) || !/^\d{10}$/.test(num_telef)) {
            alert("El DNI y el número de teléfono deben tener 10 dígitos y ser números enteros positivos.");
            return;
        }

        let clientes = this.storage.read();

        // Verificar que el DNI no exista ya
        for (let cliente of clientes) {
            if (cliente["dni"] === dni) {
                alert("Ya existe un cliente con ese DNI.");
                return;
            }
        }

        let nuevo_cliente = {"dni": dni, "nombre": nombre, "apellido": apellido, "num_telef": num_telef};
        
        clientes.push(nuevo_cliente);
        this.storage.save(clientes);
        
        alert("Cliente creado satisfactoriamente");
    }

    update() {
        let dni = document.getElementById('dni-actualizar').value;
        let num_telef = document.getElementById('telefono-actualizar').value;

        // Verificar que el número de teléfono tenga 10 dígitos y sea un número entero positivo
        if (!/^\d{10}$/.test(num_telef)) {
            alert("El número de teléfono debe tener 10 dígitos y ser un número entero positivo.");
            return;
        }

        let clientes = this.storage.read();
        for (let cliente of clientes) {
            if (cliente["dni"] == dni) {
                cliente["num_telef"] = num_telef;
            }
        }
        this.storage.save(clientes);

        alert("Numero de telefono actualizado satisfactoriamente");
    }

    delete() {
        let dni = document.getElementById('dni-eliminar').value;

        // Verificar que el DNI tenga 10 dígitos y sea un número entero positivo
        if (!/^\d{10}$/.test(dni)) {
            alert("El DNI debe tener 10 dígitos y ser un número entero positivo.");
            return;
        }

        let clientes = this.storage.read();
        let clienteExistente = clientes.find(cliente => cliente['dni'] === dni);

        // Verificar que el DNI exista
        if (!clienteExistente) {
            alert("No existe un cliente con ese DNI.");
            return;
        }

        let clientesActualizados = clientes.filter(cliente => cliente['dni'] !== dni);
        this.storage.save(clientesActualizados);

        alert("Cliente eliminado satisfactoriamente");
    }

    consult() {
        let clientes = this.storage.read();
        let tableBody = document.querySelector("#formulario-consultar tbody");
        tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

        for (let cliente of clientes) {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${cliente['dni']}</td>
                <td>${cliente['nombre']}</td>
                <td>${cliente['apellido']}</td>
                <td>${cliente['num_telef']}</td>
            `;
            tableBody.appendChild(row);
        }

        return clientes;
    }
}

let crudClients = new CrudClients();

// Agrega las funciones al objeto window
window.createCliente = () => crudClients.create();
window.updateCliente = () => crudClients.update();
window.deleteCliente = () => crudClients.delete();
window.consultClientes = () => {
    crudClients.consult(); // Asegúrate de que esta función se ejecute cuando se haga clic en el botón "Consultar Clientes"
};


class CrudProducts {
    constructor() {
        this.storage = new LocalStorageFile('productos');
    }

    // Agrega una nueva función para validar los campos de entrada
    validateInput(id, stock, precio) {
        if (!id || !stock || !precio) {
            alert("Todos los campos son obligatorios.");
            return false;
        }

        if (!/^\d+$/.test(id) || !/^\d+$/.test(stock)) {
            alert("El id y el stock deben ser números enteros positivos.");
            return false;
        }

        if (!/^\d+(\.\d+)?$/.test(precio)) {
            alert("El precio debe ser un número positivo.");
            return false;
        }

        return true;
    }

    create() {
        let id = document.getElementById('id').value;
        let descrip = document.getElementById('producto').value;
        let precio = document.getElementById('precio').value;
        let stock = document.getElementById('stock').value;

        if (!this.validateInput(id, stock, precio)) {
            return;
        }

        let productos = this.storage.read();

        // Verificar si ya existe un producto con el mismo ID
        let productoExistente = productos.find(producto => producto['id'] === id);
        if (productoExistente) {
            alert("Ya existe un producto con ese ID.");
            return;
        }

        let nuevo_producto = new Product(id, descrip, precio, stock);
        productos.push(nuevo_producto.getJson());
        this.storage.save(productos);
        
        alert("Producto creado satisfactoriamente");

        // Limpia los campos de entrada después de crear un producto
        document.getElementById('id').value = '';
        document.getElementById('producto').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('stock').value = '';

        // Actualiza la tabla de productos
        this.consult();
    }

    update() {
        let id = document.getElementById('id-actualizar').value;
        let stock = document.getElementById('stock-actualizar').value;

        // Verificar que el id y el stock sean números enteros positivos
        if (!id || !stock) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (!/^\d+$/.test(id) || !/^\d+$/.test(stock)) {
            alert("El id y el stock deben ser números enteros positivos.");
            return;
        }

        let productos = this.storage.read();
        let producto = productos.find(producto => producto['id'] === id);
        if (!producto) {
            alert("No se encontró el producto con el ID proporcionado.");
            return;
        }

        let productoActualizado = new Product(producto.id, producto.descripcion, producto.precio, stock);
        productos = productos.map(prod => prod.id === id ? productoActualizado.getJson() : prod);
        this.storage.save(productos);

        alert("Stock actualizado satisfactoriamente");

        // Actualiza la tabla de productos
        this.consult();
    }

    delete() {
        let id = document.getElementById('id-eliminar').value;

        // Verificar que el id sea un número entero positivo
        if (!id) {
            alert("El id es obligatorio.");
            return;
        }

        if (!/^\d+$/.test(id)) {
            alert("El id debe ser un número entero positivo.");
            return;
        }

        let productos = this.storage.read();
        let productoExistente = productos.find(producto => producto['id'] === id);

        // Verificar que el id exista
        if (!productoExistente) {
            alert("No existe un producto con ese id.");
            return;
        }

        let productosActualizados = productos.filter(producto => producto['id'] !== id);
        this.storage.save(productosActualizados);

        alert("Producto eliminado satisfactoriamente");

        // Actualiza la tabla de productos
        this.consult();
    }

    consult() {
        let productos = this.storage.read();
        let tableBody = document.querySelector("#formulario-consultar tbody");
        tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

        for (let producto of productos) {
            let prod = new Product(producto.id, producto.descripcion, producto.precio, producto.stock);
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${prod._id}</td>
                <td>${prod.descrip}</td>
                <td>${prod.preci}</td>
                <td>${prod._stock}</td>
            `;
            tableBody.appendChild(row);
        }

        return productos;
    }
}

let crudProducts = new CrudProducts();

window.createProducto = () => crudProducts.create();
window.updateProducto = () => crudProducts.update();
window.deleteProducto = () => crudProducts.delete();
window.consultProductos = () => crudProducts.consult();

// Carga los productos cuando se carga la página
window.onload = () => crudProducts.consult();
