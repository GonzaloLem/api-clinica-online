"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const node_path_1 = __importDefault(require("node:path"));
const esquema = new mongoose_1.default.Schema({
    especialidad: String,
    urlImagen: { type: String, require: false }
});
esquema.pre('save', function (next) {
    if (this.isNew) {
        const id = this._id.toString();
        this.urlImagen = `${id + node_path_1.default.extname(this.urlImagen)}`; // Actualizar el campo urlImagen con la nueva ruta
    }
    next();
});
const EspecialidadModel = mongoose_1.default.model('especialidades', esquema);
exports.default = EspecialidadModel;
//# sourceMappingURL=especialidad.scheme.js.map