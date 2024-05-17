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



class CrudSales {
    constructor() {
        this.storage = new LocalStorageFile('ventas');
        this.productStorage = new LocalStorageFile('productos');
        this.clientStorage = new LocalStorageFile('clientes');
    }

    create() {
        let factura = document.getElementById('factura').value;
        let dni = document.getElementById('dni').value;
    
        let ventas = this.storage.read();
        let ventaExistente = ventas.find(venta => venta['factura'] === factura);
        if (ventaExistente) {
            alert("Ya existe una factura con ese ID.");
            return;
        }
    
        let clients = this.clientStorage.read();
        let client = clients.find(client => client['dni'] === dni);
        if (!client) {
            alert("Cliente no existe");
            return;
        }
        // Crear una nueva instancia de Client con los datos del cliente
        client = new RegularClient(client.nombre, client.apellido, client.dni);
    
        let sale = new Sale(client, factura); // Pasar el ID de la factura al constructor
    
        // Recoger los datos de todos los campos de producto y cantidad
        let productos = document.querySelectorAll('.producto-adicional');
        let cantidades = document.querySelectorAll('.cantidad-adicional');
    
        for (let i = 0; i < productos.length; i++) {
            let id_producto = productos[i].value;
            let qty = cantidades[i].value;

        // Comprobar si el producto ya ha sido añadido
        for (let j = 0; j < i; j++) {
            if (productos[j].value === id_producto) {
                alert("No puedes ingresar 2 productos iguales.");
                return;
            }
        }
    
            let products = this.productStorage.read();
            let product = products.find(product => product['id'] === id_producto);
            if (!product) {
                alert("Producto no encontrado.");
                return;
            }
            // Crear una nueva instancia de Product con los datos del producto
            product = new Product(product.id, product.descripcion, product.precio, product.stock);
    
            sale.add_detail(product, qty);
        }
    
        ventas.push(sale.getJson());
        this.storage.save(ventas);
        
        alert("Venta registrada satisfactoriamente");
    
        // Actualiza la tabla de ventas
        this.consult();
    
        limpiarCampos();
    }

    update() {
        let factura = document.getElementById('factura-actualizar').value;
    
        let ventas = this.storage.read();
        let ventaIndex = ventas.findIndex(venta => venta['factura'] === factura);
        if (ventaIndex === -1) {
            alert("No se encontró una factura con ese ID.");
            return;
        }
    
        // Añadir producto
        if (document.getElementById('addProductFields').style.display !== 'none') {
            let idProducto = document.getElementById('idProducto').value;
            let cantidad = document.getElementById('cantidad').value;
    
            let products = this.productStorage.read();
            let product = products.find(product => product['id'] === idProducto);
            if (!product) {
                alert("Producto no encontrado.");
                return;
            }
    
            ventas[ventaIndex]['detalle'].push({
                "id": product.id,
                "poducto": product.descripcion,
                "precio": product.precio,
                "cantidad": cantidad
            });
    
            // Actualizar los cálculos de la factura
            ventas[ventaIndex]['subtotal'] += product.precio * cantidad;
            ventas[ventaIndex]['iva'] = ventas[ventaIndex]['subtotal'] * 0.12; // Asumiendo un IVA del 12%
            ventas[ventaIndex]['total'] = ventas[ventaIndex]['subtotal'] + ventas[ventaIndex]['iva'];
        }
    
        // Eliminar producto
        if (document.getElementById('removeProductField').style.display !== 'none') {
            let idProductoEliminar = (document.getElementById('idProducto').value);
    
            // Comprobar si el producto está en la factura
            let index = ventas[ventaIndex]['detalle'].findIndex(detalle => detalle['id'] === idProductoEliminar);
            if (index == -1) {
                alert("No se encontró este producto en la factura.");
                return;
            }
    
            // Actualizar los cálculos de la factura
            let detalle = ventas[ventaIndex]['detalle'][index];
            ventas[ventaIndex]['subtotal'] -= detalle['precio'] * detalle['cantidad'];
            ventas[ventaIndex]['iva'] = ventas[ventaIndex]['subtotal'] * 0.12; // Asumiendo un IVA del 12%
            ventas[ventaIndex]['total'] = ventas[ventaIndex]['subtotal'] + ventas[ventaIndex]['iva'];
    
            ventas[ventaIndex]['detalle'].splice(index, 1);
        }
    
        this.storage.save(ventas);
    
        alert("Factura actualizada satisfactoriamente");
    
        // Actualiza la tabla de ventas
        this.consult();
    }
    
    
    
    
    delete() {
        let facturaElement = document.getElementById('factura-eliminar');
        if (!facturaElement) {
            alert("No se encontró el elemento con el ID 'factura-eliminar'.");
            return;
        }
        
        let factura = facturaElement.value;
    
        let ventas = this.storage.read();
        let index = ventas.findIndex(venta => venta['factura'] === factura);
        if (index === -1) {
            alert("No se encontró una factura con ese ID.");
            return;
        }
    
        ventas.splice(index, 1);
    
        this.storage.save(ventas);
    
        alert("Factura eliminada satisfactoriamente");
    
        // Actualiza la tabla de ventas
        this.consult();
    }

