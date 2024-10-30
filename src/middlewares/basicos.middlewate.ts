import { Request, Response, NextFunction } from 'express';

// Middleware para validar el cuerpo de la solicitud
export const validarCuerpo = (req: Request, res: Response, next: NextFunction) => {
    // Verifica si el cuerpo de la solicitud está vacío
    if (!req.body || Object.keys(req.body).length === 0) 
    {
        return res.status(400).json({ status: false, message: 'El cuerpo de la solicitud está vacío.' });
    }

    next();
};


