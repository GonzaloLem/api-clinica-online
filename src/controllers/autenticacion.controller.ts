import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import UsuarioModel from '../schemes/usuario.scheme';
import 'dotenv/config'; 
import fs from 'node:fs';
import path from 'path'; 
import PacienteModel from '../schemes/paciente.scheme';
import EspecialistaModel from '../schemes/especialista.scheme';

const { JWT_SECRET, JWT_EXPIRES } = process.env;

export const registrarUsuario = async (req: Request, res: Response) => {
    try 
    {
        let json = JSON.parse(req.body.usuario);
        json.password = await bcrypt.hash(json.password, 8);
            if(req.file)
            {
                let userSave;

                json.urlImagen = req.file.originalname;
                if(json.tipo === "paciente")
                {
                    const paciente = new PacienteModel(json);
                    userSave = await paciente.save();
                }
                else if(json.tipo === "especialista")
                {
                    json.especialidades = JSON.parse(json.especialidades)
                    const especialista = new EspecialistaModel(json);
                    userSave = await especialista.save();
                }
                else
                {
                    const usuario = new UsuarioModel(json);
                    userSave = await usuario.save();
                }
                    if(!userSave)
                    {
                        throw new Error("Error al guardar el usuario");
                    }
                renombrar_imagen(req.file, userSave._id.toString());
                return res.status(200).json({ status: true, message: '!Usuario registrado con exito!' });
            }
            throw new Error("Falta la imagen");
    } 
    catch (error) 
    {
        console.error("Error al registrar el usuario: ", error);

        return res.status(400).json({ status: false, message: 'Error al registrar el usuario.' });
    }
};

export const login = async (req: Request, res: Response) => {
    try 
    {
        const {email, password} = JSON.parse(req.body.usuario);
            const usuario = await UsuarioModel.findOne({email:email});
                if(usuario && await bcrypt.compare(password, usuario["password"]))
                {
                    const token = Jwt.sign({id:usuario._id, email:usuario["email"], tipo:usuario["tipo"]}, JWT_SECRET!, {expiresIn: JWT_EXPIRES!});
                    return res.status(200).json({ status: true, data:{id:usuario._id, email:usuario["email"], tipo:usuario["tipo"], urlImagen:(usuario as any).urlImagen, token:token}, message: '!Usuario logueado con exito!' });
                }

        return res.status(400).json({ status: true, message: 'Email o Password incorrecto' });
    } 
    catch (error) 
    {
        console.error("Error al loguear el usuario: ", error);

        return res.status(400).json({ status: false, message: 'Error al querer loguear al usuario.' });
    }
};


function renombrar_imagen(archivo:Express.Multer.File, id:string)
{
    fs.renameSync(archivo.path, `./uploads/imagenes/usuarios/${id+path.extname(archivo.originalname)}`);
    return `./uploads/imagenes/usuarios/${id+path.extname(archivo.originalname)}`;
}