import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { IMember } from "../types/IMember";

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
      member.benefintNum,
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
