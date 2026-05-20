import { Router } from "express";
import {
  getPay,
  addPay,
  updatePay,
  deletePay,
} from "../controllers/pay.controller";
import { authPermission } from "../middlewares/authorizePermission.middleware";

const router = Router();

router.get("/", /*authPermission("member:read"),*/ getPay);
router.post("/", authPermission("member:create"), addPay);
router.put("/:id", authPermission("member:update"), updatePay);
router.delete("/:id", authPermission("member:delete"), deletePay);

export default router;
