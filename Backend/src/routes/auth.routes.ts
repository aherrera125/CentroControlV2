import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { registerValidator, loginValidator } from "../validator/auth.validator";
import { authPermission } from "../middlewares/authorizePermission.middleware";

const router = Router();

//auth/register
router.post("/register", authPermission("user:create"), registerValidator, register);
//auth/login
router.post("/login", loginValidator, login);

export default router;
