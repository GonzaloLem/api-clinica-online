import { Router } from 'express';
import multer from 'multer';
import { verificarPermisos } from '../middlewares/usuario.moddleware';
import { agregarDisponibilidad, eliminarDisponibilidad, insertarDisponibilidad, modificarDisponibilidad, obtenerDisponibilidad } from '../controllers/disponibilidad.controller';
import { verificarAutenticacion } from '../middlewares/autenticacion.middleware';

const router = Router();
const upload = multer();

router.post('/insertar', upload.none(), [verificarPermisos], insertarDisponibilidad);
router.post('/modificar', upload.none(), [verificarPermisos], modificarDisponibilidad);
router.post('/agregar', upload.none(), [verificarPermisos], agregarDisponibilidad);
router.delete('/eliminar/:id_especialista/:id_especialidad/:id_horario', upload.none(), [verificarPermisos], eliminarDisponibilidad);
router.get('/obtener/:id_especialista/:id_especialidad?', upload.none(), [], obtenerDisponibilidad);

export default router;
