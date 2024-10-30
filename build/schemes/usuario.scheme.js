"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const node_path_1 = __importDefault(require("node:path"));
// Define el esquema base del usuario
const esquema = new mongoose_1.default.Schema({
    nombre: String,
    apellido: String,
    dni: String,
    edad: Number,
    email: String,
    password: String,
    tipo: {
        type: String,
        enum: ["usuario", "especialista", "paciente", "administrador"],
        required: true
    },
    urlImagen: String
});
// Middleware para asignar el ID al nombre de la imagen antes de guardar el usuario
esquema.pre('save', function (next) {
    if (this.isNew) { // Solo si es un nuevo documento
        const id = this._id.toString(); // Obtener el ID del documento
        this.urlImagen = `${id + node_path_1.default.extname(this.urlImagen)}`; // Actualizar el campo urlImagen con la nueva ruta
    }
    next();
});
// Crea el modelo base de usuario
const UsuarioModel = mongoose_1.default.model('usuarios', esquema);
exports.default = UsuarioModel;
//# sourceMappingURL=usuario.scheme.js.map