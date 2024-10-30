import mongoose, { Schema } from 'mongoose';
import { Especialidad } from '../interfaces/especialidad.interface';
import path from 'node:path';

interface IEspecialidad extends Document {
    isNew: any;
    _id: any;
    especialidad: string,
    urlImagen?:string
  }

const esquema: Schema = new mongoose.Schema({
    especialidad: String,
    urlImagen:{type:String, require:false}
});


esquema.pre<IEspecialidad>('save', function (next) {
    if (this.isNew) { 
      const id = this._id!.toString() 
      this.urlImagen = `${id+path.extname(this.urlImagen!)}`; // Actualizar el campo urlImagen con la nueva ruta
    }
    next();
  });

const EspecialidadModel = mongoose.model<Especialidad>('especialidades', esquema);

export default EspecialidadModel;
