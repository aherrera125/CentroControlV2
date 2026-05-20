"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMember = exports.editMember = exports.addMember = exports.getAllMembers = void 0;
const members_model_1 = require("../models/members.model");
const getAllMembers = async () => {
    return await (0, members_model_1.findAllMembers)();
};
exports.getAllMembers = getAllMembers;
const addMember = async (data) => {
    return await (0, members_model_1.createMember)(data);
};
exports.addMember = addMember;
const editMember = async (memberId, data) => {
    return await (0, members_model_1.updateMember)(memberId, data);
};
exports.editMember = editMember;
const removeMember = async (id) => {
    return await (0, members_model_1.deleteMember)(id);
};
exports.removeMember = removeMember;
