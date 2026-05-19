import { Router } from "express";
import {
  getTypeMember,
  addTypeMember,
  updateTypeMember,
  deleteTypeMember,  
} from "../controllers/typeMember.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authPermission } from "../middlewares/authorizePermission.middleware";

const router = Router();

router.get("/", /*authenticate, authPermission("member:read"),*/ getTypeMember);
router.post("/", authenticate, authPermission("member:create"), addTypeMember);
router.put("/", authenticate, authPermission("member:update"), updateTypeMember);
router.delete("/", authenticate, authPermission("member:delete"), deleteTypeMember);

export default router;
