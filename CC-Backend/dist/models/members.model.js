"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMember = exports.createMember = exports.findAllMembers = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
const findAllMembers = async () => {
    const [rows] = await mysql_1.default.query(`SELECT me.id,
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
    ORDER BY me.id DESC`);
    return rows;
};
exports.findAllMembers = findAllMembers;
const createMember = async (member) => {
    const [memberResult] = await mysql_1.default.query(`INSERT INTO MEMBER (typeMemberId, memberNum, benefitNum, fullName, dni, dateOfBirth, 
      phone, status, dateAdmission, salary, address) 
     VALUES (?,?,?,?,?,?,?,?,?,?,?)`, [
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
    ]);
    return memberResult.insertId;
};
exports.createMember = createMember;
const updateMember = async (id, member) => {
    const [result] = await mysql_1.default.query(`UPDATE MEMBER
     SET fullName = ?, benefitNum = ?, dni = ?, phone = ?, status = ?, salary = ?, address = ?
     WHERE id = ?`, [
        member.fullName,
        member.benefitNum,
        member.dni,
        member.phone,
        member.status,
        member.salary,
        member.address,
        id,
    ]);
    if (result.affectedRows === 0) {
        return null;
    }
    // volver a buscar el socio actualizado
    const [rows] = await mysql_1.default.query("SELECT * FROM MEMBER WHERE id = ?", [id]);
    return rows[0];
};
exports.updateMember = updateMember;
const deleteMember = async (id) => {
    const [result] = await mysql_1.default.query("UPDATE MEMBER SET status = 0 WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
exports.deleteMember = deleteMember;
