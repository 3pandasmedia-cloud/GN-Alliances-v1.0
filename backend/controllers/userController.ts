import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/authMiddleware";

export const getUsers = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          notIn: req.user?.role === "super-admin" ? ["super-admin"] : ["super-admin", "admin"],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(users.map(({ password, otpCode, otpExpiresAt, ...user }) => user));
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getAdminUsers = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          notIn: [
            "super-admin",
            "admin",
          ],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(users.map(({ password, otpCode, otpExpiresAt, ...user }) => user));
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const createUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    if (!["admin", "employee", "client", "partner"].includes(role) || (req.user?.role !== "super-admin" && role === "admin")) {
      return res.status(403).json({ message: "Only 3Pandas Media can manage admins." });
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    const { password: _password, otpCode, otpExpiresAt, ...safeUser } = user;
    return res.json(safeUser);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user?.role === "super-admin" || (user?.role === "admin" && req.user?.role !== "super-admin")) {
      return res.status(403).json({
        message: "Super Admin cannot be deleted",
      });
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return res.json({
      message: "User deleted",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const {
      name,
      email,
      role,
      status,
    } = req.body;

    const target = await prisma.user.findUnique({ where: { id } });
    if (target?.role === "super-admin" || (req.user?.role !== "super-admin" && (target?.role === "admin" || role === "admin")) || (role !== undefined && !["admin", "employee", "client", "partner"].includes(role))) {
      return res.status(403).json({ message: "Only 3Pandas Media can manage admins." });
    }
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        role,
        status,
      },
    });

    const { password: _password, otpCode, otpExpiresAt, ...safeUser } = user;
    return res.json(safeUser);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};