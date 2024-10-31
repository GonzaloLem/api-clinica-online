import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

import autenticacion from './routes/autenticacion.route';
import usuario from './routes/usuario.route';
import disponibilidad from './routes/disponibilidad.route';
import turno from './routes/turno.route';
import especialidad from './routes/especialidad.route';
import {Server} from 'socket.io';
import { createServer } from 'node:http';

import './data-base.config'; 
import 'dotenv/config'; 

declare module 'express' {
  export interface AuthenticatedRequest extends Request {
      usuario?: {
          id?:string,
          email?:string,
          tipo?:string
        }
  }
}

const app = express();
const PUERTO = process.env.PORT??3005;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:4200', 'https://angular-clinica-online.web.app'],
    methods: ['GET', 'POST']
  }
});


app.use(cors({
  origin: ['http://localhost:4200', 'https://angular-clinica-online.web.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send("Raíz principal");
});

app.use("/autenticacion/", autenticacion);
app.use("/usuario/", usuario);
app.use("/disponibilidad/", disponibilidad);
app.use("/turno/", turno);
app.use("/especialidad/", especialidad);


app.use('/imagen/usuario/', express.static(path.join(__dirname, '../uploads/imagenes/usuarios')));
app.use('/imagenes/especialidad', express.static(path.join(__dirname, '../uploads/imagenes/especialidades')));

io.on("connection", (socket) => {
  console.log("¡Usuario conectado con io socket!");

  socket.on("disconnect", () => {
    console.log("El usuario fue desconectado del io socket");
  });
})


server.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
})

export {server, io}