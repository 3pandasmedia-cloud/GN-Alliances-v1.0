import { Router } from "express";

import {
  getProfile,
  updateProfile,
  uploadAvatar,
  updatePassword,
} from "../controllers/profileController";

import { verifyToken } from "../middleware/authMiddleware";

import { upload } from "../middleware/uploadMiddleware";

const router = Router();

router.get(
  "/",
  verifyToken,
  getProfile
);

router.put(
  "/",
  verifyToken,
  updateProfile
);

router.put(
  "/password",
  verifyToken,
  updatePassword
);

router.post(
  "/avatar",
  verifyToken,
  upload.single("avatar"),
  uploadAvatar
);

export default router;