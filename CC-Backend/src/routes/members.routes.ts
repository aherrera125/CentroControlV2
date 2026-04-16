import { Router } from "express";
import {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../controllers/members.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authPermission } from "../middlewares/authorizePermission.middleware";

const router = Router();

router.get("/", /*authenticate, authPermission("member:read"),*/ getMembers);
router.post("/", authenticate, authPermission("member:create"), addMember);
router.put("/", authenticate, authPermission("member:update"), updateMember);
router.delete("/", authenticate, authPermission("member:delete"), deleteMember);

export default router;
