import pool from "../database/mysql";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IUser } from "../types/IUser";

export type UserRow = IUser & RowDataPacket;

export const findAllUsers = async (): Promise<IUser[]> => {
  const [rows] = await pool.query<UserRow[]>(
    `SELECT us.name,
	    us.lastName,
      us.email,
      us.status,
      ro.name
    FROM USERS us
    INNER JOIN USER_ROLE ur on ur.userId = us.id
    INNER JOIN ROLE ro on ro.id = ur.roleId
    ORDER BY us.id DESC`,
  );
  return rows;
};

export const createUser = async (
  user: Omit<IUser, "id" | "status">,
): Promise<number> => {
  const [userResult] = await pool.query(
    `INSERT INTO USERS (email, password, name, lastName, status) 
     VALUES (?,?,?,?,?)`,
    [user.email, user.password, user.name, user.lastName, 1],
  );
  return (userResult as any).insertId;
};

export const updateUser = async (
  id: string,
  user: IUser,
): Promise<IUser | null> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE USERS
     SET email = ?, password = ?, name = ?, lastName = ?, status = ?
     WHERE id = ?`,
    [user.email, user.password, user.name, user.lastName, user.status, id],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  // volver a buscar al usuario actualizada
  const [rows] = await pool.query<UserRow[]>(
    "SELECT * FROM USERS WHERE id = ?",
    [id],
  );

  return rows[0];
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE USERS
     SET status = 0
     WHERE id = ?`,
    [id],
  );
  return result.affectedRows > 0;
};
