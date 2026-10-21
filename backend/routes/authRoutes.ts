import { Router } from "express";
import { AuthRequest, verifyToken } from "../middleware/authMiddleware";


import {
  login,
  verifyLoginOTP,
  resendLoginOTP,
} from "../controllers/authController";

const router = Router();
router.get("/access", verifyToken, (req: AuthRequest, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.json({ role: req.user!.role, adminModules: req.user!.adminModules ?? null });
});

router.get("/", (_, res) => {
  res.json({
    message: "Auth routes working",
  });
});

router.post(
  "/login",
  login
);

router.post(
  "/verify-login-otp",
  verifyLoginOTP
);

router.post(
  "/resend-login-otp",
  resendLoginOTP
);

export default router;
