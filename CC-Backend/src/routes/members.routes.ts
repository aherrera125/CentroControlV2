import { Router } from "express";
import { getAllMembers, addMember } from "../controllers/members.controller";

const router = Router();

router.get("/", getAllMembers);
router.post("/", addMember);

export default router;
