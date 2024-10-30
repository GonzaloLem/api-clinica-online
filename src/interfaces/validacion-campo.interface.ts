export interface Validacion {
    tipo: "string" | "number" | "boolean" | "array" | "object";
    min?: {valor:number, mensaje?:string}; 
    max?: {valor:number, mensaje?:string}; 
    pattern?: {valor:RegExp, mensaje?:string}; 
}