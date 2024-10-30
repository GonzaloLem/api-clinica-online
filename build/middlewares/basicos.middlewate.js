"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCuerpo = void 0;
// Middleware para validar el cuerpo de la solicitud
const validarCuerpo = (req, res, next) => {
    // Verifica si el cuerpo de la solicitud está vacío
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ status: false, message: 'El cuerpo de la solicitud está vacío.' });
    }
    next();
};
exports.validarCuerpo = validarCuerpo;
//# sourceMappingURL=basicos.middlewate.js.map