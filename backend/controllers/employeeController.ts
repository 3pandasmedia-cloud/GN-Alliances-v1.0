import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getEmployees = async (
  req: Request,
  res: Response
) => {
  try {
    const employees =
      await prisma.user.findMany({
        where: {
          role: "employee",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return res.json(employees);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};