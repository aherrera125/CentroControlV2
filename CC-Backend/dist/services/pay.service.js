"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePay = exports.editPay = exports.addPay = exports.getAllPay = void 0;
const pay_model_1 = require("../models/pay.model");
const getAllPay = async () => {
    return await (0, pay_model_1.findAllPay)();
};
exports.getAllPay = getAllPay;
const addPay = async (data) => {
    return await (0, pay_model_1.createPay)(data);
};
exports.addPay = addPay;
const editPay = async (payId, data) => {
    return await (0, pay_model_1.updatePay)(payId, data);
};
exports.editPay = editPay;
const removePay = async (id) => {
    return await (0, pay_model_1.deletePay)(id);
};
exports.removePay = removePay;
