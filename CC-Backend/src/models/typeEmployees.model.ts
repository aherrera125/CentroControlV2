import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { ITypeEmployee } from "../types/ITypeEmployee";

export type TypeEmployeeRow = ITypeEmployee & RowDataPacket;

export const findAllTypeEmployee = async (): Promise<ITypeEmployee | null> => {
  const [rows] = await pool.query<TypeEmployeeRow[]>(
    "SELECT * FROM TIPOEMPLEADO",
  );
  return rows.length ? rows[0] : null;
};

export const findTypeEmployee = async (
  id: string,
): Promise<ITypeEmployee | null> => {
  const [rows] = await pool.query<TypeEmployeeRow[]>(
    "SELECT * FROM TIPOEMPLEADO TE WHERE TE.id = ?",
    [id],
  );
  return rows.length ? rows[0] : null;
};

export const createTypeEmployee = async (
  typeEmployee: Omit<ITypeEmployee, "id">,
): Promise<number> => {
  const [typeEmployeeResult] = await pool.query<TypeEmployeeRow[]>(
    "INSERT INTO TIPOEMPLEADO (NombreTipo) VALUES (?)",
    [typeEmployee.name],
  );
  return (typeEmployeeResult as any).insertId;
};

export const updateTypeEmployee = async (
  id: string,
  typeEmployee: ITypeEmployee,
): Promise<ITypeEmployee | null> => {
  const [rows] = await pool.query<TypeEmployeeRow[]>(
    "UPDATE TIPOEMPLEADO TE SET NombreTipo = ? WHERE TE.id = ?",
    [typeEmployee.name, id],
  );
  return rows.length ? rows[0] : null;
};

export const deleteTypeEmployee = async (
  id: string,
): Promise<ITypeEmployee | null> => {
  const [rows] = await pool.query<TypeEmployeeRow[]>(
    "DELETE FROM TIPOEMPLEADO WHERE id = ?",
    [id],
  );
  return rows.length ? rows[0] : null;
};
