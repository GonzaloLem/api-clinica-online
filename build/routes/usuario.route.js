"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const usuario_controller_1 = require("../controllers/usuario.controller");
const autenticacion_middleware_1 = require("../middlewares/autenticacion.middleware");
const usuario_moddleware_1 = require("../middlewares/usuario.moddleware");
const especialista_controller_1 = require("../controllers/especialista.controller");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
router.get('/obtener/:email', upload.none(), [autenticacion_middleware_1.verificarAutenticacion], usuario_controller_1.obtenerUsuarioPorEmail);
router.get('/obtener/usuarios/:id', upload.none(), [usuario_moddleware_1.verificarSoloAdministrador, autenticacion_middleware_1.verificarAutenticacion], usuario_controller_1.obtenerUsuarios);
router.post('/especialista/insertar/especialidad/:id', upload.none(), [autenticacion_middleware_1.verificarAutenticacion], especialista_controller_1.insertarEspecialidadAEspecialista);
router.get('/especialista/obtener/:especialidad?', upload.none(), [], usuario_controller_1.obtenerListadoEspecialistas);
exports.default = router;
//# sourceMappingURL=usuario.route.js.map