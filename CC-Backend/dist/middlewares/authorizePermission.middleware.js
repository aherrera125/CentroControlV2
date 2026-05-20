"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPermission = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
const authPermission = (permission) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "No autenticado" });
        }
        const [rows] = await mysql_1.default.query(`
      SELECT 1
      FROM PERMISSION pe
      JOIN ROLE_PERMISSION rp ON rp.permissionId = pe.id
      JOIN USER_ROLE ur ON ur.roleId = rp.roleId
      WHERE ur.userId = ? AND pe.action = ?
      LIMIT 1
      `, [req.user.id, permission]);
        if (rows.length === 0) {
            return res.status(403).json({
                message: "Permiso denegado",
                permission,
            });
        }
        next();
    };
};
exports.authPermission = authPermission;
