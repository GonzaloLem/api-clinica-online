"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const turno_controller_1 = require("../controllers/turno.controller");
const turnos_middlewares_1 = require("../middlewares/turnos.middlewares");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
router.post('/insertar', upload.none(), [ /*validarCamposTurnos, validarFormatoHoraTurno, validarDisponibilidadTurno*/], turno_controller_1.insertarTurno);
router.post('/cancelar', upload.none(), [ /*validarCamposTurnos, validarFormatoHoraTurno, validarDisponibilidadTurno*/], turno_controller_1.cancelarTurno);
router.get('/obtener/disponibles/:id_especialista/:id_especialidad', upload.none(), [], turno_controller_1.obtenerTurnosDisponibles);
router.get('/obtener/turnos/:id', upload.none(), [turnos_middlewares_1.verificarUsuario], turno_controller_1.obtenerMisTurnos);
router.get('/obtener/turnos/pendientes/:id', upload.none(), [turnos_middlewares_1.verificarUsuario], turno_controller_1.obtenerMisTurnosPendientes);
router.get('/obtener/historial/:id', upload.none(), [], turno_controller_1.obtenerMiHistorialMedico);
exports.default = router;
//# sourceMappingURL=turno.route.js.map