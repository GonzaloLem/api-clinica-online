"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const autenticacion_controller_1 = require("../controllers/autenticacion.controller");
const basicos_middlewate_1 = require("../middlewares/basicos.middlewate");
const autenticacion_middleware_1 = require("../middlewares/autenticacion.middleware");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: "uploads/imagenes/usuarios/" });
router.post('/registrar', upload.single("imagen_usuario"), [basicos_middlewate_1.validarCuerpo, autenticacion_middleware_1.validarCampos], autenticacion_controller_1.registrarUsuario);
router.post('/login', upload.none(), [basicos_middlewate_1.validarCuerpo, autenticacion_middleware_1.validarCorreoEmail], autenticacion_controller_1.login);
exports.default = router;
//# sourceMappingURL=autenticacion.route.js.map