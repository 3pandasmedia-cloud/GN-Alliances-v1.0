import { Response, NextFunction } from "express";
import { AuthRequest, verifyToken } from "./authMiddleware";

// Entity changes belong to 3Pandas Media; personal profile/security routes are separate.
export const requireEntityOwner = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  return verifyToken(req, res, () => {
    if (req.user?.role !== "super-admin") {
      return res.status(403).json({ message: "Only 3Pandas Media can add, edit, or delete entities." });
    }
    next();
  });
};
