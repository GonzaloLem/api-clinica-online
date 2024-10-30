import { Router } from 'express';
import multer from 'multer';
import { login, registrarUsuario } from '../controllers/autenticacion.controller';
import { validarCuerpo } from '../middlewares/basicos.middlewate';
import { validarCampos, validarCorreoEmail } from '../middlewares/autenticacion.middleware';

const router = Router();
const upload = multer({dest:"uploads/imagenes/usuarios/"});

router.post('/registrar', upload.single("imagen_usuario"), [validarCuerpo, validarCampos], registrarUsuario);
router.post('/login', upload.none(), [validarCuerpo, validarCorreoEmail], login);

export default router;
