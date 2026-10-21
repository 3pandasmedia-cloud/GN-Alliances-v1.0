import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import { validModules } from "../config/adminAccess";

export const saveAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, status, twoFactor, twoFactorEmail, adminModules } = req.body;
    if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !["ACTIVE", "INACTIVE"].includes(status) || typeof twoFactor !== "boolean" || !validModules(adminModules) || typeof password !== "string" || (password && password.length < 8) || (twoFactor && (typeof twoFactorEmail !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(twoFactorEmail)))) {
      return res.status(400).json({ message: "Check the account details, password and sidebar permissions." });
    }
    const id = req.params.id ? String(req.params.id) : undefined;
    if (id && (await prisma.user.findUnique({ where: { id } }))?.role !== "admin") return res.status(404).json({ message: "Admin account not found." });
    if (!id && !password) return res.status(400).json({ message: "A password of at least 8 characters is required." });
    const data = { name: name.trim(), email: email.trim().toLowerCase(), status, twoFactor, twoFactorEmail: twoFactor ? twoFactorEmail.trim().toLowerCase() : null, adminModules, ...(password ? { password: await bcrypt.hash(password, 12) } : {}) };
    const user = id ? await prisma.user.update({ where: { id }, data }) : await prisma.user.create({ data: { ...data, role: "admin", password: data.password! } });
    const { password: _, otpCode, otpExpiresAt, ...safe } = user;
    return res.json(safe);
  } catch (error: any) {
    return res.status(error?.code === "P2002" ? 409 : 500).json({ message: error?.code === "P2002" ? "This email is already in use." : "Unable to save Admin account." });
  }
};

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
