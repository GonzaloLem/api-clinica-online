import mongoose from 'mongoose';
import Usuario from './usuario.scheme';
import { Especialista } from '../class/especialista';

// Define el esquema para Especialista
const esquema = new mongoose.Schema({
  especialidades: [
    {
      id: { type: String, required: false },
      especialidad: { type: String, required: true },
    }
  ], 
});

// Crea el modelo discriminador para Especialista
const EspecialistaModel = Usuario.discriminator<Especialista>('especialista', esquema);

export default EspecialistaModel;
