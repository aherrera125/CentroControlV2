import { Router } from "express";
import * as typeEmployeeController from "../controllers/typeEmployees.controller";

const router: Router = Router();

router.get("/", typeEmployeeController.getAll);
router.get("/:id", typeEmployeeController.getById);
router.post("/", typeEmployeeController.create);
router.put("/:id", typeEmployeeController.update);
router.delete("/:id", typeEmployeeController.detele);

export default router;
