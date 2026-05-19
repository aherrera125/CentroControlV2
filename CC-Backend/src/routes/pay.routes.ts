import { Router } from "express";
import {
  getPay,
  addPay,
  updatePay,
  deletePay,
} from "../controllers/pay.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authPermission } from "../middlewares/authorizePermission.middleware";

const router = Router();

router.get("/", /*authenticate, authPermission("member:read"),*/ getPay);
router.post("/", authenticate, authPermission("member:create"), addPay);
router.put("/:id", authenticate, authPermission("member:update"), updatePay);
router.delete("/:id", authenticate, authPermission("member:delete"), deletePay);

export default router;
