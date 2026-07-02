import { Router } from "express";

import { getAdmins } from "../controllers/adminController";

import { verifyToken } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/",
  verifyToken,
  allowRoles("super-admin"),
  getAdmins
);

export default router;