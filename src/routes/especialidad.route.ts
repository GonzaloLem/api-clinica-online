import { Router } from 'express';
import multer from 'multer';
import { insertarEspecialidad, obtenerEspecialidades } from '../controllers/especialidad.controller';

const router = Router();
const upload = multer({dest:"uploads/imagenes/especialidades/"});

router.post('/insertar', upload.single("imagen_especialidad"), [], insertarEspecialidad);
router.get('/obtener/:identificador?', upload.none(), [], obtenerEspecialidades);

export default router;
