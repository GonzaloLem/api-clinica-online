import { Foto } from "../interfaces/foto.interface";
import { Usuario } from "./usuario";

export class Paciente extends Usuario 
{
    private obraSocial:string;

    constructor(email?:string, password?:string, nombre?:string, apellido?:string, dni?:string, edad?:number, foto?:Foto, obraSocial?:string,id?:string)
    {  
        super(email, password, nombre, apellido, dni, edad, foto, id);
        this.obraSocial = obraSocial??"";
        this.tipo = "paciente";
    }

    public get ObraSocial():string
    {
        return this.obraSocial;
    }

}