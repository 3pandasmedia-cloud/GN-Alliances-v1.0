import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const partners = await prisma.partner.count();

    const campaigns = await prisma.campaign.count();

    const offers = await prisma.offer.count();

    const users = await prisma.user.count({
      where: {
        role: {
          notIn: [
            "super-admin",
            "admin",
          ],
        },
      },
    });

    return res.json({
      partners,
      campaigns,
      offers,
      users,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const getMerchantDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {

    const merchantId = String(req.params.id);

    const campaigns = await prisma.campaign.count({
      where: {
        merchantId,
      },
    });

    const offers = await prisma.offer.count({
      where: {
        partnerId: merchantId,
      },
    });

    return res.json({
      campaigns,
      offers,
      redemptions: 0,
      revenue: 0,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};