"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.findUserByEmail = exports.createUserRole = exports.createUser = exports.findAllUsers = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
const findAllUsers = async () => {
    const [rows] = await mysql_1.default.query(`SELECT us.name,
	    us.lastName,
      us.email,
      us.status,
      ro.name
    FROM USERS us
    INNER JOIN USER_ROLE ur on ur.userId = us.id
    INNER JOIN ROLE ro on ro.id = ur.roleId
    ORDER BY us.id DESC`);
    return rows;
};
exports.findAllUsers = findAllUsers;
const createUser = async (user) => {
    const [userResult] = await mysql_1.default.query(`INSERT INTO USERS (email, password, name, lastName, status) 
     VALUES (?,?,?,?,?)`, [user.email, user.password, user.name, user.lastName, 1]);
    return userResult.insertId;
};
exports.createUser = createUser;
const createUserRole = async (userId, roleId) => {
    await mysql_1.default.query(`INSERT INTO USER_ROLE (userId, roleId) VALUES (?,?)`, [userId, roleId]);
};
exports.createUserRole = createUserRole;
const findUserByEmail = async (email) => {
    const [rows] = await mysql_1.default.query(`SELECT us.*, ro.name as role
     FROM USERS us
     LEFT JOIN USER_ROLE ur ON ur.userId = us.id
     LEFT JOIN ROLE ro ON ro.id = ur.roleId
     WHERE us.email = ?
     LIMIT 1`, [email]);
    return rows.length > 0 ? rows[0] : null;
};
exports.findUserByEmail = findUserByEmail;
const updateUser = async (id, user) => {
    const [result] = await mysql_1.default.query(`UPDATE USERS
     SET email = ?, password = ?, name = ?, lastName = ?, status = ?
     WHERE id = ?`, [user.email, user.password, user.name, user.lastName, user.status, id]);
    if (result.affectedRows === 0) {
        return null;
    }
    // volver a buscar al usuario actualizada
    const [rows] = await mysql_1.default.query("SELECT * FROM USERS WHERE id = ?", [id]);
    return rows[0];
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    const [result] = await mysql_1.default.query(`UPDATE USERS
     SET status = 0
     WHERE id = ?`, [id]);
    return result.affectedRows > 0;
};
exports.deleteUser = deleteUser;
