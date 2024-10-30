import { Especialista } from "../class/especialista";
import { Paciente } from "../class/paciente";
import { EstadoTurno } from "../types";
import { Especialidad } from "./especialidad.interface";

export interface Turno {
    especialista: Especialista
    especialidad: Especialidad,
    paciente: Paciente,
    estado: EstadoTurno,
    fecha:Date
}