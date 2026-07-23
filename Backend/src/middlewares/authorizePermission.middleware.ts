import { Request, Response, NextFunction } from "express";
import pool from "../database/mysql";

export const authPermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const [rows] = await pool.query<any[]>(
      `
      SELECT 1
      FROM PERMISSION pe
      JOIN ROLE_PERMISSION rp ON rp.permissionId = pe.id
      JOIN USER_ROLE ur ON ur.roleId = rp.roleId
      WHERE ur.userId = ? AND pe.action = ?
      LIMIT 1
      `,
      [req.user.id, permission],
    );

    if (rows.length === 0) {
      return res.status(403).json({
        message: "Permiso denegado",
        permission,
      });
    }
    next();
  };
};
