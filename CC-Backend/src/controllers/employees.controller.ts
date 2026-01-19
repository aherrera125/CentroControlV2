import { Request, Response } from "express";
/*import * as employeeService from "../services/employees.service";

export const getAllEmployees = (req: Request, res: Response) => {
  const data = employeeService.getAllEmployees();
  res.json(data);
};

export const addEmployee = (req: Request, res: Response) => {
  const employee = employeeService.createEmployee(req.body);
  res.status(201).json(employee);
};
*/

//getAll()
export const getAll = (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: `Empelado obtenido exitosamente.` });
  } catch (error) {
    return res.status(500).json({ message: `Error al obtener el empleado` });
  }
};
//getById()
export const getById = (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    return res
      .status(200)
      .json({ message: `Aqui esta el empleado con ${id}.` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al obtener el empleado con id ${id}` });
  }
};
//create()
export const create = (req: Request, res: Response) => {
  try {
    return res.status(201).json({ message: "Empleado creado con exito." });
  } catch (error) {
    return res.status(500).json({ message: `Error al crrear el empleado.` });
  }
};
//update()
export const update = (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    return res.status(200).json({
      message: `Datos del empelado con id ${id} actualizados exitosamente.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al actualizar los datos del empleado.` });
  }
};
//delete()
export const detele = (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    return res
      .status(200)
      .json({ message: "Los datos del empleado se eliminaros exitosamente." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al eliminar el empleado con id ${id}.` });
  }
};
