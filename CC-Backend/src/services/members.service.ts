import {
  findAllMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../models/members.model";
import { IMember } from "../types/IMember";

export const getAllMembers = async () => {
  return await findAllMembers();
};

export const addMember = async (data: IMember) => {
  return await createMember(data);
};

export const editMember = async (memberId: string, data: IMember) => {
  return await updateMember(memberId, data);
};

export const removeMember = async (id: string) => {
  return await deleteMember(id);
};
