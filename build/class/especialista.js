"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Especialista = void 0;
const usuario_1 = require("./usuario");
class Especialista extends usuario_1.Usuario {
    constructor(email, password, nombre, apellido, dni, edad, foto, especialidades, id) {
        super(email, password, nombre, apellido, dni, edad, foto, id);
        this.especialidades = especialidades !== null && especialidades !== void 0 ? especialidades : [];
        this.tipo = "especialista";
    }
    get Especialidades() {
        return this.especialidades;
    }
}
exports.Especialista = Especialista;
//# sourceMappingURL=especialista.js.map