// Define el esquema para Paciente
import mongoose from 'mongoose';
import Usuario from './usuario.scheme';
import { Paciente } from '../class/paciente';

const esquema = new mongoose.Schema({
    obraSocial: String, // Campo adicional para Paciente
  });
  
  // Crea el modelo discriminador para Paciente
const PacienteModel = Usuario.discriminator<Paciente>('paciente', esquema);

export default PacienteModel; 