import { Router } from "express";
import { getAllSocios, addSocio } from "../controllers/socios.controller";

const router = Router();

router.get("/", getAllSocios);
router.post("/", addSocio);

export default router;
