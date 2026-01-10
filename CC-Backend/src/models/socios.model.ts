// Modelo simple en memoria
export interface Socio {
  //agregar los demas atributos del socio
  id: number;
  name: string;
  email: string;
}

// Simula una base de datos
export const socios: Socio[] = [];
