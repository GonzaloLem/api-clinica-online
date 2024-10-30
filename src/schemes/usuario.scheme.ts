import mongoose, { Schema, Document } from 'mongoose';
import { Usuario } from '../class/usuario';
import path from 'node:path';


interface IUsuario extends Document {
  nombre: string;
  apellido: string;
  dni: string;
  edad: number;
  email: string;
  password: string;
  tipo: string;
  urlImagen: string; // Campo opcional para la URL de la imagen
}

// Define el esquema base del usuario
const esquema: Schema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  dni: String,
  edad: Number,
  email: String,
  password: String,
  tipo: 
  { 
    type: String, 
    enum: ["usuario", "especialista", "paciente", "administrador"], 
    required: true 
  },
  urlImagen: String 
});

// Middleware para asignar el ID al nombre de la imagen antes de guardar el usuario
esquema.pre<IUsuario>('save', function (next) {
  if (this.isNew) { // Solo si es un nuevo documento
    const id = this._id!.toString() // Obtener el ID del documento
    this.urlImagen = `${id+path.extname(this.urlImagen)}`; // Actualizar el campo urlImagen con la nueva ruta
  }
  next();
});

// Crea el modelo base de usuario
const UsuarioModel = mongoose.model<Usuario>('usuarios', esquema);

export default UsuarioModel;
