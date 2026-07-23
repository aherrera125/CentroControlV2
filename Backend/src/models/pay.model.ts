import pool from "../database/mysql";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { IPay } from "../types/IPay";

export type PayRow = IPay & RowDataPacket;

export const findAllPay = async (): Promise<IPay[]> => {
  const [rows] = await pool.query<PayRow[]>(
    `SELECT * FROM PAY`,
  );
  return rows;
};

export const createPay = async (
  pay: Omit<IPay, "id">,
): Promise<number> => {
  const [result] = await pool.query(
    `INSERT INTO PAY (memberId, amount, payDate, dueDate, status, monthPaid, voucherNum, note) VALUES (?,?,?,?,?,?,?,?)`,
    [pay.memberId, pay.amount, pay.payDate, pay.dueDate, pay.status, pay.monthPaid, pay.voucherNumber, pay.note],
  );
  return (result as any).insertId;
};

export const updatePay = async (
  id: string,
  pay: IPay,
): Promise<IPay | null> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE PAY SET memberId = ?, amount = ?, payDate = ?, dueDate = ?, status = ?, monthPaid = ?, voucherNum = ?, note = ? WHERE id = ?`,
    [pay.memberId, pay.amount, pay.payDate, pay.dueDate, pay.status, pay.monthPaid, pay.voucherNumber, pay.note, id],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [rows] = await pool.query<PayRow[]>(
    "SELECT * FROM PAY WHERE id = ?",
    [id],
  );

  return rows[0];
};

export const deletePay = async (id: string): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM PAY WHERE id = ?",
    [id],
  );
  return result.affectedRows > 0;
};
