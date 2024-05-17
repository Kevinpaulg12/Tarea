class ICrud {
    constructor() {
        if (new.target === ICrud) {
            throw new TypeError("No puedes instanciar la clase abstracta 'ICrud'");
        }
    }

    create() {
        throw new Error("Debes implementar el método 'create'");
    }

    update() {
        throw new Error("Debes implementar el método 'update'");
    }

    delete() {
        throw new Error("Debes implementar el método 'delete'");
    }

    consult() {
        throw new Error("Debes implementar el método 'consult'");
    }
}
