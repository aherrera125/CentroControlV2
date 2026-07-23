import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth";

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Middleware de autorización
 *
 * Verifica que el usuario tenga uno de los roles permitidos
 */
export const authorize = (roles: Array<"user" | "admin">) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("🟢 authorize - user:", req.user);
    if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  };
};
