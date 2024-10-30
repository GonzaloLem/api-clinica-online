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
exports.obtenerEspecialidades = exports.insertarEspecialidad = void 0;
const especialidad_scheme_1 = __importDefault(require("../schemes/especialidad.scheme"));
require("dotenv/config");
const node_fs_1 = __importDefault(require("node:fs"));
const path_1 = __importDefault(require("path"));
const insertarEspecialidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            let json = JSON.parse(req.body.especialidad);
            json.urlImagen = req.file.originalname;
            const especialidadModel = new especialidad_scheme_1.default(json);
            const especialidad = yield especialidadModel.save();
            if (!especialidad) {
                throw new Error("Ocurrio un error al guardar la especialidad");
            }
            renombrar_imagen(req.file, especialidad._id.toString());
            return res.status(200).json({ status: true, data: "Especialidad insertada correctamente" });
        }
        throw new Error("Falta la imagen para la especialidad.");
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ status: false, message: "Ocurrio un error al insertar la especialidad" });
    }
});
exports.insertarEspecialidad = insertarEspecialidad;
const obtenerEspecialidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coleccion = req.params.identificador ?
            yield especialidad_scheme_1.default.findOne(/^[A-Za-z]+$/.test(req.params.identificador) ?
                { especialidad: req.params.identificador } :
                { _id: req.params.identificador })
            :
                yield especialidad_scheme_1.default.find();
        return res.status(200).json({ status: true, data: coleccion });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ status: false, message: "Ocurrio un error al obtener la especialidad/es" });
    }
});
exports.obtenerEspecialidades = obtenerEspecialidades;
function renombrar_imagen(archivo, id) {
    console.log(archivo.path);
    node_fs_1.default.renameSync(archivo.path, `./uploads/imagenes/especialidades/${id + path_1.default.extname(archivo.originalname)}`);
    return `./uploads/imagenes/especialidades/${id + path_1.default.extname(archivo.originalname)}`;
}
//# sourceMappingURL=especialidad.controller.js.map