import { Router } from "express";
import * as employeeController from "../controllers/employees.controller";

const router = Router();

router.get("/", employeeController.getAll);
router.get("/:id", employeeController.getById);
router.post("/", employeeController.create);
router.put("/:id", employeeController.update);
router.delete("/:id", employeeController.detele);

export default router;
