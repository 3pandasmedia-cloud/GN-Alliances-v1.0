import { Router } from "express";

import { getEmployees }
from "../controllers/employeeController";

import { verifyToken }
from "../middleware/authMiddleware";

import { allowRoles }
from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/",
  verifyToken,
  allowRoles("super-admin", "admin"),
  getEmployees
);

export default router;