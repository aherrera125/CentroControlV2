import { IUser } from "../types/IUser";
import { findAllUsers, createUser } from "../models/users.model";

export const getAllUsers = async () => {
  return await findAllUsers();
};

export const addUser = async (data: IUser) => {
  return await createUser(data);
};
