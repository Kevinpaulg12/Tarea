class Client {
    constructor(first_name = "Consumidor", last_name = "Final", dni = "9999999999") {
        this.first_name = first_name;
        this.last_name = last_name;
        this._dni = dni;
    }

    get dni() {
        return this._dni;
    }

    set dni(value) {
        if (value.length === 10 || value.length === 13) {
            this._dni = value;
        } else {
            this._dni = "9999999999";
        }
    }

    fullName() {
        return `${this.first_name} ${this.last_name}`;
    }

    show() {
        alert(`   Nombres    Dni\n${this.fullName()}  ${this.dni}`);
    }
}

class RegularClient extends Client {
    constructor(first_name = "Cliente", last_name = "Final", dni = "9999999999", card = false) {
        super(first_name, last_name, dni);
        this._discount = card ? 0.10 : 0;
    }

    get discount() {
        return this._discount;
    }

    show() {
        alert(`Cliente Minorista: DNI:${this.dni} Nombre:${this.first_name} ${this.last_name} Descuento:${this.discount * 100}%`);
    }

    getJson() {
        return {"dni": this.dni, "nombre": this.first_name, "apellido": this.last_name, "valor": this.discount};
    }
}

class VipClient extends Client {
    constructor(first_name = "Consumidor", last_name = "Final", dni = "9999999999") {
        super(first_name, last_name, dni);
        this._limit = 10000;
    }

    get limit() {
        return this._limit;
    }

    set limit(value) {
        if (value >= 10000 && value <= 20000) {
            this._limit = value;
        }
    }

    show() {
        alert(`Cliente Vip: DNI:${this.dni} Nombre: ${this.first_name} ${this.last_name} Cupo: ${this.limit}`);
    }

    getJson() {
        return {"dni": this.dni, "nombre": this.first_name, "apellido": this.last_name, "valor": this.limit};
    }
}

let regular_cli1 = new RegularClient();
let regular_cli2 = new RegularClient("Daniel", "Vera", "0914122419", true);
let vip_cli1 = new VipClient("Erick", "Vera", "0914122412");
let vip_cli2 = new VipClient("Yadira", "Bohorquez", "0914122411");
vip_cli2.limit = 15000;
let clients = [regular_cli1, regular_cli2, vip_cli1, vip_cli2];
for (let cli of clients) cli.show();
