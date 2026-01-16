import { Request, Response } from "express";
import * as employeeService from "../services/employees.service";

export const getAllEmployees = (req: Request, res: Response) => {
  const data = employeeService.getAllEmployees();
  res.json(data);
};

export const addEmployee = (req: Request, res: Response) => {
  const employee = employeeService.createEmployee(req.body);
  res.status(201).json(employee);
};
