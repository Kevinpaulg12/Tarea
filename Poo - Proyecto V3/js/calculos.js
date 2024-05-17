// En JavaScript, no existen las clases abstractas de forma nativa como en Python. Sin embargo, podemos simular su comportamiento.
class Icalculo {
    constructor() {
        if (new.target === Icalculo) {
            throw new TypeError("No puedes instanciar la clase abstracta 'Icalculo'");
        }
    }

    cal_iva(iva = 0.12, valor = 0) {
        throw new Error("Debes implementar el método 'cal_iva'");
    }

    cal_discount(valor = 0, discount = 0) {
        throw new Error("Debes implementar el método 'cal_discount'");
    }
}

// let ical = new Icalculo(); // Esto lanzará un error