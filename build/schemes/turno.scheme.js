"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const esquema = new mongoose_1.default.Schema({
    especialista: { _id: String, nombre: String, apellido: String },
    paciente: { _id: String, nombre: String, apellido: String },
    especialidad: { _id: String, especialidad: String },
    estado: {
        type: String,
        enum: ["pendiente", "realizado", "cancelado", "rechazado"],
        required: true
    },
    fecha: Date
});
// Crea el modelo base de usuario
const TurnoModel = mongoose_1.default.model('turnos', esquema);
exports.default = TurnoModel;
//# sourceMappingURL=turno.scheme.js.map