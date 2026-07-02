import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";

export const getProfile = async (
  req: any,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    return res.json(user);
  } catch {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateProfile = async (
  req: any,
  res: Response
) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        name: req.body.name,
      },
    });

    return res.json(user);
  } catch {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const uploadAvatar = async (
  req: any,
  res: Response
) => {
  try {
    const avatar =
      `/uploads/profile/${req.file.filename}`;

    const user =
      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          avatar,
        },
      });

    return res.json(user);
  } catch {
    return res.status(500).json({
      message: "Upload failed",
    });
  }
};

export const updatePassword = async (
  req: any,
  res: Response
) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user =
      await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const match =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!match) {
      return res.status(400).json({
        message:
          "Current password is incorrect",
      });
    }

    const hashed =
      await bcrypt.hash(
        newPassword,
        10
      );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashed,
      },
    });

    return res.json({
      message:
        "Password updated successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};