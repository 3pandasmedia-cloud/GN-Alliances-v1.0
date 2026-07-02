import { Router } from "express";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getAdminUsers,
} from "../controllers/userController";

import { verifyToken } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/",
  verifyToken,
  allowRoles("super-admin", "admin"),
  getUsers
);

router.get(
  "/admin-view",
  verifyToken,
  allowRoles("super-admin", "admin"),
  getAdminUsers
);

router.post(
  "/",
  verifyToken,
  allowRoles("super-admin", "admin"),
  createUser
);

router.put(
  "/:id",
  verifyToken,
  allowRoles("super-admin", "admin"),
  updateUser
);

router.delete(
  "/:id",
  verifyToken,
  allowRoles("super-admin", "admin"),
  deleteUser
);

export default router;