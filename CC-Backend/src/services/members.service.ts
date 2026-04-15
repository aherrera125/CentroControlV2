import { findAllMembers, createMember } from "../models/members.model";
import { IMember } from "../types/IMember";

export const getAllMembers = async () => {
  return await findAllMembers();
};

export const addMember = async (data: IMember) => {
  return await createMember(data);
};
