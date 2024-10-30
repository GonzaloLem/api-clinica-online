"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertarEspecialidadAEspecialista = void 0;
const especialista_scheme_1 = __importDefault(require("../schemes/especialista.scheme"));
const insertarEspecialidadAEspecialista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jsonEspecialidad = JSON.parse(req.body.especialidad);
        const especialistaActualizado = yield especialista_scheme_1.default.findByIdAndUpdate(req.params.id, { $push: { especialidades: jsonEspecialidad } }, { new: true });
        if (!especialistaActualizado) {
            throw new Error('Especialista no encontrado');
        }
        return res.status(200).json({ status: true, message: 'Especialidad agregada correctamente.' });
    }
    catch (error) {
        console.error("Error al insertar el turno:", error.message);
        return res.status(400).json({ status: false, message: 'Error al insertar el la especialidad.' });
    }
});
exports.insertarEspecialidadAEspecialista = insertarEspecialidadAEspecialista;
//# sourceMappingURL=especialista.controller.js.map