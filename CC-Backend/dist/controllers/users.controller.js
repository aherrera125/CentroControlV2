"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.getUsers = void 0;
const userService = __importStar(require("../services/users.service"));
const getUsers = (req, res) => {
    const data = userService.getAllUsers();
    res.json(data);
};
exports.getUsers = getUsers;
const addUser = (req, res) => {
    const data = userService.addUser(req.body);
    res.status(201).json(data);
};
exports.addUser = addUser;
const updateUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "user no autenticado." });
    }
    if (!req.user.id) {
        return res.status(401).json({ message: "user no autenticado." });
    }
    const userId = req.user.id.toString();
    try {
        const userData = req.body;
        const userUpdated = await userService.editUser(userId, userData);
        if (!userUpdated) {
            return res.status(404).json({ message: `user no encontrado.` });
        }
        return res.status(200).json({
            userUpdated,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `Error al actualizar los datos del user.` });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Usuario no autenticado." });
    }
    if (!req.user.id) {
        return res.status(401).json({ message: "Usuario no autenticado." });
    }
    try {
        const userId = req.user.id.toString();
        const userDeleted = await userService.removeUser(userId);
        if (!userDeleted) {
            res.status(404).json({ message: `Usuario no encontrado.` });
        }
        return res.status(200).json({
            message: `Los datos del Usuario con id ${userId} se eliminaron exitosamente.`,
        });
    }
    catch (error) {
        return res.status(500).json({ message: `Error al eliminar el usuario.` });
    }
};
exports.deleteUser = deleteUser;
