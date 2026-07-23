import { Router } from "express";
import {
  getTypeMember,
  addTypeMember,
  updateTypeMember,
  deleteTypeMember,  
} from "../controllers/typeMember.controller";
import { authPermission } from "../middlewares/authorizePermission.middleware";

const router = Router();

router.get("/", /*authPermission("member:read"),*/ getTypeMember);
router.post("/", authPermission("member:create"), addTypeMember);
router.put("/", authPermission("member:update"), updateTypeMember);
router.delete("/", authPermission("member:delete"), deleteTypeMember);

export default router;
