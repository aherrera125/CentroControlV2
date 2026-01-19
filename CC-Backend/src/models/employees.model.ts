import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { IEmployee } from "../types/IEmployee";

export type ProductoRow = IEmployee & RowDataPacket;

export const findAllEmployee = async (): Promise<IEmployee | null> => {
  const [rows] = await pool.query<ProductoRow[]>("Select * from EMPLEADO");
  return rows.length ? rows[0] : null;
};

export const findTypeEmployee = async (
  id: number,
): Promise<IEmployee | null> => {
  const [rows] = await pool.query<ProductoRow[]>(
    "SELECT * FROM EMPLEADO p WHERE p.id = ?",
    [id],
  );
  return rows.length ? rows[0] : null;
};

export const createTypeEmployee = async (
  typeEmployee: Omit<ProductoRow, "id">,
): Promise<number> => {
  const [typeEmployeeResult] = await pool.query(
    "INSERT INTO EMPLEADO (nombre) VALUES (?)",
    [typeEmployee.nombreTipo],
  );
  return (typeEmployeeResult as any).insertId;
};

export const updateTypeEmployee = async (
  typeEmployee: ProductoRow, //UpdateTypeEmployeeDTO,
): Promise<ProductoRow | null> => {
  const [rows] = await pool.query<ProductoRow[]>(
    "update EMPLEADO as te set NombreTipo = ? where te.id = ?",
    [typeEmployee.id],
  );

  return rows.length ? rows[0] : null;
};

export const deleteTypeEmployee = async (
  id: number,
): Promise<ProductoRow | null> => {
  const [rows] = await pool.query<ProductoRow[]>(
    "delete from EMPLEADO where id = ?",
    [id],
  );

  return rows.length ? rows[0] : null;
};

export 