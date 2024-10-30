import { Request, Response, NextFunction, Router  } from 'express';
import Jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

export const verificarAutenticacion = Router();

export const validarCampos = (req: Request, res: Response, next: NextFunction) => {
    const errores:string[] = [];
    const { nombre, apellido, edad, email, password } = JSON.parse(req.body.usuario);

        if (!nombre || !/^[A-Za-z\sñ]+$/.test(nombre)) 
        {
            errores.push("Nombre invalido.");
        }

        if (!apellido || !/^[A-Za-z\sñ]+$/.test(apellido)) 
        {
            errores.push("Apellido invalido.");
        }

        if (!/^\d+$/.test(edad))
        {
            errores.push("Edad invalida.");
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        {
            errores.push("Email invalido.");
        }

        if(!password)
        {
            errores.push("Se requiere el campo password.");
        }

    if(errores.length > 0)
    {
        return res.status(400).json({ status: false, message: errores });
    }

    next();

};

export const validarCorreoEmail = (req: Request, res: Response, next: NextFunction) => {
    const errores:string[] = [];
    const { email, password } = JSON.parse(req.body.usuario);
        if (!email)
        {
            errores.push("Se requiere el campo Email.");
        }

        if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        {
            errores.push("Email invalido");
        }

        if(!password)
        {
            errores.push("Se requiere el campo password.");
        }

    if(errores.length > 0)
    {
        return res.status(400).json({ status: false, message: errores });
    }

    next();

};

verificarAutenticacion.use( (req: Request , res: Response, next: NextFunction) => {
    const errores:string[] = [];
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if(token &&  typeof token === "string" && token.startsWith("Bearer"))
    {
        token = token.slice(7, token.length);
        Jwt.verify(token, JWT_SECRET!, (error, decoded) => {
            if(!error)
            {
                (req as any ).decoded = decoded;
            }
            else
            {
                errores.push(error.message);
            }
        });
    }
    else
    {
        errores.push("No esta autorizado");
    }

    if(errores.length > 0)
    {
        return res.status(400).json({ status: false, message: errores });
    }

    next();

});

