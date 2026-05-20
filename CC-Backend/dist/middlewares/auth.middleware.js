"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * Middleware de autorización
 *
 * Verifica que el usuario tenga uno de los roles permitidos
 */
const authorize = (roles) => {
    return (req, res, next) => {
        console.log("🟢 authorize - user:", req.user);
        if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
    };
};
exports.authorize = authorize;
