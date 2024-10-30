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
exports.obtenerTurnosDisponibles = exports.obtenerMiHistorialMedico = exports.obtenerMisTurnosPendientes = exports.obtenerMisTurnos = exports.cancelarTurno = exports.insertarTurno = void 0;
const turno_scheme_1 = __importDefault(require("../schemes/turno.scheme"));
const disponibilidad_scheme_1 = __importDefault(require("../schemes/disponibilidad.scheme"));
//faltan los middlewares!!!!!
const insertarTurno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jsonTurno = JSON.parse(req.body.turno);
        const turno = new turno_scheme_1.default(jsonTurno);
        turno.fecha.setHours(turno.fecha.getHours() - 3);
        console.log(turno);
        turno.save();
        return res.status(200).json({ status: true, message: 'Turno insertado correctamente.' });
    }
    catch (error) {
        console.error("Error al insertar el turno:", error.message);
        return res.status(400).json({ status: false, message: 'Error al insertar el turno.' });
    }
});
exports.insertarTurno = insertarTurno;
const cancelarTurno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jsonTurno = JSON.parse(req.body.turno);
        const turnoActualizado = yield turno_scheme_1.default.findByIdAndUpdate(jsonTurno._id, { estado: 'cancelado' }, { new: true });
        if (!turnoActualizado) {
            return res.status(404).json({ mensaje: 'Turno no encontrado' });
        }
        return res.status(200).json({ status: true, message: 'Turno cancelado correctamente.' });
    }
    catch (error) {
        console.error("Error al insertar el turno:", error.message);
        return res.status(400).json({ status: false, message: 'Error al insertar el turno.' });
    }
});
exports.cancelarTurno = cancelarTurno;
//ordenar por hora
const obtenerMisTurnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const coleccion = ((_a = req.usuario) === null || _a === void 0 ? void 0 : _a.tipo) === "paciente" ?
            yield turno_scheme_1.default.find({ "paciente._id": req.params.id })
            :
                yield turno_scheme_1.default.find({ "especialista._id": req.params.id });
        console.log((_b = req.usuario) === null || _b === void 0 ? void 0 : _b.tipo);
        return res.status(200).json({ status: true, data: coleccion });
    }
    catch (e) {
        console.log(e);
    }
});
exports.obtenerMisTurnos = obtenerMisTurnos;
const obtenerMisTurnosPendientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const coleccion = ((_c = req.usuario) === null || _c === void 0 ? void 0 : _c.tipo) === "paciente" ?
            yield turno_scheme_1.default.find({ "paciente._id": req.params.id, "estado": "pendiente" })
            :
                yield turno_scheme_1.default.find({ "especialista._id": req.params.id, "estado": "pendiente" });
        console.log((_d = req.usuario) === null || _d === void 0 ? void 0 : _d.tipo);
        return res.status(200).json({ status: true, data: coleccion });
    }
    catch (e) {
        console.log(e);
    }
});
exports.obtenerMisTurnosPendientes = obtenerMisTurnosPendientes;
const obtenerMiHistorialMedico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coleccion = yield turno_scheme_1.default.find({
            "paciente._id": req.params.id,
            "estado": { $ne: "pendiente" }
        });
        return res.status(200).json({ status: true, data: coleccion });
    }
    catch (e) {
        console.log(e);
    }
});
exports.obtenerMiHistorialMedico = obtenerMiHistorialMedico;
const obtenerTurnosDisponibles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const disponibilidad = yield disponibilidad_scheme_1.default.findOne({ id_especialista: req.params.id_especialista, id_especialidad: req.params.id_especialidad });
        if (!disponibilidad) {
            throw new Error("Error al obtener la disponibilidad.");
        }
        const turnos = disponibilidad.horarios.map((horario) => {
            const retorno = { dia: horario.dia, horarios: [] };
            const inicio = new Date(`01/01/2000 ${horario.entrada}`);
            const fin = new Date(`01/01/2000 ${horario.salida}`);
            // Agregar el primer horario
            retorno.horarios.push(horario.entrada);
            // Iterar desde el siguiente horario hasta el final
            let siguienteHorario = new Date(inicio);
            while (siguienteHorario < fin) {
                siguienteHorario.setMinutes(siguienteHorario.getMinutes() + 20);
                const hora = siguienteHorario.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
                retorno.horarios.push(hora);
            }
            return retorno;
        });
        return res.status(200).json({ status: true, message: 'Disponibilidad obtenida correctamente.', data: turnos, });
    }
    catch (error) {
        console.error("Error al obtener la disponibilidad:", error.message);
        return res.status(400).json({ status: false, message: 'Error al obtener la disponibilidad.' });
    }
});
exports.obtenerTurnosDisponibles = obtenerTurnosDisponibles;
//# sourceMappingURL=turno.controller.js.map