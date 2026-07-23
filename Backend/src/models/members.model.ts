import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { IMember } from "../types/IMember";
import { ResultSetHeader } from "mysql2";

export type MemberRow = IMember & RowDataPacket;

/**
 * Convierte una fecha en formato yyyy-mm-dd a formato MySQL yyyy-mm-dd HH:mm:ss
 */
const formatDateToMySQL = (date: string | Date): string => {
  let dateObj: Date;
  
  if (typeof date === "string") {
    // Si es string en formato yyyy-mm-dd, convertir a Date
    dateObj = new Date(date + "T00:00:00");
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    return new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  // Convertir a formato yyyy-mm-dd hh:mm:ss
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const findAllMembers = async (): Promise<IMember[]> => {
  const [rows] = await pool.query<MemberRow[]>(
    `SELECT me.id,
            me.memberNum, 
            me.benefitNum, 
            me.fullName, 
            me.dni, 
            me.phone, 
            me.status,
            me.address, 
            tm.name typeMember 
    FROM MEMBER me
    INNER JOIN TYPE_MEMBER tm ON tm.id = me.typeMemberId
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
      formatDateToMySQL(member.dateOfBirth),
      member.phone,
      member.status,
      formatDateToMySQL(member.dateAdmission),
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
     SET fullName = ?, benefitNum = ?, dni = ?, phone = ?, status = ?, salary = ?, address = ?
     WHERE id = ?`,
    [
      member.fullName,
      member.benefitNum,
      member.dni,
      member.phone,
      member.status,
      member.salary,
      member.address,
      id,
    ],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  // volver a buscar el socio actualizado
  const [rows] = await pool.query<MemberRow[]>(
    "SELECT * FROM MEMBER WHERE id = ?",
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
