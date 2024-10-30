import mongoose, { Schema } from 'mongoose';
import { Disponibilidad } from '../interfaces/disponibilidad.interface';

const esquema: Schema = new mongoose.Schema({
    id_especialidad: String,
    id_especialista: String,
    horarios: [
        {
          dia:   
          { 
            type: String, 
            enum: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"], 
            required: true 
          },
          entrada: { type: String, required: true },
          salida: { type: String, required: true },
        }
      ],
});


const DisponibilidadModel = mongoose.model<Disponibilidad>('disponibilidades', esquema);

export default DisponibilidadModel;
