import { Request, Response } from "express";
import * as socioService from "../services/socios.service";

export const getAllSocios = (req: Request, res: Response) => {
  const data = socioService.getSocios();
  res.json(data);
};

export const addSocio = (req: Request, res: Response) => {
  const socio = socioService.createSocio(req.body);
  res.status(201).json(socio);
};
