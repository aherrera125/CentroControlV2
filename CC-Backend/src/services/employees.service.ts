import { IEmployee } from "../types/IEmployee";
import { employeesModel } from "../models/employees.model";

const getAllEmployees = (): Promise<IEmployee[]> => {
  //employeesModel.getAllEmployees();
  employeesModel.findAllEmployee;

  return [] as unknown as Promise<IEmployee[]>; // para no llorar a Typescript
};
const getEmployeeById = () => {};
const createEmployee = () => {};
const updateEmployee = () => {};
const deleteEmployee = () => {};
