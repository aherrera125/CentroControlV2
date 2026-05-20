"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTypeMember = exports.updateTypeMember = exports.createTypeMember = exports.findAllTypeMember = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
const findAllTypeMember = async () => {
    const [rows] = await mysql_1.default.query(`SELECT * FROM type_member`);
    return rows;
};
exports.findAllTypeMember = findAllTypeMember;
const createTypeMember = async (typeMember) => {
    const [result] = await mysql_1.default.query(`INSERT INTO type_member (name) VALUES (?)`, [typeMember.name]);
    return result.insertId;
};
exports.createTypeMember = createTypeMember;
const updateTypeMember = async (id, typeMember) => {
    const [result] = await mysql_1.default.query(`UPDATE type_member SET name = ? WHERE id = ?`, [typeMember.name, id]);
    if (result.affectedRows === 0) {
        return null;
    }
    // Volver a buscar el tipo de miembro actualizado
    const [rows] = await mysql_1.default.query("SELECT * FROM type_member WHERE id = ?", [id]);
    return rows[0];
};
exports.updateTypeMember = updateTypeMember;
const deleteTypeMember = async (id) => {
    const [result] = await mysql_1.default.query("DELETE FROM type_member WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
exports.deleteTypeMember = deleteTypeMember;
