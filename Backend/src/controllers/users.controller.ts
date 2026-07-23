import { Request, Response } from "express";
import { IUser } from "../types/IUser";
import * as userService from "../services/users.service";

export const getUsers = (req: Request, res: Response) => {
  const data = userService.getAllUsers();
  res.json(data);
};

export const addUser = (req: Request, res: Response) => {
  const data = userService.addUser(req.body);
  res.status(201).json(data);
};

export const updateUser = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "user no autenticado." });
  }
  if (!req.user.id) {
    return res.status(401).json({ message: "user no autenticado." });
  }
  const userId = req.user.id.toString();
  try {
    const userData: IUser = req.body;
    const userUpdated = await userService.editUser(userId, userData);
    if (!userUpdated) {
      return res.status(404).json({ message: `user no encontrado.` });
    }
    return res.status(200).json({
      userUpdated,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al actualizar los datos del user.` });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Usuario no autenticado." });
  }
  if (!req.user.id) {
    return res.status(401).json({ message: "Usuario no autenticado." });
  }
  try {
    const userId = req.user.id.toString();
    const userDeleted = await userService.removeUser(userId);
    if (!userDeleted) {
      res.status(404).json({ message: `Usuario no encontrado.` });
    }
    return res.status(200).json({
      message: `Los datos del Usuario con id ${userId} se eliminaron exitosamente.`,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error al eliminar el usuario.` });
  }
};
