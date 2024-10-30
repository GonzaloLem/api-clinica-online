import { Foto } from "../interfaces/foto.interface";
import { Tipo } from "../types";

export class Usuario {
    protected id: string;
    protected nombre: string;
    protected apellido: string;
    protected dni: string;
    protected edad: number;
    protected email: string;
    protected password: string;
    protected foto: Foto|undefined;
    protected tipo: Tipo;

    constructor(email?: string, password?: string, nombre?: string, apellido?: string, dni?: string, edad?: number, foto?: Foto, id?: string) 
    {
        this.id = id ?? "";
        this.nombre = nombre ?? "";
        this.apellido = apellido ?? "";
        this.dni = dni ?? "";
        this.edad = edad ?? 0;
        this.email = email ?? "";
        this.password = password ?? "";
        this.foto = foto;
        this.tipo = "usuario";
    }

    public get ID(): string 
    {
        return this.id;
    }

    public get Nombre(): string 
    {
        return this.nombre;
    }

    public get Apellido(): string 
    {
        return this.apellido;
    }

    public get Dni(): string 
    {
        return this.dni;
    }

    public get Edad(): number 
    {
        return this.edad;
    }

    public get Email(): string 
    {
        return this.email;
    }

    public get Password(): string 
    {
        return this.password;
    }

    public get Foto(): Foto 
    {
        return this.foto??{ url: "" };
    }

    public get Tipo(): string 
    {
        return this.tipo;
    }

    public static jsonToUsuario(json:string):Usuario
    {
        try
        {
            const usuarioJSON = JSON.parse(json);
            return new Usuario
                (
                    usuarioJSON.email,
                    usuarioJSON.password,
                    usuarioJSON.nombre,
                    usuarioJSON.apellido,
                    usuarioJSON.dni,
                    usuarioJSON.edad,
                    usuarioJSON.foto,
                    usuarioJSON.id
                );
        }
        catch(error)
        {
            console.log("Ocurrio un error al querer convertir el json en usuario: ", error);
            return new Usuario();
        }
    }

    public usuarioToJson()
    {
        try
        {

            return JSON.stringify
                (
                    {
                        email:this.email !== ''?this.email:undefined,
                        password:this.password !== ''?this.password:undefined,
                        nombre:this.nombre !== ''?this.nombre:undefined, 
                        apellido:this.apellido !== ''?this.apellido:undefined,
                        dni:this.dni !== ''?this.dni:undefined,
                        edad:this.edad !== 0?this.edad:undefined,
                        foto:this.foto,
                        id:this.id !== ''?this.id:undefined
                    }
                );
        }
        catch(error)
        {
            console.log("Ocurrio un error al querer convertir el json en usuario: ", error);
            return new Usuario();
        }
    }
}
