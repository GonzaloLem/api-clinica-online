import mongoose, { Schema } from 'mongoose';
import { Turno } from '../interfaces/turno.interface';

const esquema: Schema = new mongoose.Schema({
    especialista: {_id:String, nombre:String, apellido:String},
    paciente:{_id:String, nombre:String, apellido:String},
    especialidad:{_id:String, especialidad:String},
    estado:
        {
            type: String, 
            enum: ["pendiente", "realizado", "cancelado", "rechazado"], 
            required: true 
        },
    fecha:Date
});


// Crea el modelo base de usuario
const TurnoModel = mongoose.model<Turno>('turnos', esquema);

export default TurnoModel;
