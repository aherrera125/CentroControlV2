import { Request, Response } from "express";
import * as payService from "../services/pay.service";
import { IPay } from "../types/IPay";

export const getPay = async (_req: Request, res: Response) => {
  try {
    const data = await payService.getAllPay();
    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error al obtener los pagos:", error);
    return res.status(500).json({ message: `Error al obtener los pagos.` });
  }
};

export const addPay = async (req: Request, res: Response) => {
  try {
    const payData: IPay = req.body;
    const payId = await payService.addPay(payData);
    return res.status(201).json({ id: payId, message: `Pago creado correctamente.` });
  } catch (error) {
    console.error("Error al crear el pago:", error);
    return res.status(500).json({ message: `Error al crear el pago.` });
  }
};

export const updatePay = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const payData: IPay = req.body;
    const payUpdated = await payService.editPay(id, payData);
    if (!payUpdated) {
      return res.status(404).json({ message: `Pago no encontrado.` });
    }
    return res.status(200).json({ payUpdated });
  } catch (error) {
    console.error("Error al actualizar el pago:", error);
    return res.status(500).json({ message: `Error al actualizar el pago.` });
  }
};

export const deletePay = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const payDeleted = await payService.removePay(id);
    if (!payDeleted) {
      return res.status(404).json({ message: `Pago no encontrado.` });
    }
    return res.status(200).json({ message: `El pago con id ${id} se eliminó exitosamente.` });
  } catch (error) {
    console.error("Error al eliminar el pago:", error);
    return res.status(500).json({ message: `Error al eliminar el pago.` });
  }
};
