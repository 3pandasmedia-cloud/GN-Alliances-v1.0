import { Router } from "express";

import { getClients }
from "../controllers/clientController";

import { verifyToken }
from "../middleware/authMiddleware";

import { allowRoles }
from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/",
  verifyToken,
  allowRoles("super-admin"),
  getClients
);

export default router;