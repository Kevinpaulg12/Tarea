class LocalStorageFile {
    constructor(filename) {
        this.filename = filename;
    }

    save(data) {
        localStorage.setItem(this.filename, JSON.stringify(data, null, 2));  // Indentación para una mejor legibilidad
    }

    read() {
        let data;
        try {
            data = JSON.parse(localStorage.getItem(this.filename));
        } catch (error) {
            data = [];
        }
        // Si data es null, devolver un array vacío
        return data ? data : [];
    }

    find(attribute, value) {
        let data;
        try {
            let datas = JSON.parse(localStorage.getItem(this.filename));
            data = datas.filter(item => item[attribute] === value);
        } catch (error) {
            data = [];
        }
        return data;
    }

    update(updatedRecord) {
        let data = this.read();
        // Encuentra el índice del registro que deseas actualizar
        for (let i = 0; i < data.length; i++) {
            if (data[i]['factura'] === updatedRecord['factura']) {
                // Actualiza el registro con los nuevos datos
                data[i] = updatedRecord;
                break;
            }
        }
        // Guarda los datos actualizados en localStorage
        this.save(data);
    }

    delete(clientToDelete) {
        let clients = this.read();
        let updatedClients = clients.filter(client => client['dni'] !== clientToDelete['dni']);
        this.save(updatedClients);
    }

    deleteProduct(productToDelete) {
        let products = this.read();
        let updatedProducts = products.filter(product => product['id'] !== productToDelete['id']);
        this.save(updatedProducts);
    }

    deleteSale(saleToDelete) {
        let sales = this.read();
        let updatedSales = sales.filter(sale => sale['factura'] !== saleToDelete['factura']);
        this.save(updatedSales);
    }
}
