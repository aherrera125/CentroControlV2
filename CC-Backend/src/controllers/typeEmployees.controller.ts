import { Request, Response } from "express";
import { ITypeEmployee } from "../types/ITypeEmployee";
import * as typeEmployeesService from "../services/typeEmployees.service";

//getAll()
export const getAll = async (_req: Request, res: Response) => {
  try {
    const typeEmployee = await typeEmployeesService.getAllTypeEmployees();
    return res.status(200).json({ typeEmployee });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al obtener los tipos de empleados` });
  }
};
//getById()
export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const typeEmployee = await typeEmployeesService.getTypeEmployeeById(id);
    if (!typeEmployee) {
      return res
        .status(404)
        .json({ message: "Tipoe de empleado no encontrado." });
    }
    return res.status(200).json({ typeEmployee });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al obtener el tipo de empleado con id ${id}` });
  }
};
//create()
export const create = async (req: Request, res: Response) => {
  try {
    const typeEmployeeData: ITypeEmployee = req.body;
    const newTypeEmployee =
      await typeEmployeesService.addTypeEmployee(typeEmployeeData);
    return res.status(201).json({ newTypeEmployee });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al crear el tipo de empleado.` });
  }
};
//update()
export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const typeEmployeeData: ITypeEmployee = req.body;
    const updateTypeEmployee = await typeEmployeesService.editTypeEmployee(
      id,
      typeEmployeeData,
    );
    if (!updateTypeEmployee) {
      return res.status(404).json({ message: `Tipo empleado no encontrado.` });
    }
    return res.status(200).json({
      updateTypeEmployee,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al actualizar los datos del tipo de empleado.` });
  }
};
//delete()
export const detele = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTypeEmployee =
      await typeEmployeesService.removeTypeEmployee(id);
    if (!deleteTypeEmployee) {
      res.status(404).json({ meesage: `Tipe empleado no encontrado.` });
    }
    return res.status(200).json({
      message: `Los datos del tipo de empleado con id ${id} se eliminaros exitosamente.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al eliminar el tipo de empleado.` });
  }
};
