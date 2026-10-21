import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAdmins = async (
  req: Request,
  res: Response
) => {
  try {
    const admins =
      await prisma.user.findMany({
        where: {
          role: "admin",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return res.json(admins.map(({ password, otpCode, otpExpiresAt, ...user }) => user));
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};