"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = exports.validateEmail = exports.validatePassword = void 0;
const express_validator_1 = require("express-validator");
exports.validatePassword = [
    (0, express_validator_1.body)("password")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres")
        .matches(/\d/)
        .withMessage("La contraseña debe contener al menos un número")
        .matches(/[A-Z]/)
        .withMessage("La contraseña debe contener al menos una mayúscula")
        .matches(/[^A-Za-z0-9]/)
        .withMessage("La contraseña debe contener al menos un carácter especial"),
];
exports.validateEmail = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Debe ser un email válido")
        .normalizeEmail(),
];
exports.registerValidator = [
    ...exports.validateEmail,
    //...validatePassword,
    (0, express_validator_1.body)("username")
        .isLength({ min: 3 })
        .withMessage("Username debe contener al menos 3 caracteres")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Username solo puede contener letras, números y guiones bajos"),
];
exports.loginValidator = [
    ...exports.validateEmail,
    (0, express_validator_1.body)("password").notEmpty().withMessage("La contraseña es requerida"),
];
