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
exports.login = exports.register = void 0;
const authService = __importStar(require("../services/auth.service"));
const express_validator_1 = require("express-validator");
const register = async (req, res) => {
    try {
        // Verificar errores de validación
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password, name, lastName, rolId } = req.body;
        if (!rolId) {
            return res.status(400).json({ error: "rolId es requerido" });
        }
        await authService.register(email, password, name, lastName, rolId);
        return res.status(201).json({ message: "Usuario creado exitosamente" });
    }
    catch (error) {
        if (error && (error.code === "ER_DUP_ENTRY" || error.code === "ER_DUP_KEY")) {
            return res.status(409).json({ error: "El usuario o email ya existe" });
        }
        return res.status(500).json({ error: "Error al registrar el usuario", detail: error?.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const user = await authService.login(email, password);
        return res.json({ user });
    }
    catch (error) {
        if (error && error.message === "Credenciales inválidas") {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }
        return res.status(500).json({ error: "Error al iniciar sesión", detail: error?.message });
    }
};
exports.login = login;
