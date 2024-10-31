"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const autenticacion_route_1 = __importDefault(require("./routes/autenticacion.route"));
const usuario_route_1 = __importDefault(require("./routes/usuario.route"));
const disponibilidad_route_1 = __importDefault(require("./routes/disponibilidad.route"));
const turno_route_1 = __importDefault(require("./routes/turno.route"));
const especialidad_route_1 = __importDefault(require("./routes/especialidad.route"));
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
require("./data-base.config");
require("dotenv/config");
const app = (0, express_1.default)();
const PUERTO = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3005;
const server = (0, node_http_1.createServer)(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: `http://localhost:${4200}`,
        //origin: `https://angular-clinica-online.web.app`,
        methods: ['GET', 'POST']
    }
});
exports.io = io;
app.use((0, cors_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    //origin: 'https://angular-clinica-online.web.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send("Raíz principal");
});
app.use("/autenticacion/", autenticacion_route_1.default);
app.use("/usuario/", usuario_route_1.default);
app.use("/disponibilidad/", disponibilidad_route_1.default);
app.use("/turno/", turno_route_1.default);
app.use("/especialidad/", especialidad_route_1.default);
app.use('/imagen/usuario/', express_1.default.static(path_1.default.join(__dirname, '../uploads/imagenes/usuarios')));
app.use('/imagenes/especialidad', express_1.default.static(path_1.default.join(__dirname, '../uploads/imagenes/especialidades')));
io.on("connection", (socket) => {
    console.log("¡Usuario conectado con io socket!");
    socket.on("disconnect", () => {
        console.log("El usuario fue desconectado del io socket");
    });
});
server.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
//# sourceMappingURL=index.js.map