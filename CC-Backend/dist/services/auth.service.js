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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel = __importStar(require("../models/users.model"));
const register = async (email, password, name, lastName, rolId) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const userId = await userModel.createUser({
        email,
        password: hashedPassword,
        name,
        lastName,
        status: true,
    });
    await userModel.createUserRole(userId, rolId);
    return userId;
};
exports.register = register;
const login = async (email, password) => {
    const invalidCredentialsError = new Error("Credenciales inválidas");
    const user = await userModel.findUserByEmail(email);
    if (!user)
        throw invalidCredentialsError;
    const isValid = await bcrypt_1.default.compare(password, user.password);
    if (!isValid)
        throw invalidCredentialsError;
    // Devolver información mínima del usuario (sin JWT)
    return { id: user.id, email: user.email, role: user.role };
};
exports.login = login;
