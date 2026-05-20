import { Router } from "express";
import { authPermission } from "../middlewares/authorizePermission.middleware";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";

const router = Router();

router.get("/", /*authPermission("user:read"),*/ getUsers);
router.post("/", authPermission("user:create"), addUser);
router.put("/", authPermission("user:update"), updateUser);
router.delete("/", authPermission("user:delete"), deleteUser);

export default router;
