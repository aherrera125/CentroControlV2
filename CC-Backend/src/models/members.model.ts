import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { IMember } from "../types/IMember";
import { ResultSetHeader } from "mysql2";

export type MemberRow = IMember & RowDataPacket;

export const findAllMembers = async (): Promise<IMember[]> => {
  const [rows] = await pool.query<MemberRow[]>(
    `SELECT me.memberNum, 
            me.benefitNum, 
            me.fullName, 
            me.dni, 
            me.phone, 
            me.address, 
            tm.name typeMember 
    FROM MEMBER me
    INNER JOIN TYPE_MEMBER tm ON tm.id = me.id
    ORDER BY me.id DESC`,
  );
  return rows;
};

export const createMember = async (
  member: Omit<IMember, "id">,
): Promise<number> => {
  const [memberResult] = await pool.query(
    `INSERT INTO MEMBER (typeMemberId, memberNum, benefitNum, fullName, dni, dateOfBirth, 
      phone, status, dateAdmission, salary, address) 
     VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [
      member.typeMemberId,
      member.memberNum,
      member.benefitNum,
      member.fullName,
      member.dni,
      member.dateOfBirth,
      member.phone,
      member.status,
      member.dateAdmission,
      member.salary,
      member.address,
    ],
  );
  return (memberResult as any).insertId;
};

export const updateMember = async (
  id: string,
  member: IMember,
): Promise<IMember | null> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE MEMBER
     SET fullName = ?, benefitNum = ?, dni = ?, phone = ?, salary = ?, address = ?
     WHERE id = ?`,
    [
      member.fullName,
      member.benefitNum,
      member.dni,
      member.phone,
      member.salary,
      member.address,
      id,
    ],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  // volver a buscar el historial clinico actualizado
  const [rows] = await pool.query<MemberRow[]>(
    "SELECT * FROM HISTORIAL_CLINICO WHERE id = ?",
    [id],
  );

  return rows[0];
};

export const deleteMember = async (id: string): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE MEMBER SET status = 0 WHERE id = ?",
    [id],
  );
  return result.affectedRows > 0;
};
