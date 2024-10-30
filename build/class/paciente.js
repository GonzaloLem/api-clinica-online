"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
const usuario_1 = require("./usuario");
class Paciente extends usuario_1.Usuario {
    constructor(email, password, nombre, apellido, dni, edad, foto, obraSocial, id) {
        super(email, password, nombre, apellido, dni, edad, foto, id);
        this.obraSocial = obraSocial !== null && obraSocial !== void 0 ? obraSocial : "";
        this.tipo = "paciente";
    }
    get ObraSocial() {
        return this.obraSocial;
    }
}
exports.Paciente = Paciente;
//# sourceMappingURL=paciente.js.map