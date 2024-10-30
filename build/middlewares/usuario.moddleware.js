"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarSoloAdministrador = exports.verificarPermisos = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verificarPermisos = (req, res, next) => {
    const { email } = req.params;
    let token = (req.headers["x-access-token"] || req.headers["authorization"]);
    token = token.slice(7, token.length);
    const datos = jsonwebtoken_1.default.decode(token);
    if (datos.tipo === "paciente" && datos.email !== email) {
        return res.status(403).json({ status: false, message: 'No tiene permisos para ver estos datos' });
    }
    req.usuario = { email: datos.email, tipo: datos.tipo };
    next();
};
exports.verificarPermisos = verificarPermisos;
const verificarSoloAdministrador = (req, res, next) => {
    let token = (req.headers["x-access-token"] || req.headers["authorization"]);
    token = token.slice(7, token.length);
    const datos = jsonwebtoken_1.default.decode(token);
    if (datos.tipo !== "administrador") {
        return res.status(403).json({ status: false, message: 'No tiene permisos para ver estos datos' });
    }
    next();
};
exports.verificarSoloAdministrador = verificarSoloAdministrador;
//# sourceMappingURL=usuario.moddleware.js.map