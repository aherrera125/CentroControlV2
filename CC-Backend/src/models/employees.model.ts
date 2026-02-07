import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { IEmployee } from "../types/IEmployee";

export type EmployeeRow = IEmployee & RowDataPacket;

export const findAllEmployee = async (): Promise<IEmployee[]> => {
  const [rows] = await pool.query<EmployeeRow[]>("SELECT * FROM EMPLEADO");
  return rows;
};

export const findEmployeeById = async (
  id: number,
): Promise<IEmployee | null> => {
  const [rows] = await pool.query<EmployeeRow[]>(
    "SELECT * FROM EMPLEADO e WHERE e.id = ?",
    [id],
  );
  return rows.length ? rows[0] : null;
};

export const createEmployee = async (
  employee: Omit<EmployeeRow, "id">,
): Promise<number> => {
  const [employeeResult] = await pool.query(
    "INSERT INTO EMPLEADO (apynom, dni, domicilio, fechaNac, telefonoCelular, telefonoFijo, typeEmployeeId) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      employee.apynom,
      employee.dni,
      employee.domicilio,
      employee.fechaNac,
      employee.telefonoCelular,
      employee.telefonoFijo,
      employee.typeEmployeeId,
    ],
  );
  return (employeeResult as any).insertId;
};

export const updateTypeEmployee = async (
  employee: EmployeeRow,
): Promise<EmployeeRow | null> => {
  const [rows] = await pool.query<EmployeeRow[]>(
    "update EMPLEADO as e set apynom = ?, dni = ?, domicilio = ?, fechaNac = ?, telefonoCelular = ?, telefonoFijo = ?, typeEmployeeId = ? where e.id = ?",
    [
      employee.apynom,
      employee.dni,
      employee.domicilio,
      employee.fechaNac,
      employee.telefonoCelular,
      employee.telefonoFijo,
      employee.typeEmployeeId,
      employee.id,
    ],
  );

  return rows.length ? rows[0] : null;
};

export const deleteTypeEmployee = async (
  id: number,
): Promise<EmployeeRow | null> => {
  const [rows] = await pool.query<EmployeeRow[]>(
    "DELETE FROM EMPLEADO WHERE id = ?",
    [id],
  );

  return rows.length ? rows[0] : null;
};
