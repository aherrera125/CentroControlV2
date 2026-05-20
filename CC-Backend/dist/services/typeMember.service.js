"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTypeMember = exports.editTypeMember = exports.addTypeMember = exports.getAllTypeMember = void 0;
const typeMember_model_1 = require("../models/typeMember.model");
const getAllTypeMember = async () => {
    return await (0, typeMember_model_1.findAllTypeMember)();
};
exports.getAllTypeMember = getAllTypeMember;
const addTypeMember = async (data) => {
    return await (0, typeMember_model_1.createTypeMember)(data);
};
exports.addTypeMember = addTypeMember;
const editTypeMember = async (memberId, data) => {
    return await (0, typeMember_model_1.updateTypeMember)(memberId, data);
};
exports.editTypeMember = editTypeMember;
const removeTypeMember = async (id) => {
    return await (0, typeMember_model_1.deleteTypeMember)(id);
};
exports.removeTypeMember = removeTypeMember;
