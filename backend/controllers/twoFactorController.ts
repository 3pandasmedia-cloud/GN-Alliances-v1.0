import { Request, Response } from "express";
import prisma from "../config/prisma";
import { sendOTPEmail } from "../utils/sendMail";

export const sendTwoFactorOTP = async (
  req: any,
  res: Response
) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expires =
      new Date(
        Date.now() + 10 * 60 * 1000
      );

    await prisma.user.update({
      where: {
        id: req.user.id,
      },

      data: {
        otpCode: otp,
        otpExpiresAt: expires,
      },
    });

    await sendOTPEmail(
      email,
      otp
    );

    return res.json({
      message: "OTP sent",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to send OTP",
    });
  }
};

export const verifyTwoFactorOTP = async (
  req: any,
  res: Response
) => {
  try {
    const {
      email,
      otp,
    } = req.body;

    const user =
      await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });

    if (
      !user ||
      user.otpCode !== otp
    ) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (
      user.otpExpiresAt &&
      user.otpExpiresAt <
      new Date()
    ) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        twoFactor: true,
        twoFactorEmail: email,
        otpCode: null,
        otpExpiresAt: null,
      },
    });

    return res.json({
      message:
        "Two-factor authentication enabled",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Verification failed",
    });
  }
};

export const disableTwoFactor =
  async (
    req: any,
    res: Response
  ) => {
    try {
      await prisma.user.update({
        where: {
          id: req.user.id,
        },

        data: {
          twoFactor: false,
          twoFactorEmail: null,
        },
      });

      return res.json({
        message:
          "Two-factor authentication disabled",
      });
    } catch {
      return res.status(500).json({
        message: "Server error",
      });
    }
  };