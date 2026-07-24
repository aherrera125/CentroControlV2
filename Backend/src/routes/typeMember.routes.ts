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
router.post("/", /*authPermission("member:create"),*/ addTypeMember);
router.put("/:id", /*authPermission("member:update"),*/ updateTypeMember);
router.delete("/:id", /*authPermission("member:delete"),*/ deleteTypeMember);

export default router;
