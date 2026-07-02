import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getMerchantAnalytics = async (
  req: Request,
  res: Response
) => {
  try {
    const merchantId = String(req.params.partnerId);

    const campaigns =
      await prisma.campaign.count({
        where: {
          merchantId,
        },
      });

    const offers =
      await prisma.offer.count({
        where: {
          partnerId: merchantId,
        },
      });

    return res.json({
      campaigns,
      offers,

      views: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      redemptionRate: 0,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const getDashboardAnalytics = async (
  req: Request,
  res: Response
) => {
  try {

    const campaigns =
      await prisma.campaign.count();

    const offers =
      await prisma.offer.count();

    const merchants =
      await prisma.partner.count({
        where: {
          type: "MERCHANT",
        },
      });

    const banks =
      await prisma.partner.count({
        where: {
          type: "BANK",
        },
      });

    return res.json({
      campaigns,
      offers,
      merchants,
      banks,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};