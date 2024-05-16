class SaleDetail {
    static line = 0;

    constructor(product, quantity) {
        SaleDetail.line += 1;
        this._id = SaleDetail.line;
        this.product = product;
        this.preci = product.preci;
        this.quantity = quantity;
    }

    get id() {
        return this._id;
    }

    toString() {
        return `${this.id} ${this.product.descrip} ${this.preci} ${this.quantity}`;
    }
}

class Sale {
    static next = 0;
    static FACTOR_IVA = 0.12;

    constructor(client) {
        Sale.next += 1;
        this._invoice = Sale.next;
        this.date = new Date();
        this.client = client;
        this.subtotal = 0;
        this.percentage_discount = client.discount;
        this.discount = 0;
        this.iva = 0;
        this.total = 0;
        this.sale_detail = [];
    }

    get invoice() {
        return this._invoice;
    }

    toString() {
        return `Factura# ${this.invoice} ${this.date} ${this.client.fullName()} ${this.total}`;
    }

    cal_iva(iva = 0.12, valor = 0) {
        return Math.round(valor * iva * 100) / 100;
    }

    cal_discount(valor = 0, discount = 0) {
        return valor * discount;
    }

    add_detail(prod, qty) {
        let detail = new SaleDetail(prod, qty);
        this.subtotal += Math.round(detail.preci * detail.quantity * 100) / 100;
        this.discount = this.cal_discount(this.subtotal, this.percentage_discount);
        this.iva = this.cal_iva(Sale.FACTOR_IVA, this.subtotal - this.discount);
        this.total = Math.round((this.subtotal + this.iva - this.discount) * 100) / 100;
        this.sale_detail.push(detail);
    }

    //print_invoice(company) {
    //    console.log("*".repeat(70));
    //    console.log(`Empresa: ${company.business_name} Ruc: ${company.ruc} Factura#: ${this.invoice.padEnd(7)} Fecha: ${this.date}`);
    //    this.client.show();
    //    console.log("*".repeat(70));
    //    console.log("Linea Articulo Precio Cantidad Subtotal");
    //    for (let det of this.sale_detail) {
    //        console.log(`${det.id.toString().padEnd(5)} ${det.product.descrip.padEnd(6)} ${det.preci.toString().padEnd(7)} ${det.quantity.toString().padEnd(2)} ${(det.preci * det.quantity).toString().padStart(14)}`);
    //    }
    //    console.log("*".repeat(70));
    //    console.log(" ".repeat(23), "Subtotal:  ", this.subtotal);
    //    console.log(" ".repeat(23), "Descuento: ", this.discount);
    //    console.log(" ".repeat(23), "Iva:       ", this.iva);
    //    console.log(" ".repeat(23), "Total:     ", this.total);
    //}

    getJson() {
        let invoice = {
            "factura": this.invoice,
            "Fecha": this.date.toISOString().split('T')[0],
            "cliente": this.client.fullName(),
            "subtotal": this.subtotal,
            "descuento": this.discount,
            "iva": this.iva,
            "total": this.total,
            "detalle": []
        };
        for (let det of this.sale_detail) {
            invoice["detalle"].push({
                "poducto": det.product.descrip,
                "precio": det.preci,
                "cantidad": det.quantity
            });
        }
        return invoice;
    }
}