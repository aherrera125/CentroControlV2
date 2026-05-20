"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePay = exports.updatePay = exports.addPay = exports.getPay = void 0;
const payService = __importStar(require("../services/pay.service"));
const getPay = async (_req, res) => {
    try {
        const data = await payService.getAllPay();
        return res.status(200).json({ data });
    }
    catch (error) {
        console.error("Error al obtener los pagos:", error);
        return res.status(500).json({ message: `Error al obtener los pagos.` });
    }
};
exports.getPay = getPay;
const addPay = async (req, res) => {
    try {
        const payData = req.body;
        const payId = await payService.addPay(payData);
        return res.status(201).json({ id: payId, message: `Pago creado correctamente.` });
    }
    catch (error) {
        console.error("Error al crear el pago:", error);
        return res.status(500).json({ message: `Error al crear el pago.` });
    }
};
exports.addPay = addPay;
const updatePay = async (req, res) => {
    const { id } = req.params;
    try {
        const payData = req.body;
        const payUpdated = await payService.editPay(id, payData);
        if (!payUpdated) {
            return res.status(404).json({ message: `Pago no encontrado.` });
        }
        return res.status(200).json({ payUpdated });
    }
    catch (error) {
        console.error("Error al actualizar el pago:", error);
        return res.status(500).json({ message: `Error al actualizar el pago.` });
    }
};
exports.updatePay = updatePay;
const deletePay = async (req, res) => {
    const { id } = req.params;
    try {
        const payDeleted = await payService.removePay(id);
        if (!payDeleted) {
            return res.status(404).json({ message: `Pago no encontrado.` });
        }
        return res.status(200).json({ message: `El pago con id ${id} se eliminó exitosamente.` });
    }
    catch (error) {
        console.error("Error al eliminar el pago:", error);
        return res.status(500).json({ message: `Error al eliminar el pago.` });
    }
};
exports.deletePay = deletePay;
