import { Router } from 'express';
import multer from 'multer';
import { obtenerListadoEspecialistas, obtenerUsuarioPorEmail, obtenerUsuarios } from '../controllers/usuario.controller';
import { verificarAutenticacion } from '../middlewares/autenticacion.middleware';
import { verificarPermisos, verificarSoloAdministrador } from '../middlewares/usuario.moddleware';
import { insertarEspecialidadAEspecialista } from '../controllers/especialista.controller';

const router = Router();
const upload = multer();

router.get('/obtener/:email', upload.none(), [verificarAutenticacion], obtenerUsuarioPorEmail);
router.get('/obtener/usuarios/:id', upload.none(), [verificarSoloAdministrador, verificarAutenticacion], obtenerUsuarios);

router.post('/especialista/insertar/especialidad/:id', upload.none(), [verificarAutenticacion], insertarEspecialidadAEspecialista);

router.get('/especialista/obtener/:especialidad?', upload.none(), [], obtenerListadoEspecialistas);

export default router;
