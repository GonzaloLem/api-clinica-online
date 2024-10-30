"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCorreoEmail = exports.validarCampos = exports.verificarAutenticacion = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { JWT_SECRET } = process.env;
exports.verificarAutenticacion = (0, express_1.Router)();
const validarCampos = (req, res, next) => {
    const errores = [];
    const { nombre, apellido, edad, email, password } = JSON.parse(req.body.usuario);
    if (!nombre || !/^[A-Za-z\sñ]+$/.test(nombre)) {
        errores.push("Nombre invalido.");
    }
    if (!apellido || !/^[A-Za-z\sñ]+$/.test(apellido)) {
        errores.push("Apellido invalido.");
    }
    if (!/^\d+$/.test(edad)) {
        errores.push("Edad invalida.");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errores.push("Email invalido.");
    }
    if (!password) {
        errores.push("Se requiere el campo password.");
    }
    if (errores.length > 0) {
        return res.status(400).json({ status: false, message: errores });
    }
    next();
};
exports.validarCampos = validarCampos;
const validarCorreoEmail = (req, res, next) => {
    const errores = [];
    const { email, password } = JSON.parse(req.body.usuario);
    if (!email) {
        errores.push("Se requiere el campo Email.");
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errores.push("Email invalido");
    }
    if (!password) {
        errores.push("Se requiere el campo password.");
    }
    if (errores.length > 0) {
        return res.status(400).json({ status: false, message: errores });
    }
    next();
};
exports.validarCorreoEmail = validarCorreoEmail;
exports.verificarAutenticacion.use((req, res, next) => {
    const errores = [];
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token && typeof token === "string" && token.startsWith("Bearer")) {
        token = token.slice(7, token.length);
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (error, decoded) => {
            if (!error) {
                req.decoded = decoded;
            }
            else {
                errores.push(error.message);
            }
        });
    }
    else {
        errores.push("No esta autorizado");
    }
    if (errores.length > 0) {
        return res.status(400).json({ status: false, message: errores });
    }
    next();
});
//# sourceMappingURL=autenticacion.middleware.js.map