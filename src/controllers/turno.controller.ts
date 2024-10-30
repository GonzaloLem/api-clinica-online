import { AuthenticatedRequest, Request, Response } from 'express';
import TurnoModel from '../schemes/turno.scheme';
import DisponibilidadModel from '../schemes/disponibilidad.scheme';
import { TurnosDisponible } from '../interfaces/turnos-disponibles.interface';

//faltan los middlewares!!!!!
export const insertarTurno = async (req: Request, res: Response) => {
    try 
    {
        const jsonTurno = JSON.parse(req.body.turno);
        const turno = new TurnoModel(jsonTurno);
        turno.fecha.setHours(turno.fecha.getHours() - 3);
        console.log(turno);
        turno.save();
        
        return res.status(200).json({ status: true, message: 'Turno insertado correctamente.' });
    } 
    catch (error:any) 
    {
        console.error("Error al insertar el turno:", error.message);

        return res.status(400).json({ status: false, message: 'Error al insertar el turno.' });
    }
};

export const cancelarTurno = async (req: Request, res: Response) => {
    try 
    {
        const jsonTurno = JSON.parse(req.body.turno);

        const turnoActualizado = await TurnoModel.findByIdAndUpdate(
            jsonTurno._id,
            { estado: 'cancelado' },
            { new: true }
        );

        if (!turnoActualizado) {
            return res.status(404).json({ mensaje: 'Turno no encontrado' });
        }
        
        return res.status(200).json({ status: true, message: 'Turno cancelado correctamente.' });
    } 
    catch (error:any) 
    {
        console.error("Error al insertar el turno:", error.message);

        return res.status(400).json({ status: false, message: 'Error al insertar el turno.' });
    }
};

//ordenar por hora
export const obtenerMisTurnos = async (req: AuthenticatedRequest, res: Response) => {
    try 
    {

        const coleccion = req.usuario?.tipo === "paciente"? 
            await TurnoModel.find({"paciente._id":req.params.id})
                :
            await TurnoModel.find({"especialista._id":req.params.id});
        
        console.log(req.usuario?.tipo);

        return res.status(200).json({ status: true, data:coleccion });
    }
    catch(e)
    {
        console.log(e);
    }
}

export const obtenerMisTurnosPendientes = async (req: AuthenticatedRequest, res: Response) => {
    try 
    {

        const coleccion = req.usuario?.tipo === "paciente"? 
            await TurnoModel.find({"paciente._id":req.params.id, "estado":"pendiente"})
                :
            await TurnoModel.find({"especialista._id":req.params.id, "estado":"pendiente"});
        
        console.log(req.usuario?.tipo);

        return res.status(200).json({ status: true, data:coleccion });
    }
    catch(e)
    {
        console.log(e);
    }
}

export const obtenerMiHistorialMedico = async (req: AuthenticatedRequest, res: Response) => {
    try 
    {

        const coleccion = await TurnoModel.find({
            "paciente._id": req.params.id,
            "estado": { $ne: "pendiente" }
        });
        
        return res.status(200).json({ status: true, data:coleccion });
    }
    catch(e)
    {
        console.log(e);
    }
}

export const obtenerTurnosDisponibles = async (req: Request, res: Response) => {
    try 
    {
        const disponibilidad = await DisponibilidadModel.findOne({id_especialista:req.params.id_especialista, id_especialidad:req.params.id_especialidad})
            if(!disponibilidad)
            {
                throw new Error("Error al obtener la disponibilidad.");
            }

        const turnos = disponibilidad.horarios.map( (horario) => {
            const retorno:TurnosDisponible = {dia:horario.dia, horarios:[]};
            const inicio = new Date(`01/01/2000 ${horario.entrada}`);
            const fin = new Date(`01/01/2000 ${horario.salida}`);

            // Agregar el primer horario
            retorno.horarios.push(horario.entrada);

            // Iterar desde el siguiente horario hasta el final
            let siguienteHorario = new Date(inicio);
            while (siguienteHorario < fin) {
                siguienteHorario.setMinutes(siguienteHorario.getMinutes() + 20);
                const hora = siguienteHorario.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
                retorno.horarios.push(hora);
            }

            return retorno;
        });

        

        return res.status(200).json({ status: true, message: 'Disponibilidad obtenida correctamente.', data:turnos, });
    } 
    catch (error:any) 
    {
        console.error("Error al obtener la disponibilidad:", error.message);

        return res.status(400).json({ status: false, message: 'Error al obtener la disponibilidad.' });
    }
};

