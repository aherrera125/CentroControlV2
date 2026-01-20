import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { ITypeEmployee } from "../types/ITypeEmployee";
import { ResultSetHeader } from "mysql2";

export type TypeEmployeeRow = ITypeEmployee & RowDataPacket;

export const findAllTypeEmployee = async (): Promise<ITypeEmployee[]> => {
  const [rows] = await pool.query<TypeEmployeeRow[]>(
    "SELECT * FROM TIPOEMPLEADO",
  );
  return rows;
};

export const findTypeEmployee = async (
  id: string,
): Promise<ITypeEmployee | null> => {
  const [rows] = await pool.query<TypeEmployeeRow[]>(
    "SELECT * FROM TIPOEMPLEADO TE WHERE TE.idTipoEmpleado = ?",
    [id],
  );
  return rows.length ? rows[0] : null;
};

export const createTypeEmployee = async (
  typeEmployee: Omit<ITypeEmployee, "id">,
): Promise<number> => {
  const [typeEmployeeResult] = await pool.query<TypeEmployeeRow[]>(
    "INSERT INTO TIPOEMPLEADO (NombreTipo) VALUES (?)",
    [typeEmployee.NombreTipo],
  );
  return (typeEmployeeResult as any).insertId;
};

export const updateTypeEmployee = async (
  id: string,
  typeEmployee: ITypeEmployee,
): Promise<ITypeEmployee | null> => {
  const [rows] = await pool.query<TypeEmployeeRow[]>(
    "UPDATE TIPOEMPLEADO TE SET NombreTipo = ? WHERE TE.id = ?",
    [typeEmployee.NombreTipo, id],
  );
  return rows.length ? rows[0] : null;
};

export const deleteTypeEmployee = async (id: number): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM TIPOEMPLEADO WHERE idTipoEmpleado = ?",
    [id],
  );
  return result.affectedRows > 0;
};
