"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
// URL de conexión a MongoDB
const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
// Conectar a la base de datos
mongoose_1.default.connect(url)
    .then(() => {
    console.log('Conexión establecida con MongoDB');
})
    .catch((error) => {
    console.error('Error al conectar a MongoDB: ', error);
});
exports.default = mongoose_1.default;
//# sourceMappingURL=data-base.config.js.map