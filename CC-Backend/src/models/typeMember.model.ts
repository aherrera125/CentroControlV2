import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { ITypeMember } from "../types/ITypeMember";
import { ResultSetHeader } from "mysql2";

export type TypeMemberRow = ITypeMember & RowDataPacket;

export const findAllTypeMember = async (): Promise<ITypeMember[]> => {
  const [rows] = await pool.query<TypeMemberRow[]>(
    `SELECT * FROM type_member`,
  );
  return rows;
};

export const createTypeMember = async (
  typeMember: Omit<ITypeMember, "id">
): Promise<number> => {
  const [result] = await pool.query(
    `INSERT INTO type_member (name) VALUES (?)`,
    [typeMember.name]
  );
  return (result as any).insertId;
};

export const updateTypeMember = async (
  id: string,
  typeMember: ITypeMember
): Promise<ITypeMember | null> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE type_member SET name = ? WHERE id = ?`,
    [typeMember.name, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  // Volver a buscar el tipo de miembro actualizado
  const [rows] = await pool.query<TypeMemberRow[]>(
    "SELECT * FROM type_member WHERE id = ?",
    [id]
  );

  return rows[0];
};

export const deleteTypeMember = async (id: string): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM type_member WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
};