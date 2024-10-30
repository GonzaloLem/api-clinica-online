import { Validacion } from "../interfaces/validacion-campo.interface";

export const validarCampos = (campos: { [key: string]: any }, tipado?: { [key: string]: Validacion }): string[] => {
    const errores: string[] = [];
    
    for (const campo in campos) 
    {
        if(!campos[campo])
        {
            errores.push(`Se requiere la variable ${campo}.`);
        }
        else if(tipado)
        {
            const tipo = tipado[campo]["tipo"];

            if (typeof campos[campo] !== tipo)
            {
                errores.push(`La variable ${campo} debe ser del tipo ${tipo}.`);
                continue;
            }

            if(tipo === "number")
            {
                if(tipado[campo].min && campos[campo] < tipado[campo].min?.valor!)
                {
                    errores.push(
                        tipado[campo].min?.mensaje?
                        tipado[campo].min?.mensaje!
                            :
                        `El valor minimo permitido para la variable ${campo} es de ${tipado[campo].min?.valor}`);
                    continue;
                }

                if(tipado[campo].max && campos[campo] > tipado[campo].max?.valor!)
                {
                    errores.push(
                        tipado[campo].max?.mensaje?
                        tipado[campo].max?.mensaje!
                            :
                        `El valor maximo permitido para la variable ${campo} es de ${tipado[campo].max?.valor}`);
                    continue;
                }
            }

            if(tipo === "string")
            {
                if(tipado[campo].pattern && !tipado[campo].pattern?.valor?.test(campos[campo]))
                {
                    errores.push(
                        tipado[campo].pattern?.mensaje?
                        tipado[campo].pattern?.mensaje!
                            :
                        `la variable ${campo} solo pueden tener los siguente caracteres: ${tipado[campo].pattern?.valor}`);
                    continue;
                }
            }
        }
    }

    return errores;
};

export const validarFormatoHora = (horario:string) => {
    return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(horario);
}