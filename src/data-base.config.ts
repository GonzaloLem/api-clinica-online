import mongoose from "mongoose";
import 'dotenv/config';

// URL de conexión a MongoDB
const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// Conectar a la base de datos
mongoose.connect(url)
  .then(() => {
    console.log('Conexión establecida con MongoDB');
  })
  .catch((error: any) => {
    console.error('Error al conectar a MongoDB: ', error);
  });

export default mongoose;