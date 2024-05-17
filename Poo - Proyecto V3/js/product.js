class Product {
    constructor(id = 0, descrip = "Ninguno", preci = 0, stock = 0) {
        this._id = id;
        this.descrip = descrip;
        this.preci = preci;
        this._stock = stock;
    }

    get stock() {
        return this._stock;
    }

    toString() {
        return `Producto:${this._id} ${this.descrip} ${this.preci} ${this.stock}`;
    }

    getJson() {
        return {"id": this._id, "descripcion": this.descrip, "precio": this.preci, "stock": this.stock};
    }

    show() {
        alert(`${this._id}  ${this.descrip}           ${this.preci}  ${this.stock}`);
    }
}
