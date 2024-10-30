"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usuario_scheme_1 = __importDefault(require("./usuario.scheme"));
// Define el esquema para Especialista
const esquema = new mongoose_1.default.Schema({
    especialidades: [
        {
            id: { type: String, required: false },
            especialidad: { type: String, required: true },
        }
    ],
});
// Crea el modelo discriminador para Especialista
const EspecialistaModel = usuario_scheme_1.default.discriminator('especialista', esquema);
exports.default = EspecialistaModel;
//# sourceMappingURL=especialista.scheme.js.map