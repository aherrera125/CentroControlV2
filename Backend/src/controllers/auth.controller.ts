import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { validationResult } from "express-validator";

export const register = async (req: Request, res: Response) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, name, lastName, rolId } = req.body;

    if (!rolId) {
      return res.status(400).json({ error: "rolId es requerido" });
    }

    await authService.register(email, password, name, lastName, rolId);

    return res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error: any) {
    if (error && (error.code === "ER_DUP_ENTRY" || error.code === "ER_DUP_KEY")) {
      return res.status(409).json({ error: "El usuario o email ya existe" });
    }
    return res.status(500).json({ error: "Error al registrar el usuario", detail: error?.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await authService.login(email, password);

    return res.json({ user });
  } catch (error: any) {
    if (error && error.message === "Credenciales inválidas") {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    return res.status(500).json({ error: "Error al iniciar sesión", detail: error?.message });
  }
};
