import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getClients = async (
  req: Request,
  res: Response
) => {
  try {
    const clients =
      await prisma.user.findMany({
        where: {
          role: "client",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return res.json(clients);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};