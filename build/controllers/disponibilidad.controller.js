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
exports.obtenerDisponibilidad = exports.eliminarDisponibilidad = exports.eliminarHorario = exports.modificarDisponibilidad = exports.agregarDisponibilidad = exports.insertarDisponibilidad = void 0;
//import 'dotenv/config'; 
const disponibilidad_scheme_1 = __importDefault(require("../schemes/disponibilidad.scheme"));
const index_1 = require("../index");
//faltan los middlewares!!!!!
const insertarDisponibilidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const json = JSON.parse(req.body.disponibilidad);
        json.horarios = JSON.parse(json.horarios);
        if (yield disponibilidad_scheme_1.default.findOne({ id_especialidad: json.id_especialidad, id_especialista: json.id_especialista })) {
            throw new Error("Ya tiene una disponibildiad asignada, no se puede insertar otra, agregue a un horario a esa disponibilidad");
        }
        const disponibilidad = new disponibilidad_scheme_1.default(json);
        const disponibilidadSave = yield disponibilidad.save();
        if (!disponibilidadSave) {
            throw new Error("Error al guardar la disponibilidad.");
        }
        return res.status(200).json({ status: true, message: 'Disponibilidad insertada correctamente.' });
    }
    catch (error) {
        console.error("Error al insertar la disponibilidad:", error.message);
        return res.status(400).json({ status: false, message: 'Error al insertar la disponibilidad.' });
    }
});
exports.insertarDisponibilidad = insertarDisponibilidad;
//falta midd!! para asegurar que no exista el horario que quiere agregar osea que si tiene un horario el martes no deje agregar otro martes
const agregarDisponibilidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const json = JSON.parse(req.body.disponibilidad);
        console.log(json);
        //json.horarios = JSON.parse(json.horarios as unknown as string); 
        const disponibilidad = yield disponibilidad_scheme_1.default.findOne({ id_especialidad: json.id_especialidad, id_especialista: json.id_especialista });
        if (!disponibilidad) {
            const disponibilidadNueva = new disponibilidad_scheme_1.default(json);
            disponibilidadNueva.save();
            //throw new Error("Disponibilidad no encontrada");
        }
        disponibilidad === null || disponibilidad === void 0 ? void 0 : disponibilidad.horarios.push(...json.horarios);
        disponibilidad === null || disponibilidad === void 0 ? void 0 : disponibilidad.save();
        index_1.io.emit("especialistaAgregarHorario", { id_especialidad: json.id_especialidad, horarios: json.horarios[0] });
        //const index = disponibilidad.horarios.findIndex( (horario) =>  (horario._id as any).toHexString() === json.horarios[0]._id);
        //disponibilidad.horarios[index] = json.horarios[0];
        //disponibilidad.save();
        return res.status(200).json({ status: true, message: 'Disponibilidad agregada correctamente.' });
    }
    catch (error) {
        console.error("Error al agregar la disponibilidad:", error.message);
        return res.status(400).json({ status: false, message: 'Error al agregar la disponibilidad.' });
    }
});
exports.agregarDisponibilidad = agregarDisponibilidad;
const modificarDisponibilidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const json = JSON.parse(req.body.disponibilidad);
        //const json = (req.body.disponibilidad) as Disponibilidad;    
        console.log(json);
        //json.horarios = JSON.parse(json.horarios as unknown as string); 
        const disponibildiad = yield disponibilidad_scheme_1.default.findOne({ id_especialidad: json.id_especialidad, id_especialista: json.id_especialista });
        if (!disponibildiad) {
            throw new Error("Error al modificar la disponibilidad.");
        }
        const index = disponibildiad.horarios.findIndex((horario) => horario._id.toHexString() === json.horarios[0]._id);
        if (index === -1) {
            throw new Error("Horario no encontrado");
        }
        console.log(disponibildiad);
        disponibildiad.horarios[index] = json.horarios[0];
        disponibildiad.save();
        index_1.io.emit("especialistaModificarHorario", json.horarios[0]);
        return res.status(200).json({ status: true, message: 'Disponibilidad modificada correctamente.' });
    }
    catch (error) {
        console.error("Error al modificar la disponibilidad:", error.message);
        return res.status(400).json({ status: false, message: 'Error al modificar la disponibilidad.' });
    }
});
exports.modificarDisponibilidad = modificarDisponibilidad;
const eliminarHorario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const json = JSON.parse(req.body.disponibilidad);
        //const json = (req.body.disponibilidad) as Disponibilidad;    
        console.log(json);
        //json.horarios = JSON.parse(json.horarios as unknown as string); 
        const disponibilidad = yield disponibilidad_scheme_1.default.findOne({ id_especialidad: json.id_especialidad, id_especialista: json.id_especialista });
        return res.status(200).json({ status: true, message: 'Horario eliminado correctamente.' });
    }
    catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ status: false, message: 'Error al querer eliminar el horario.' });
    }
});
exports.eliminarHorario = eliminarHorario;
const eliminarDisponibilidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const disponibildiad = yield disponibilidad_scheme_1.default.findOne({ id_especialidad: req.params.id_especialidad, id_especialista: req.params.id_especialista });
        if (!disponibildiad) {
            throw new Error("Error al eliminar el horario.");
        }
        const index = disponibildiad.horarios.findIndex((horario) => horario._id.toHexString() === req.params.id_horario);
        if (index === -1) {
            throw new Error("Horario no encontrado");
        }
        console.log(disponibildiad.horarios);
        index_1.io.emit("especialistaEliminarHorario", disponibildiad.horarios[index]);
        disponibildiad.horarios.splice(index, 1);
        console.log(disponibildiad);
        disponibildiad.save();
        return res.status(200).json({ status: true, message: 'Horario eliminado correctamente.' });
    }
    catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ status: false, message: 'Error al eliminar el horario.' });
    }
});
exports.eliminarDisponibilidad = eliminarDisponibilidad;
const obtenerDisponibilidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const disponibilidad = req.params.id_especialidad ?
            yield disponibilidad_scheme_1.default.findOne({ id_especialista: req.params.id_especialista, id_especialidad: req.params.id_especialidad })
            :
                yield disponibilidad_scheme_1.default.find({ id_especialista: req.params.id_especialista });
        if (!disponibilidad) {
            throw new Error("Error al obtener la disponibilidad.");
        }
        return res.status(200).json({ status: true, message: 'Disponibilidad obtenida correctamente.', data: disponibilidad });
    }
    catch (error) {
        console.error("Error:", error.message);
        return res.status(400).json({ status: false, message: 'Error al obtener la disponibilidad.' });
    }
});
exports.obtenerDisponibilidad = obtenerDisponibilidad;
//# sourceMappingURL=disponibilidad.controller.js.map