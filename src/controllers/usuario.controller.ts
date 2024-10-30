import { Response, AuthenticatedRequest  } from 'express';
import UsuarioModel from '../schemes/usuario.scheme';
import EspecialistaModel from '../schemes/especialista.scheme';

export const obtenerUsuarioPorEmail = async (req: AuthenticatedRequest , res: Response) => {
    try 
    {
      const {email}  = req.params;
      const usuario = await UsuarioModel.findOne({email: email }).exec();
  
        if (!usuario) 
        {
            return res.status(404).json({ status: false, message: 'Usuario no encontrado' });
        }
  
        if((req.usuario?.tipo !== "administrador" && req.usuario?.tipo !== "paciente") && req.usuario?.email !== email)
        {
          usuario["password"] = "";
        }

      return res.status(200).json({ status: true, data: usuario });
    } 
    catch (error) 
    {
      console.error("Error al obtener el usuario por email: ", error);
      return res.status(500).json({ status: false, message: 'Error interno del servidor' });
    }
};

export const obtenerListadoUsuarios = async (req: AuthenticatedRequest , res: Response) => {
  try 
  {
      const usuarios = await UsuarioModel.find();

      if (!usuarios) 
      {
          return res.status(404).json({ status: false, message: 'Usuarios no encontrados' });
      }

    return res.status(200).json({ status: true, data: usuarios });
  } 
  catch (error) 
  {
    console.error("Error al obtener el usuario por email: ", error);
    return res.status(500).json({ status: false, message: 'Error interno del servidor' });
  }
};

export const obtenerUsuarios = async (req: AuthenticatedRequest , res: Response) => {
    try 
    {
        const {id} = req.params;
        const usuario = await UsuarioModel.find({_id: { $ne: id }}).exec();
  
        if (!usuario) 
        {
            return res.status(404).json({ status: false, message: 'Usuarios no encontrados' });
        }
  
      return res.status(200).json({ status: true, data: usuario });
    } 
    catch (error) 
    {
      console.error("Error al obtener el usuario por email: ", error);
      return res.status(500).json({ status: false, message: 'Error interno del servidor' });
    }
};


export const obtenerListadoEspecialistas = async (req: AuthenticatedRequest , res: Response) => {
  try 
  {
      const especialistas = req.params.especialidad? await EspecialistaModel.find({'especialidades._id':req.params.especialidad}):await EspecialistaModel.find();

    return res.status(200).json({ status: true, data: especialistas });
  } 
  catch (error) 
  {
    console.error("Error: ", error);
    return res.status(500).json({ status: false, message: 'Error interno del servidor' });
  }
};

