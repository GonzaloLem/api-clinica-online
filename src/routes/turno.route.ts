import { Router } from 'express';
import multer from 'multer';
import { cancelarTurno, insertarTurno, obtenerMiHistorialMedico, obtenerMisTurnos, obtenerMisTurnosPendientes, obtenerTurnosDisponibles } from '../controllers/turno.controller';
import { validarCamposTurnos, validarDisponibilidadTurno, verificarUsuario } from '../middlewares/turnos.middlewares';
import { validarFormatoHoraTurno } from '../middlewares/turnos.middlewares';

const router = Router();
const upload = multer();

router.post('/insertar', upload.none(), [/*validarCamposTurnos, validarFormatoHoraTurno, validarDisponibilidadTurno*/], insertarTurno);
router.post('/cancelar', upload.none(), [/*validarCamposTurnos, validarFormatoHoraTurno, validarDisponibilidadTurno*/], cancelarTurno);
router.get('/obtener/disponibles/:id_especialista/:id_especialidad', upload.none(), [], obtenerTurnosDisponibles);
router.get('/obtener/turnos/:id', upload.none(), [verificarUsuario], obtenerMisTurnos);
router.get('/obtener/turnos/pendientes/:id', upload.none(), [verificarUsuario], obtenerMisTurnosPendientes);
router.get('/obtener/historial/:id', upload.none(), [], obtenerMiHistorialMedico);

export default router;
