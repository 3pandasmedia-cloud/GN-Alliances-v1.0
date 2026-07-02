import { Router } from "express";


import {
  login,
  verifyLoginOTP,
  resendLoginOTP,
} from "../controllers/authController";

const router = Router();

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