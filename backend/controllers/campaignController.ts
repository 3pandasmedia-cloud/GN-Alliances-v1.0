import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getCampaigns = async (
  req: Request,
  res: Response
) => {
  try {

    const merchantId = req.params.partnerId;
    const bankId = req.params.bankId;

    let campaigns;

    if (merchantId) {

      campaigns = await prisma.campaign.findMany({
        where: {
          merchantId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    } else if (bankId) {

      campaigns = await prisma.campaign.findMany({
        where: {
          bankId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    } else {

      campaigns = await prisma.campaign.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    }

    return res.json(campaigns);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const createCampaign = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      description,

      bankId,
      merchantId,

      campaignType,

      budget,
      priority,

      startDate,
      endDate,
    } = req.body;

    const bank =
      await prisma.partner.findUnique({
        where: {
          id: bankId,
        },
      });

    if (!bank) {
      return res.status(404).json({
        message: "Bank not found",
      });
    }

    const merchant =
      await prisma.partner.findUnique({
        where: {
          id: merchantId,
        },
      });

    if (!merchant) {
      return res.status(404).json({
        message: "Merchant not found",
      });
    }

    const campaign =
      await prisma.campaign.create({
        data: {
          name,
          description,

          bankId,
          bankName: bank.name,

          merchantId,
          merchantName: merchant.name,

          campaignType:
            campaignType || "BANK",

          budget:
            budget !== undefined
              ? Number(budget)
              : null,

          priority:
            priority
              ? Number(priority)
              : 1,

          startDate: new Date(startDate),
          endDate: new Date(endDate),

          status: "DRAFT",
        },
      });

    return res.json(campaign);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const updateCampaign = async (
  req: Request,
  res: Response
) => {
  try {

    const id = String(req.params.id);

    const {
      name,
      description,

      bankId,
      bankName,

      merchantId,
      merchantName,

      campaignType,

      budget,
      priority,

      startDate,
      endDate,

      status,
    } = req.body;

    const campaign =
      await prisma.campaign.update({
        where: {
          id,
        },
        data: {
          name,
          description,

          bankId,
          bankName,

          merchantId,
          merchantName,

          campaignType,

          budget,
          priority,

          startDate: new Date(startDate),
          endDate: new Date(endDate),

          status,
        },
      });

    return res.json(campaign);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const deleteCampaign = async (
  req: Request,
  res: Response
) => {
  try {

    await prisma.campaign.delete({
      where: {
        id: String(req.params.id),
      },
    });

    return res.json({
      message: "Campaign deleted",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const getCampaignStats = async (
  req: Request,
  res: Response
) => {
  try {

    const total =
      await prisma.campaign.count();

    const draft =
      await prisma.campaign.count({
        where: {
          status: "DRAFT",
        },
      });

    const active =
      await prisma.campaign.count({
        where: {
          status: "ACTIVE",
        },
      });

    const inactive =
      await prisma.campaign.count({
        where: {
          status: "INACTIVE",
        },
      });

    return res.json({
      total,
      draft,
      active,
      inactive,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};