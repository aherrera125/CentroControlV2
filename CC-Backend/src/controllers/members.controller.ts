import { Request, Response } from "express";
import * as memberService from "../services/members.service";
import { IMember } from "../types/IMember";

export const getMembers = (req: Request, res: Response) => {
  const data = memberService.getAllMembers();
  res.json(data);
};

export const addMember = (req: Request, res: Response) => {
  const data = memberService.addMember(req.body);
  res.status(201).json(data);
};

export const updateMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const memberData: IMember = req.body;
    const memberUpdated = await memberService.editMember(id, memberData);
    if (!memberUpdated) {
      return res.status(404).json({ message: `Socio no encontrado.` });
    }
    return res.status(200).json({
      memberUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error al actualizar los datos del socio.`,
    });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const memberDeleted = await memberService.removeMember(id);
    if (!memberDeleted) {
      res.status(404).json({ message: `Socio no encontrado.` });
    }
    return res.status(200).json({
      message: `Los datos del socio con id ${id} se eliminaron exitosamente.`,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error al eliminar el socio.` });
  }
};
