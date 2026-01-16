import { Router } from "express";
import { getAllEmployees } from "../controllers/employees.controller";

const router = Router();

router.get("/", getAllEmployees);

export default router;
