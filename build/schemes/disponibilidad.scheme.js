"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const esquema = new mongoose_1.default.Schema({
    id_especialidad: String,
    id_especialista: String,
    horarios: [
        {
            dia: {
                type: String,
                enum: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
                required: true
            },
            entrada: { type: String, required: true },
            salida: { type: String, required: true },
        }
    ],
});
const DisponibilidadModel = mongoose_1.default.model('disponibilidades', esquema);
exports.default = DisponibilidadModel;
//# sourceMappingURL=disponibilidad.scheme.js.map