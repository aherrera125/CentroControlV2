"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePay = exports.updatePay = exports.createPay = exports.findAllPay = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
const findAllPay = async () => {
    const [rows] = await mysql_1.default.query(`SELECT * FROM PAY`);
    return rows;
};
exports.findAllPay = findAllPay;
const createPay = async (pay) => {
    const [result] = await mysql_1.default.query(`INSERT INTO PAY (memberId, amount, payDate, dueDate, status, monthPaid, voucherNum, note) VALUES (?,?,?,?,?,?,?,?)`, [pay.memberId, pay.amount, pay.payDate, pay.dueDate, pay.status, pay.monthPaid, pay.voucherNumber, pay.note]);
    return result.insertId;
};
exports.createPay = createPay;
const updatePay = async (id, pay) => {
    const [result] = await mysql_1.default.query(`UPDATE PAY SET memberId = ?, amount = ?, payDate = ?, dueDate = ?, status = ?, monthPaid = ?, voucherNum = ?, note = ? WHERE id = ?`, [pay.memberId, pay.amount, pay.payDate, pay.dueDate, pay.status, pay.monthPaid, pay.voucherNumber, pay.note, id]);
    if (result.affectedRows === 0) {
        return null;
    }
    const [rows] = await mysql_1.default.query("SELECT * FROM PAY WHERE id = ?", [id]);
    return rows[0];
};
exports.updatePay = updatePay;
const deletePay = async (id) => {
    const [result] = await mysql_1.default.query("DELETE FROM PAY WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
exports.deletePay = deletePay;
