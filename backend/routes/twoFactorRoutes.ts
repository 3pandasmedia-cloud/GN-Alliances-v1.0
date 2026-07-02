import { Router } from "express";

import {
  sendTwoFactorOTP,
  verifyTwoFactorOTP,
  disableTwoFactor,
} from "../controllers/twoFactorController";

import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/send-otp",
  verifyToken,
  sendTwoFactorOTP
);

router.post(
  "/verify-otp",
  verifyToken,
  verifyTwoFactorOTP
);

router.put(
  "/disable",
  verifyToken,
  disableTwoFactor
);

export default router;