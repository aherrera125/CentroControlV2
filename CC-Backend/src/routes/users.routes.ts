import { Router } from "express";
import { getAllUsers, addUser } from "../controllers/users.controller";

const router = Router();

router.get("/", getAllUsers);
router.post("/", addUser);

export default router;
