import { Router } from "express";
import {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../controllers/members.controller";
import { authPermission } from "../middlewares/authorizePermission.middleware";

const router = Router();

router.get("/", /*authPermission("member:read"),*/ getMembers);
router.post("/", authPermission("member:create"), addMember);
router.put("/:id", updateMember);
router.delete("/:id", authPermission("member:delete"), deleteMember);

export default router;
