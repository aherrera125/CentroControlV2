import { employees, Employee } from "../models/employees.model";

// Devuelve todos los empleados
export const getAllEmployees = (): Employee[] => {
  return employees;
};

// Crea un nuevo empleado
export const createEmployee = (employee: Employee): Employee => {
  employees.push(employee);
  return employee;
};
