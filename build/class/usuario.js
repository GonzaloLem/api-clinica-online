"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(email, password, nombre, apellido, dni, edad, foto, id) {
        this.id = id !== null && id !== void 0 ? id : "";
        this.nombre = nombre !== null && nombre !== void 0 ? nombre : "";
        this.apellido = apellido !== null && apellido !== void 0 ? apellido : "";
        this.dni = dni !== null && dni !== void 0 ? dni : "";
        this.edad = edad !== null && edad !== void 0 ? edad : 0;
        this.email = email !== null && email !== void 0 ? email : "";
        this.password = password !== null && password !== void 0 ? password : "";
        this.foto = foto;
        this.tipo = "usuario";
    }
    get ID() {
        return this.id;
    }
    get Nombre() {
        return this.nombre;
    }
    get Apellido() {
        return this.apellido;
    }
    get Dni() {
        return this.dni;
    }
    get Edad() {
        return this.edad;
    }
    get Email() {
        return this.email;
    }
    get Password() {
        return this.password;
    }
    get Foto() {
        var _a;
        return (_a = this.foto) !== null && _a !== void 0 ? _a : { url: "" };
    }
    get Tipo() {
        return this.tipo;
    }
    static jsonToUsuario(json) {
        try {
            const usuarioJSON = JSON.parse(json);
            return new Usuario(usuarioJSON.email, usuarioJSON.password, usuarioJSON.nombre, usuarioJSON.apellido, usuarioJSON.dni, usuarioJSON.edad, usuarioJSON.foto, usuarioJSON.id);
        }
        catch (error) {
            console.log("Ocurrio un error al querer convertir el json en usuario: ", error);
            return new Usuario();
        }
    }
    usuarioToJson() {
        try {
            return JSON.stringify({
                email: this.email !== '' ? this.email : undefined,
                password: this.password !== '' ? this.password : undefined,
                nombre: this.nombre !== '' ? this.nombre : undefined,
                apellido: this.apellido !== '' ? this.apellido : undefined,
                dni: this.dni !== '' ? this.dni : undefined,
                edad: this.edad !== 0 ? this.edad : undefined,
                foto: this.foto,
                id: this.id !== '' ? this.id : undefined
            });
        }
        catch (error) {
            console.log("Ocurrio un error al querer convertir el json en usuario: ", error);
            return new Usuario();
        }
    }
}
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.js.map