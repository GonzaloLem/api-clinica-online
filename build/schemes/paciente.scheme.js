"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Define el esquema para Paciente
const mongoose_1 = __importDefault(require("mongoose"));
const usuario_scheme_1 = __importDefault(require("./usuario.scheme"));
const esquema = new mongoose_1.default.Schema({
    obraSocial: String, // Campo adicional para Paciente
});
// Crea el modelo discriminador para Paciente
const PacienteModel = usuario_scheme_1.default.discriminator('paciente', esquema);
exports.default = PacienteModel;
//# sourceMappingURL=paciente.scheme.js.map