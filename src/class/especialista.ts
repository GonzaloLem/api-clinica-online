import { Especialidad } from "../interfaces/especialidad.interface";
import { Foto } from "../interfaces/foto.interface";
import { Usuario } from "./usuario";

export class Especialista extends Usuario 
{
    private especialidades:Especialidad[];

    constructor(email?:string, password?:string, nombre?:string, apellido?:string, dni?:string, edad?:number, foto?:Foto, especialidades?:Especialidad[],id?:string)
    {  
        super(email, password, nombre, apellido, dni, edad, foto, id);
        this.especialidades = especialidades??[];
        this.tipo = "especialista";
    }

    public get Especialidades():Especialidad[]
    {
        return this.especialidades;
    }

}