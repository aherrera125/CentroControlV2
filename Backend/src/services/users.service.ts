import { IUser } from "../types/IUser";
import {
  findAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../models/users.model";

export const getAllUsers = async () => {
  return await findAllUsers();
};

export const addUser = async (data: IUser) => {
  return await createUser(data);
};

export const editUser = async (id: string, data: IUser) => {
  return await updateUser(id, data);
};

export const removeUser = async (id: string) => {
  return await deleteUser(id);
};
