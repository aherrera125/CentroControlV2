import { findAllEmployee } from "../models/employees.model";

export const getAllEmployees = async () => {
  return await findAllEmployee();
};