    consult() {
        let idFactura = document.getElementById('factura-consultar-id').value;
        let ventas = this.storage.read();
        let tableBody = document.querySelector("#formulario-consultar tbody");
        tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos
    
        if (idFactura) {
            // Si se proporciona un ID de factura, buscar la factura correspondiente
            let venta = ventas.find(venta => venta['factura'] === idFactura);
            if (!venta) {
                alert("No se encontró una factura con ese ID.");
                return;
            }
            ventas = [venta]; // Mostrar solo la factura encontrada
        }
    
        for (let venta of ventas) {
            if (venta && venta['detalle']) {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td rowspan="${venta['detalle'].length}">${venta['factura']}</td>
                    <td rowspan="${venta['detalle'].length}">${venta['Fecha']}</td>
                    <td rowspan="${venta['detalle'].length}">${venta['cliente']}</td>
                    <td>${venta['detalle'][0]['poducto']}</td>
                    <td>${venta['detalle'][0]['cantidad']}</td>
                    <td>${venta['detalle'][0]['precio']}</td>
                    <td rowspan="${venta['detalle'].length}">${venta['iva']}</td>
                    <td rowspan="${venta['detalle'].length}">${venta['subtotal']}</td>
                    <td rowspan="${venta['detalle'].length}">${venta['total']}</td>
                `;
                tableBody.appendChild(row);
    
                for (let i = 1; i < venta['detalle'].length; i++) {
                    let detalleRow = document.createElement("tr");
                    detalleRow.innerHTML = `
                        <td>${venta['detalle'][i]['poducto']}</td>
                        <td>${venta['detalle'][i]['cantidad']}</td>
                        <td>${venta['detalle'][i]['precio']}</td>
                    `;
                    tableBody.appendChild(detalleRow);
                }
            }
        }
    }
    
    
}

let crudSales = new CrudSales();

window.createVenta = () => crudSales.create();
window.updateVenta = () => crudSales.update();
window.deleteVenta = () => crudSales.delete();
window.consultVentas = () => crudSales.consult();


// FUNCIONES ADICIONALES

let contadorProductos = 1; // Contador para los productos adicionales

window.añadirProducto = () => {
    
    contadorProductos += 1; // Incrementar el contador cada vez que se añade un producto

    let productosAdicionales = document.getElementById('productos-adicionales');

    let productoDiv = document.createElement('div');
    productoDiv.className = 'container';

    let productoLabel = document.createElement('label');
    productoLabel.for = 'producto-adicional';
    productoLabel.textContent = 'Producto #' + contadorProductos + ':'; // Añadir el número de orden al texto de la etiqueta

    let productoInput = document.createElement('input');
    productoInput.type = 'text';
    productoInput.id = 'producto-adicional';
    productoInput.name = 'producto-adicional';
    productoInput.className = 'producto-adicional'; // Agregar esta línea
    productoInput.className = 'producto-adicional producto-adicional-verde'; // Agregar la clase 'producto-adicional-verde'

    let cantidadLabel = document.createElement('label');
    cantidadLabel.for = 'cantidad-adicional';
    cantidadLabel.textContent = 'Cantidad:';

    let cantidadInput = document.createElement('input');
    cantidadInput.type = 'text';
    cantidadInput.id = 'cantidad-adicional';
    cantidadInput.name = 'cantidad-adicional';
    cantidadInput.className = 'cantidad-adicional'; // Agregar esta línea
    cantidadInput.className = 'cantidad-adicional producto-adicional-verde'; // Agregar la clase 'producto-adicional-verde'

    productoDiv.appendChild(productoLabel);
    productoDiv.appendChild(productoInput);
    productoDiv.appendChild(cantidadLabel);
    productoDiv.appendChild(cantidadInput);

    productosAdicionales.appendChild(productoDiv);

    actualizarNumerosProducto(); // Actualizar los números de los productos
};

window.eliminarProducto = () => {
    let productosAdicionales = document.getElementById('productos-adicionales');
    if (productosAdicionales.lastChild) {
        productosAdicionales.removeChild(productosAdicionales.lastChild);
    }
    actualizarNumerosProducto(); // Actualizar los números de los productos
};
