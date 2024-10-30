import { Request, Response, NextFunction, AuthenticatedRequest  } from 'express';
import TurnoModel from '../schemes/turno.scheme';
import { validarCampos, validarFormatoHora } from '../functions/validar.fuction';
import Jwt, { JwtPayload } from 'jsonwebtoken';

export const verificarUsuario = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    let token = (req.headers["x-access-token"] || req.headers["authorization"] as string);

    token = token.slice(7, token.length);
    const datos = (Jwt.decode(token as string)  as JwtPayload);
    
        if(datos.tipo !== "especialista" && datos.tipo !== "paciente")
        {
            return res.status(403).json({ status: false, message: 'No tiene permisos para ver estos datos' });
        }
        if(datos.tipo === "paciente" && datos.id !== id)
        {
            return res.status(403).json({ status: false, message: 'No tiene permisos para ver estos datos' });
        }
        
        req.usuario = {email: datos.email, tipo:datos.tipo};

    next();

};


export const validarDisponibilidadTurno = async (req: Request, res: Response, next: NextFunction) => {
    try
    {//rehacer
  /*      const { especialista, especialidad, dia, mes, anio, horario } = JSON.parse(req.body.turno);
        
        const coleccion = await TurnoModel.find({ especialista, especialidad, dia, mes, anio, horario:new RegExp(`${horario.split(':')[0]}:`) })

        const horarios = coleccion.map((turno) => {//despues sacar el -1 del mes
            return new Date(turno.anio, turno.mes-1, turno.dia, turno.horario.split(':')[0] as unknown as number, turno.horario.split(':')[1] as unknown as number);
        });
  

        const ocupado = horarios.some( (hora) => {
            let retorno = false;
                if(parseInt(horario.split(':')[1]) >= hora.getMinutes() && parseInt(horario.split(':')[1]) < hora.getMinutes()+20)
                {
                    retorno = true;
                }
             return retorno;
            })

        if(ocupado)
        {
            return res.status(400).json({ status: false, message: "El horario esta ocupado" });
        }

        next();*/
    }
    catch(e)
    {
        console.log(e);
    }
};

export const validarCamposTurnos = (req: Request, res: Response, next: NextFunction) => {
    const errores:string[] = [];
    const { especialista, especialidad, dia, mes, anio, horario } = JSON.parse(req.body.turno);

    errores.push(
        ...validarCampos
        (
            { especialista, especialidad, dia, mes, anio, horario },
            { 
                dia: {tipo:'number', min:{valor:1}, max:{valor:31}}, 
                mes:{tipo:'number', min:{valor:0}, max:{valor:11}}, 
                anio:{ tipo:'number', min:{valor:new Date().getFullYear()}}, 
                horario: {tipo:'string', pattern:{valor:/^[0-9:]+$/, mensaje:"formato de horario invalido, tiene que tener el siguente formato 00:00"}}, 
                especialista: {tipo:'object'}, 
                especialidad: {tipo:'object'} 
            }
        )
    );

    if(errores.length > 0)
    {
        return res.status(400).json({ status: false, message: errores });
    }

    next();

};

export const validarFormatoHoraTurno = (req: Request, res: Response, next: NextFunction) => {
    
    if (!validarFormatoHora(JSON.parse(req.body.turno).horario)){
        return res.status(400).json({ status: false, message: 'El formato de hora es incorrecto. Debe ser en formato HH:MM (24 horas).' });
    }

    next();
};