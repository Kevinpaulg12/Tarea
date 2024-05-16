class Company {
    static next = 0;  // Variable de clase(estatica) para almacenar el próximo ID disponible

    constructor(name = "SuperMaxi", ruc = "0943213456001") {
        // Incrementa el contador de ID para cada nueva instancia
        Company.next += 1;
        // variables de instancias
        this._id = Company.next;  // Asigna el ID único a la instancia actual privada
        this.business_name = name;  // Asigna el nombre de la empresa a la instancia actual
        this.ruc = ruc;  // Asigna el RUC de la empresa a la instancia actual
    }

    // metodo de usuraio que muestra la información de la empresa (ID, nombre y RUC)
    show() {
        return `Id:${this._id} Empresa: ${this.business_name} ruc:${this.ruc}`;
    }

    getJson() {
        return {"id": this._id, "rasonsocial": this.business_name, "ruc": this.ruc};
    }

    static get_business_name() {
        return "Empresa:Corporacion el Rosado ruc:0876543294001";
    }
}

let comp1 = new Company("SuperMaxi");
let comp2 = new Company(undefined, "9999999999001");

let infoDiv1 = document.getElementById('info1');
let infoDiv2 = document.getElementById('info2');
// Más elementos aquí
infoDiv1.innerHTML = comp1.show();
infoDiv2.innerHTML = comp2.show();
// Asigna la información a más elementos aquí
