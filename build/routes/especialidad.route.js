"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const especialidad_controller_1 = require("../controllers/especialidad.controller");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: "uploads/imagenes/especialidades/" });
router.post('/insertar', upload.single("imagen_especialidad"), [], especialidad_controller_1.insertarEspecialidad);
router.get('/obtener/:identificador?', upload.none(), [], especialidad_controller_1.obtenerEspecialidades);
exports.default = router;
//# sourceMappingURL=especialidad.route.js.map