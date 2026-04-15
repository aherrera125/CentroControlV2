import { Request, Response } from "express";
import * as memberService from "../services/members.service";

export const getAllMembers = (req: Request, res: Response) => {
  const data = memberService.getAllMembers();
  res.json(data);
};

export const addMember = (req: Request, res: Response) => {
  const data = memberService.addMember(req.body);
  res.status(201).json(data);
};
