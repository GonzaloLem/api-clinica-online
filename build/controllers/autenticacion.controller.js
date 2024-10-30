"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registrarUsuario = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_scheme_1 = __importDefault(require("../schemes/usuario.scheme"));
require("dotenv/config");
const node_fs_1 = __importDefault(require("node:fs"));
const path_1 = __importDefault(require("path"));
const paciente_scheme_1 = __importDefault(require("../schemes/paciente.scheme"));
const especialista_scheme_1 = __importDefault(require("../schemes/especialista.scheme"));
const { JWT_SECRET, JWT_EXPIRES } = process.env;
const registrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let json = JSON.parse(req.body.usuario);
        json.password = yield bcryptjs_1.default.hash(json.password, 8);
        if (req.file) {
            let userSave;
            json.urlImagen = req.file.originalname;
            if (json.tipo === "paciente") {
                const paciente = new paciente_scheme_1.default(json);
                userSave = yield paciente.save();
            }
            else if (json.tipo === "especialista") {
                json.especialidades = JSON.parse(json.especialidades);
                const especialista = new especialista_scheme_1.default(json);
                userSave = yield especialista.save();
            }
            else {
                const usuario = new usuario_scheme_1.default(json);
                userSave = yield usuario.save();
            }
            if (!userSave) {
                throw new Error("Error al guardar el usuario");
            }
            renombrar_imagen(req.file, userSave._id.toString());
            return res.status(200).json({ status: true, message: '!Usuario registrado con exito!' });
        }
        throw new Error("Falta la imagen");
    }
    catch (error) {
        console.error("Error al registrar el usuario: ", error);
        return res.status(400).json({ status: false, message: 'Error al registrar el usuario.' });
    }
});
exports.registrarUsuario = registrarUsuario;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = JSON.parse(req.body.usuario);
        const usuario = yield usuario_scheme_1.default.findOne({ email: email });
        if (usuario && (yield bcryptjs_1.default.compare(password, usuario["password"]))) {
            const token = jsonwebtoken_1.default.sign({ id: usuario._id, email: usuario["email"], tipo: usuario["tipo"] }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
            return res.status(200).json({ status: true, data: { id: usuario._id, email: usuario["email"], tipo: usuario["tipo"], urlImagen: usuario.urlImagen, token: token }, message: '!Usuario logueado con exito!' });
        }
        return res.status(400).json({ status: true, message: 'Email o Password incorrecto' });
    }
    catch (error) {
        console.error("Error al loguear el usuario: ", error);
        return res.status(400).json({ status: false, message: 'Error al querer loguear al usuario.' });
    }
});
exports.login = login;
function renombrar_imagen(archivo, id) {
    node_fs_1.default.renameSync(archivo.path, `./uploads/imagenes/usuarios/${id + path_1.default.extname(archivo.originalname)}`);
    return `./uploads/imagenes/usuarios/${id + path_1.default.extname(archivo.originalname)}`;
}
//# sourceMappingURL=autenticacion.controller.js.map