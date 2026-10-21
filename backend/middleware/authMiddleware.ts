import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    adminModules?: unknown;
  };
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      id: string;
      role: string;
    };

    const user = await prisma.user.findUnique({ where: { id: decoded.id }, select: { id: true, role: true, status: true, adminModules: true } });
    if (!user || user.status !== "ACTIVE") return res.status(401).json({ message: "Unauthorized" });
    req.user = { id: user.id, role: user.role, adminModules: user.adminModules };

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
