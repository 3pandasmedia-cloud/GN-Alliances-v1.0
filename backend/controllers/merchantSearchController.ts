import { Request, Response } from "express";
import prisma from "../config/prisma";

export const searchMerchants = async (
  req: Request,
  res: Response
) => {
  try {
    const q = String(req.query.q || "");

    const merchants = await prisma.partner.findMany({
      where: {
        OR: [
          { type: "MERCHANT" },
          { type: "CLIENT" },
        ],
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        type: true,
      },
      take: 10,
    });

    res.json(merchants);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};