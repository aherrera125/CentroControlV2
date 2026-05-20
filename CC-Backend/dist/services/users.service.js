"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.editUser = exports.addUser = exports.getAllUsers = void 0;
const users_model_1 = require("../models/users.model");
const getAllUsers = async () => {
    return await (0, users_model_1.findAllUsers)();
};
exports.getAllUsers = getAllUsers;
const addUser = async (data) => {
    return await (0, users_model_1.createUser)(data);
};
exports.addUser = addUser;
const editUser = async (id, data) => {
    return await (0, users_model_1.updateUser)(id, data);
};
exports.editUser = editUser;
const removeUser = async (id) => {
    return await (0, users_model_1.deleteUser)(id);
};
exports.removeUser = removeUser;
