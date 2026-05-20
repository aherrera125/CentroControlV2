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
exports.deleteMember = exports.updateMember = exports.addMember = exports.getMembers = void 0;
const memberService = __importStar(require("../services/members.service"));
const getMembers = async (_req, res) => {
    try {
        const data = await memberService.getAllMembers();
        return res.status(200).json({ data });
    }
    catch (error) {
        console.error("Error al obtener los socios:", error);
        return res.status(500).json({ message: `Error al obtener los socios.` });
    }
};
exports.getMembers = getMembers;
const addMember = (req, res) => {
    const data = memberService.addMember(req.body);
    res.status(201).json(data);
};
exports.addMember = addMember;
const updateMember = async (req, res) => {
    const { id } = req.params;
    try {
        const memberData = req.body;
        const memberUpdated = await memberService.editMember(id, memberData);
        if (!memberUpdated) {
            return res.status(404).json({ message: `Socio no encontrado.` });
        }
        return res.status(200).json({
            memberUpdated,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `Error al actualizar los datos del socio.`,
        });
    }
};
exports.updateMember = updateMember;
const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        const memberDeleted = await memberService.removeMember(id);
        if (!memberDeleted) {
            res.status(404).json({ message: `Socio no encontrado.` });
        }
        return res.status(200).json({
            message: `Los datos del socio con id ${id} se eliminaron exitosamente.`,
        });
    }
    catch (error) {
        return res.status(500).json({ message: `Error al eliminar el socio.` });
    }
};
exports.deleteMember = deleteMember;
