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
exports.validarFormatoHoraTurno = exports.validarCamposTurnos = exports.validarDisponibilidadTurno = exports.verificarUsuario = void 0;
const validar_fuction_1 = require("../functions/validar.fuction");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verificarUsuario = (req, res, next) => {
    const id = req.params.id;
    let token = (req.headers["x-access-token"] || req.headers["authorization"]);
    token = token.slice(7, token.length);
    const datos = jsonwebtoken_1.default.decode(token);
    if (datos.tipo !== "especialista" && datos.tipo !== "paciente") {
        return res.status(403).json({ status: false, message: 'No tiene permisos para ver estos datos' });
    }
    if (datos.tipo === "paciente" && datos.id !== id) {
        return res.status(403).json({ status: false, message: 'No tiene permisos para ver estos datos' });
    }
    req.usuario = { email: datos.email, tipo: datos.tipo };
    next();
};
exports.verificarUsuario = verificarUsuario;
const validarDisponibilidadTurno = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try { //rehacer
        /*      const { especialista, especialidad, dia, mes, anio, horario } = JSON.parse(req.body.turno);
              
              const coleccion = await TurnoModel.find({ especialista, especialidad, dia, mes, anio, horario:new RegExp(`${horario.split(':')[0]}:`) })
      
              const horarios = coleccion.map((turno) => {//despues sacar el -1 del mes
                  return new Date(turno.anio, turno.mes-1, turno.dia, turno.horario.split(':')[0] as unknown as number, turno.horario.split(':')[1] as unknown as number);
              });
        
      
              const ocupado = horarios.some( (hora) => {
                  let retorno = false;
                      if(parseInt(horario.split(':')[1]) >= hora.getMinutes() && parseInt(horario.split(':')[1]) < hora.getMinutes()+20)
                      {
                          retorno = true;
                      }
                   return retorno;
                  })
      
              if(ocupado)
              {
                  return res.status(400).json({ status: false, message: "El horario esta ocupado" });
              }
      
              next();*/
    }
    catch (e) {
        console.log(e);
    }
});
exports.validarDisponibilidadTurno = validarDisponibilidadTurno;
const validarCamposTurnos = (req, res, next) => {
    const errores = [];
    const { especialista, especialidad, dia, mes, anio, horario } = JSON.parse(req.body.turno);
    errores.push(...(0, validar_fuction_1.validarCampos)({ especialista, especialidad, dia, mes, anio, horario }, {
        dia: { tipo: 'number', min: { valor: 1 }, max: { valor: 31 } },
        mes: { tipo: 'number', min: { valor: 0 }, max: { valor: 11 } },
        anio: { tipo: 'number', min: { valor: new Date().getFullYear() } },
        horario: { tipo: 'string', pattern: { valor: /^[0-9:]+$/, mensaje: "formato de horario invalido, tiene que tener el siguente formato 00:00" } },
        especialista: { tipo: 'object' },
        especialidad: { tipo: 'object' }
    }));
    if (errores.length > 0) {
        return res.status(400).json({ status: false, message: errores });
    }
    next();
};
exports.validarCamposTurnos = validarCamposTurnos;
const validarFormatoHoraTurno = (req, res, next) => {
    if (!(0, validar_fuction_1.validarFormatoHora)(JSON.parse(req.body.turno).horario)) {
        return res.status(400).json({ status: false, message: 'El formato de hora es incorrecto. Debe ser en formato HH:MM (24 horas).' });
    }
    next();
};
exports.validarFormatoHoraTurno = validarFormatoHoraTurno;
//# sourceMappingURL=turnos.middlewares.js.map