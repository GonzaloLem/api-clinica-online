import { Request, Response } from 'express';
//import 'dotenv/config'; 
import DisponibilidadModel from '../schemes/disponibilidad.scheme';
import { Disponibilidad } from '../interfaces/disponibilidad.interface';
import {io} from "../index";


//faltan los middlewares!!!!!
export const insertarDisponibilidad = async (req: Request, res: Response) => {
    try 
    {
        const json = JSON.parse(req.body.disponibilidad) as Disponibilidad;     
        json.horarios = JSON.parse(json.horarios as unknown as string); 
            if(await DisponibilidadModel.findOne({id_especialidad:json.id_especialidad, id_especialista:json.id_especialista}))
            {
                throw new Error("Ya tiene una disponibildiad asignada, no se puede insertar otra, agregue a un horario a esa disponibilidad");
            }

        const disponibilidad = new DisponibilidadModel(json);
        const disponibilidadSave = await disponibilidad.save();

            if(!disponibilidadSave)
            {
                throw new Error("Error al guardar la disponibilidad.");
            }
        
        return res.status(200).json({ status: true, message: 'Disponibilidad insertada correctamente.' });
    } 
    catch (error:any) 
    {
        console.error("Error al insertar la disponibilidad:", error.message);

        return res.status(400).json({ status: false, message: 'Error al insertar la disponibilidad.' });
    }
};

//falta midd!! para asegurar que no exista el horario que quiere agregar osea que si tiene un horario el martes no deje agregar otro martes
export const agregarDisponibilidad = async (req: Request, res: Response) => {
    try 
    {
        const json = JSON.parse(req.body.disponibilidad) as Disponibilidad; 
        console.log(json)    
        //json.horarios = JSON.parse(json.horarios as unknown as string); 


        const disponibilidad = await DisponibilidadModel.findOne({id_especialidad: json.id_especialidad,id_especialista: json.id_especialista});
            if (!disponibilidad) 
            {
                const disponibilidadNueva = new DisponibilidadModel(json);
                disponibilidadNueva.save();
                //throw new Error("Disponibilidad no encontrada");
            }
        disponibilidad?.horarios.push(...json.horarios);
        disponibilidad?.save();
        io.emit("especialistaAgregarHorario", {id_especialidad:json.id_especialidad,horarios:json.horarios[0]});
            
        //const index = disponibilidad.horarios.findIndex( (horario) =>  (horario._id as any).toHexString() === json.horarios[0]._id);

        //disponibilidad.horarios[index] = json.horarios[0];
        //disponibilidad.save();
        
        return res.status(200).json({ status: true, message: 'Disponibilidad agregada correctamente.' });
    } 
    catch (error:any) 
    {
        console.error("Error al agregar la disponibilidad:", error.message);

        return res.status(400).json({ status: false, message: 'Error al agregar la disponibilidad.' });
    }
};

export const modificarDisponibilidad = async (req: Request, res: Response) => {
    try 
    {
        const json = JSON.parse(req.body.disponibilidad) as Disponibilidad;     
        //const json = (req.body.disponibilidad) as Disponibilidad;    
        console.log(json);
        //json.horarios = JSON.parse(json.horarios as unknown as string); 

        const disponibildiad = await DisponibilidadModel.findOne({id_especialidad: json.id_especialidad,id_especialista: json.id_especialista});
            if(!disponibildiad)
            {
                throw new Error("Error al modificar la disponibilidad.");
            }
        const index = disponibildiad.horarios.findIndex( (horario) =>  (horario._id as any).toHexString() === json.horarios[0]._id);
            if(index === -1){
                throw new Error("Horario no encontrado");
            }

        console.log(disponibildiad);
        disponibildiad.horarios[index] = json.horarios[0];
        disponibildiad.save()
        io.emit("especialistaModificarHorario", json.horarios[0]);

        return res.status(200).json({ status: true, message: 'Disponibilidad modificada correctamente.' });
    } 
    catch (error:any) 
    {
        console.error("Error al modificar la disponibilidad:", error.message);

        return res.status(400).json({ status: false, message: 'Error al modificar la disponibilidad.' });
    }
};

export const eliminarHorario= async (req: Request, res: Response) => {
    try 
    {
        const json = JSON.parse(req.body.disponibilidad) as Disponibilidad;     
        //const json = (req.body.disponibilidad) as Disponibilidad;    
        console.log(json);
        //json.horarios = JSON.parse(json.horarios as unknown as string); 

        const disponibilidad = await DisponibilidadModel.findOne({id_especialidad: json.id_especialidad,id_especialista: json.id_especialista});


        return res.status(200).json({ status: true, message: 'Horario eliminado correctamente.' });
    } 
    catch (error:any) 
    {
        console.error("Error:", error.message);

        return res.status(400).json({ status: false, message: 'Error al querer eliminar el horario.' });
    }
};

export const eliminarDisponibilidad = async (req: Request, res: Response) => {
    try 
    {
        const disponibildiad = await DisponibilidadModel.findOne({id_especialidad: req.params.id_especialidad,id_especialista: req.params.id_especialista});
            if(!disponibildiad)
            {
                throw new Error("Error al eliminar el horario.");
            }
        const index = disponibildiad.horarios.findIndex( (horario) =>  (horario._id as any).toHexString() === req.params.id_horario);
            if(index === -1){
                throw new Error("Horario no encontrado");
            }
        console.log(disponibildiad.horarios);
        io.emit("especialistaEliminarHorario", disponibildiad.horarios[index]);
        disponibildiad.horarios.splice(index, 1);
        console.log(disponibildiad);
        disponibildiad.save()

        return res.status(200).json({ status: true, message: 'Horario eliminado correctamente.' });
    } 
    catch (error:any) 
    {
        console.error("Error:", error.message);

        return res.status(400).json({ status: false, message: 'Error al eliminar el horario.' });
    }
};

export const obtenerDisponibilidad = async (req: Request, res: Response) => {
    try 
    {
        
        const disponibilidad = req.params.id_especialidad? 
            await DisponibilidadModel.findOne({id_especialista:req.params.id_especialista, id_especialidad:req.params.id_especialidad})
                :
            await DisponibilidadModel.find({id_especialista:req.params.id_especialista});
            if(!disponibilidad)
            {
                throw new Error("Error al obtener la disponibilidad.");
            }
        return res.status(200).json({ status: true, message: 'Disponibilidad obtenida correctamente.', data:disponibilidad });
    } 
    catch (error:any) 
    {
        console.error("Error:", error.message);

        return res.status(400).json({ status: false, message: 'Error al obtener la disponibilidad.' });
    }
};
