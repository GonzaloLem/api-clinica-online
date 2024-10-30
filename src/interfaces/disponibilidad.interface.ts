import { Horario } from "./horario.interface";

export interface Disponibilidad {
    id?:string,
    id_especialidad:string,
    id_especialista:string,
    id_horario?:string;
    horarios:Horario[]
}