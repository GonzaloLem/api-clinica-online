import { Request, Response, NextFunction, AuthenticatedRequest  } from 'express';
import Jwt, { JwtPayload } from 'jsonwebtoken';


export const verificarPermisos = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { email } = req.params;
    let token = (req.headers["x-access-token"] || req.headers["authorization"] as string);
    token = token.slice(7, token.length);
    const datos = (Jwt.decode(token as string)  as JwtPayload)
    
        if(datos.tipo === "paciente" && datos.email !== email)
        {
            return res.status(403).json({ status: false, message: 'No tiene permisos para ver estos datos' });
        }
    req.usuario = {email: datos.email, tipo:datos.tipo};

    next();

};

export const verificarSoloAdministrador = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token = (req.headers["x-access-token"] || req.headers["authorization"] as string);

    token = token.slice(7, token.length);
    const datos = (Jwt.decode(token as string)  as JwtPayload);
    
        if(datos.tipo !== "administrador")
        {
            return res.status(403).json({ status: false, message: 'No tiene permisos para ver estos datos' });
        }


    next();

};