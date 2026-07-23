import { Request, Response } from "express";
import * as typeMemberService from "../services/typeMember.service";
import { ITypeMember } from "../types/ITypeMember";

export const getTypeMember = async (_req: Request, res: Response) => {
  try {
    const data = await typeMemberService.getAllTypeMember();
    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error al obtener los tipos de socios:", error);
    return res.status(500).json({ message: `Error al obtener los tipos de socio.` });
  }
};

export const addTypeMember = (req: Request, res: Response) => {
  const data = typeMemberService.addTypeMember(req.body);
  res.status(201).json(data);
};

export const updateTypeMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const typeMemberData: ITypeMember = req.body;
    const typeMemberUpdated = await typeMemberService.editTypeMember(id, typeMemberData);
    if (!typeMemberUpdated) {
      return res.status(404).json({ message: `Tipo de socio no encontrado.` });
    }
    return res.status(200).json({
      typeMemberUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error al actualizar los datos del tipo de socio.`,
    });
  }
};

export const deleteTypeMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const typeMemberDeleted = await typeMemberService.removeTypeMember(id);
    if (!typeMemberDeleted) {
      res.status(404).json({ message: `Tipo de socio no encontrado.` });
    }
    return res.status(200).json({
      message: `Los datos del tipo de socio con id ${id} se eliminaron exitosamente.`,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error al eliminar el tipo de socio.` });
  }
};
