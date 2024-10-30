import { Request, Response } from 'express';
import EspecialidadModel from '../schemes/especialidad.scheme';
import 'dotenv/config'; 
import fs from 'node:fs';
import path from 'path'; 

export const insertarEspecialidad = async (req: Request, res: Response) => {
    try 
    {
        if(req.file)
        {
            let json = JSON.parse(req.body.especialidad);
            json.urlImagen = req.file.originalname;
            const especialidadModel = new EspecialidadModel(json);

            const especialidad = await especialidadModel.save();
    
                if(!especialidad)
                {
                    throw new Error("Ocurrio un error al guardar la especialidad");
                }
    
            renombrar_imagen(req.file, especialidad._id.toString());
    
            return res.status(200).json({ status: true, data:"Especialidad insertada correctamente" });
        }

        throw new Error("Falta la imagen para la especialidad.");
    }
    catch(e)
    {
        console.log(e);
        return res.status(400).json({ status: false, message:"Ocurrio un error al insertar la especialidad" });
    }
}

export const obtenerEspecialidades = async (req: Request, res: Response) => {
    try 
    {
        const coleccion = req.params.identificador? 
                await EspecialidadModel.findOne
                    (
                        /^[A-Za-z]+$/.test(req.params.identificador)?
                        {especialidad:req.params.identificador}:
                        {_id:req.params.identificador}
                    ) 
                    : 
                await EspecialidadModel.find();

        return res.status(200).json({ status: true, data:coleccion });
    }
    catch(e)
    {
        console.log(e);
        return res.status(400).json({ status: false, message:"Ocurrio un error al obtener la especialidad/es" });
    }
}

function renombrar_imagen(archivo:Express.Multer.File, id:string)
{
    console.log(archivo.path);
    fs.renameSync(archivo.path, `./uploads/imagenes/especialidades/${id+path.extname(archivo.originalname)}`);
    return `./uploads/imagenes/especialidades/${id+path.extname(archivo.originalname)}`;
}