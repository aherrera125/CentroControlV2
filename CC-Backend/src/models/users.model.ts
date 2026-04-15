import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
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
