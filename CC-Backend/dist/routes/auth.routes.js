"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_validator_1 = require("../validator/auth.validator");
const authorizePermission_middleware_1 = require("../middlewares/authorizePermission.middleware");
const router = (0, express_1.Router)();
//auth/register
router.post("/register", (0, authorizePermission_middleware_1.authPermission)("user:create"), auth_validator_1.registerValidator, auth_controller_1.register);
//auth/login
router.post("/login", auth_validator_1.loginValidator, auth_controller_1.login);
exports.default = router;
