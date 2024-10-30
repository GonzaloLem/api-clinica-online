"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const usuario_moddleware_1 = require("../middlewares/usuario.moddleware");
const disponibilidad_controller_1 = require("../controllers/disponibilidad.controller");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
router.post('/insertar', upload.none(), [usuario_moddleware_1.verificarPermisos], disponibilidad_controller_1.insertarDisponibilidad);
router.post('/modificar', upload.none(), [usuario_moddleware_1.verificarPermisos], disponibilidad_controller_1.modificarDisponibilidad);
router.post('/agregar', upload.none(), [usuario_moddleware_1.verificarPermisos], disponibilidad_controller_1.agregarDisponibilidad);
router.delete('/eliminar/:id_especialista/:id_especialidad/:id_horario', upload.none(), [usuario_moddleware_1.verificarPermisos], disponibilidad_controller_1.eliminarDisponibilidad);
router.get('/obtener/:id_especialista/:id_especialidad?', upload.none(), [], disponibilidad_controller_1.obtenerDisponibilidad);
exports.default = router;
//# sourceMappingURL=disponibilidad.route.js.map