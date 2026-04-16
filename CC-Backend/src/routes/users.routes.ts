import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authPermission } from "../middlewares/authorizePermission.middleware";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";

const router = Router();

router.get("/", /*authenticate, authPermission("user:read"),*/ getUsers);
router.post("/", authenticate, authPermission("user:create"), addUser);
router.put("/", authenticate, authPermission("user:update"), updateUser);
router.delete("/", authenticate, authPermission("user:delete"), deleteUser);

export default router;
