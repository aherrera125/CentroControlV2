import { ITypeEmployee } from "../types/ITypeEmployee";
import {
  findAllTypeEmployee,
  findTypeEmployee,
  createTypeEmployee,
  updateTypeEmployee,
  deleteTypeEmployee,
} from "../models/typeEmployees.model";

export const getAllTypeEmployees = async () => {
  return await findAllTypeEmployee();
};
export const getTypeEmployeeById = async (
  id: string,
): Promise<ITypeEmployee | null> => {
  return await findTypeEmployee(id);
};
export const addTypeEmployee = async (data: ITypeEmployee) => {
  return await createTypeEmployee(data);
};
export const editTypeEmployee = async (id: string, data: ITypeEmployee) => {
  return await updateTypeEmployee(id, data);
};
export const removeTypeEmployee = async (id: number) => {
  return await deleteTypeEmployee(id);
};
