import { socios, Socio } from "../models/socios.model";

// Devuelve todos los socios
export const getSocios = (): Socio[] => {
  return socios;
};

// Crea un nuevo socio
export const createSocio = (socio: Socio): Socio => {
  socios.push(socio);
  return socio;
};
