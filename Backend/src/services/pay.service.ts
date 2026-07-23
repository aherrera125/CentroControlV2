import {
  findAllPay,
  createPay,
  updatePay,
  deletePay,
} from "../models/pay.model";
import { IPay } from "../types/IPay";

export const getAllPay = async () => {
  return await findAllPay();
};

export const addPay = async (data: IPay) => {
  return await createPay(data);
};

export const editPay = async (payId: string, data: IPay) => {
  return await updatePay(payId, data);
};

export const removePay = async (id: string) => {
  return await deletePay(id);
};
