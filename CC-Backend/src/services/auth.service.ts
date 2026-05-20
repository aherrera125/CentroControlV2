import bcrypt from "bcrypt";
import * as userModel from "../models/users.model";

export const register = async (
  email: string,
  password: string,
  name: string,
  lastName: string,
  rolId: string,
): Promise<number> => {
  const hashedPassword = await bcrypt.hash(password, 10);
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

export const login = async (
  email: string,
  password: string,
): Promise<{ id: number; email: string; role?: string } | null> => {
  const invalidCredentialsError = new Error("Credenciales inválidas");

  const user = await userModel.findUserByEmail(email);
  if (!user) throw invalidCredentialsError;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw invalidCredentialsError;

  // Devolver información mínima del usuario (sin JWT)
  return { id: user.id as number, email: user.email, role: user.role };
};
