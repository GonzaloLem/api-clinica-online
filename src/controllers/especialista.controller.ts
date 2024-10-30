import { Request, Response } from 'express';
import EspecialistaModel from '../schemes/especialista.scheme';

export const insertarEspecialidadAEspecialista = async (req: Request, res: Response) => {
    try 
    {
        const jsonEspecialidad = JSON.parse(req.body.especialidad);

        const especialistaActualizado = await EspecialistaModel.findByIdAndUpdate(
            req.params.id,
            { $push: { especialidades: jsonEspecialidad } },
            { new: true }
          );
        
          if (!especialistaActualizado) {
            throw new Error('Especialista no encontrado');
          }

        return res.status(200).json({ status: true, message: 'Especialidad agregada correctamente.' });
    } 
    catch (error:any) 
    {
        console.error("Error al insertar el turno:", error.message);

        return res.status(400).json({ status: false, message: 'Error al insertar el la especialidad.' });
    }
};
