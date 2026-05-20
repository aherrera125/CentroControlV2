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
exports.deleteTypeMember = exports.updateTypeMember = exports.addTypeMember = exports.getTypeMember = void 0;
const typeMemberService = __importStar(require("../services/typeMember.service"));
const getTypeMember = async (_req, res) => {
    try {
        const data = await typeMemberService.getAllTypeMember();
        return res.status(200).json({ data });
    }
    catch (error) {
        console.error("Error al obtener los tipos de socios:", error);
        return res.status(500).json({ message: `Error al obtener los tipos de socio.` });
    }
};
exports.getTypeMember = getTypeMember;
const addTypeMember = (req, res) => {
    const data = typeMemberService.addTypeMember(req.body);
    res.status(201).json(data);
};
exports.addTypeMember = addTypeMember;
const updateTypeMember = async (req, res) => {
    const { id } = req.params;
    try {
        const typeMemberData = req.body;
        const typeMemberUpdated = await typeMemberService.editTypeMember(id, typeMemberData);
        if (!typeMemberUpdated) {
            return res.status(404).json({ message: `Tipo de socio no encontrado.` });
        }
        return res.status(200).json({
            typeMemberUpdated,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `Error al actualizar los datos del tipo de socio.`,
        });
    }
};
exports.updateTypeMember = updateTypeMember;
const deleteTypeMember = async (req, res) => {
    try {
        const { id } = req.params;
        const typeMemberDeleted = await typeMemberService.removeTypeMember(id);
        if (!typeMemberDeleted) {
            res.status(404).json({ message: `Tipo de socio no encontrado.` });
        }
        return res.status(200).json({
            message: `Los datos del tipo de socio con id ${id} se eliminaron exitosamente.`,
        });
    }
    catch (error) {
        return res.status(500).json({ message: `Error al eliminar el tipo de socio.` });
    }
};
exports.deleteTypeMember = deleteTypeMember;
