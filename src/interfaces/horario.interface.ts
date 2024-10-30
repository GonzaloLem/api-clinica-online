import { Dia } from "../types";

export interface Horario {
    _id?:string;
    dia:Dia,
    entrada:string,
    salida:string
}