import { Request, Response } from "express";
import * as userService from "../services/users.service";

export const getAllUsers = (req: Request, res: Response) => {
  const data = userService.getAllUsers();
  res.json(data);
};

export const addUser = (req: Request, res: Response) => {
  const data = userService.addUser(req.body);
  res.status(201).json(data);
};
