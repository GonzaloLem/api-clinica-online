"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarFormatoHora = exports.validarCampos = void 0;
const validarCampos = (campos, tipado) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const errores = [];
    for (const campo in campos) {
        if (!campos[campo]) {
            errores.push(`Se requiere la variable ${campo}.`);
        }
        else if (tipado) {
            const tipo = tipado[campo]["tipo"];
            if (typeof campos[campo] !== tipo) {
                errores.push(`La variable ${campo} debe ser del tipo ${tipo}.`);
                continue;
            }
            if (tipo === "number") {
                if (tipado[campo].min && campos[campo] < ((_a = tipado[campo].min) === null || _a === void 0 ? void 0 : _a.valor)) {
                    errores.push(((_b = tipado[campo].min) === null || _b === void 0 ? void 0 : _b.mensaje) ?
                        (_c = tipado[campo].min) === null || _c === void 0 ? void 0 : _c.mensaje
                        :
                            `El valor minimo permitido para la variable ${campo} es de ${(_d = tipado[campo].min) === null || _d === void 0 ? void 0 : _d.valor}`);
                    continue;
                }
                if (tipado[campo].max && campos[campo] > ((_e = tipado[campo].max) === null || _e === void 0 ? void 0 : _e.valor)) {
                    errores.push(((_f = tipado[campo].max) === null || _f === void 0 ? void 0 : _f.mensaje) ?
                        (_g = tipado[campo].max) === null || _g === void 0 ? void 0 : _g.mensaje
                        :
                            `El valor maximo permitido para la variable ${campo} es de ${(_h = tipado[campo].max) === null || _h === void 0 ? void 0 : _h.valor}`);
                    continue;
                }
            }
            if (tipo === "string") {
                if (tipado[campo].pattern && !((_k = (_j = tipado[campo].pattern) === null || _j === void 0 ? void 0 : _j.valor) === null || _k === void 0 ? void 0 : _k.test(campos[campo]))) {
                    errores.push(((_l = tipado[campo].pattern) === null || _l === void 0 ? void 0 : _l.mensaje) ?
                        (_m = tipado[campo].pattern) === null || _m === void 0 ? void 0 : _m.mensaje
                        :
                            `la variable ${campo} solo pueden tener los siguente caracteres: ${(_o = tipado[campo].pattern) === null || _o === void 0 ? void 0 : _o.valor}`);
                    continue;
                }
            }
        }
    }
    return errores;
};
exports.validarCampos = validarCampos;
const validarFormatoHora = (horario) => {
    return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(horario);
};
exports.validarFormatoHora = validarFormatoHora;
//# sourceMappingURL=validar.fuction.js.map