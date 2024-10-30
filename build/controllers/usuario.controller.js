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
exports.obtenerListadoEspecialistas = exports.obtenerUsuarios = exports.obtenerListadoUsuarios = exports.obtenerUsuarioPorEmail = void 0;
const usuario_scheme_1 = __importDefault(require("../schemes/usuario.scheme"));
const especialista_scheme_1 = __importDefault(require("../schemes/especialista.scheme"));
const obtenerUsuarioPorEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { email } = req.params;
        const usuario = yield usuario_scheme_1.default.findOne({ email: email }).exec();
        if (!usuario) {
            return res.status(404).json({ status: false, message: 'Usuario no encontrado' });
        }
        if ((((_a = req.usuario) === null || _a === void 0 ? void 0 : _a.tipo) !== "administrador" && ((_b = req.usuario) === null || _b === void 0 ? void 0 : _b.tipo) !== "paciente") && ((_c = req.usuario) === null || _c === void 0 ? void 0 : _c.email) !== email) {
            usuario["password"] = "";
        }
        return res.status(200).json({ status: true, data: usuario });
    }
    catch (error) {
        console.error("Error al obtener el usuario por email: ", error);
        return res.status(500).json({ status: false, message: 'Error interno del servidor' });
    }
});
exports.obtenerUsuarioPorEmail = obtenerUsuarioPorEmail;
const obtenerListadoUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuario_scheme_1.default.find();
        if (!usuarios) {
            return res.status(404).json({ status: false, message: 'Usuarios no encontrados' });
        }
        return res.status(200).json({ status: true, data: usuarios });
    }
    catch (error) {
        console.error("Error al obtener el usuario por email: ", error);
        return res.status(500).json({ status: false, message: 'Error interno del servidor' });
    }
});
exports.obtenerListadoUsuarios = obtenerListadoUsuarios;
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const usuario = yield usuario_scheme_1.default.find({ _id: { $ne: id } }).exec();
        if (!usuario) {
            return res.status(404).json({ status: false, message: 'Usuarios no encontrados' });
        }
        return res.status(200).json({ status: true, data: usuario });
    }
    catch (error) {
        console.error("Error al obtener el usuario por email: ", error);
        return res.status(500).json({ status: false, message: 'Error interno del servidor' });
    }
});
exports.obtenerUsuarios = obtenerUsuarios;
const obtenerListadoEspecialistas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const especialistas = req.params.especialidad ? yield especialista_scheme_1.default.find({ 'especialidades._id': req.params.especialidad }) : yield especialista_scheme_1.default.find();
        return res.status(200).json({ status: true, data: especialistas });
    }
    catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ status: false, message: 'Error interno del servidor' });
    }
});
exports.obtenerListadoEspecialistas = obtenerListadoEspecialistas;
//# sourceMappingURL=usuario.controller.js.map