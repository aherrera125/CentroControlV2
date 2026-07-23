import {
  findAllTypeMember,
  createTypeMember,
  updateTypeMember,
  deleteTypeMember,
} from "../models/typeMember.model";
import { ITypeMember } from "../types/ITypeMember";

export const getAllTypeMember = async () => {
  return await findAllTypeMember();
};

export const addTypeMember = async (data: ITypeMember) => {
  return await createTypeMember(data);
};

export const editTypeMember = async (memberId: string, data: ITypeMember) => {
  return await updateTypeMember(memberId, data);
};

export const removeTypeMember = async (id: string) => {
  return await deleteTypeMember(id);
};
