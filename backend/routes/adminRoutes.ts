import { Router } from "express";

import { getAdmins, saveAdmin } from "../controllers/adminController";

import { verifyToken } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";

const router = Router();
router.post("/", verifyToken, allowRoles("super-admin"), saveAdmin);
router.put("/:id", verifyToken, allowRoles("super-admin"), saveAdmin);

router.get(
  "/",
  verifyToken,
  allowRoles("super-admin"),
  getAdmins
);

export default router;
