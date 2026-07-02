import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const getPartnerStats = async (
  req: Request,
  res: Response
) => {
  try {
    const total = await prisma.partner.count({
      where: {
        type: "MERCHANT",
      },
    });

    const active = await prisma.partner.count({
      where: {
        type: "MERCHANT",
        status: "ACTIVE",
      },
    });

    const inactive = await prisma.partner.count({
      where: {
        type: "MERCHANT",
        status: "INACTIVE",
      },
    });

    return res.json({
      total,
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

export const getPartnerBySlug = async (
  req: Request,
  res: Response
) => {
  try {
    const { slug } = req.params;

    const partner =
      await prisma.partner.findUnique({
        where: {
          slug,
        },
      });

    if (!partner) {
      return res.status(404).json({
        message: "Partner not found",
      });
    }

    return res.json(partner);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const getBankOverview = async (
  req: Request,
  res: Response
) => {
  try {
    const bankId = req.params.id;

    const activeCampaigns =
      await prisma.campaign.count({
        where: {
          bankId,
          status: "ACTIVE",
        },
      });

    const merchants =
      await prisma.partner.count({
        where: {
          clientId: bankId,
          type: "MERCHANT",
        },
      });

    const offers =
      await prisma.offer.count({
        where: {
          campaign: {
            bankId,
          },
          status: "ACTIVE",
        },
      });

    const transactions = 0;

    const recentCampaigns =
      await prisma.campaign.findMany({
        where: {
          bankId,
        },
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          status: true,
          createdAt: true,
        },
      });

    const merchantActivity =
      await prisma.partner.findMany({
        where: {
          clientId: bankId,
          type: "MERCHANT",
        },
        take: 5,
        orderBy: {
          updatedAt: "desc",
        },
        select: {
          name: true,
          updatedAt: true,
        },
      });

    const merchantApis =
      await prisma.partner.count({
        where: {
          clientId: bankId,
          apiEnabled: true,
          type: "MERCHANT",
        },
      });

    res.json({
      activeCampaigns,
      merchants,
      offers,
      transactions,
      recentCampaigns,
      merchantActivity,
      apiStatus: "Connected",
      lastSync: new Date(),
      webhook: "Configured",
      merchantApis,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

export const getPartners = async (
  req: Request,
  res: Response
) => {
  try {

    const partners =
      await prisma.partner.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return res.json(partners);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const getPartnersByType = async (
  req: Request,
  res: Response
) => {
  try {

    const { type } = req.params;

    const partners =
      await prisma.partner.findMany({
        where: {
          type: type.toUpperCase(),
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return res.json(partners);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const getPartnerById = async (
  req: Request,
  res: Response
) => {
  try {

    const partner =
      await prisma.partner.findUnique({
        where: {
          id: String(req.params.id),
        },
      });

    return res.json(partner);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const createPartner = async (
  req: any,
  res: Response
) => {
  try {

    const {
      name,
      email,
      username,
      password,
      type,
    } = req.body;

    const existing =
      await prisma.partner.findFirst({
        where: {
          OR: [
            {
              email,
            },
            {
              username,
            },
          ],
        },
      });

    if (existing) {
      return res.status(400).json({
        message: "Partner already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-");

    const logo = req.file
      ? `/uploads/merchants/${req.file.filename}`
      : null;

    const partner =
      await prisma.partner.create({
        data: {
          name,
          slug,
          email,
          username,
          password: hashedPassword,
          logo,
          status: "ACTIVE",
          type: type || "MERCHANT",
        },
      });

    return res.json(partner);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const updatePartner = async (
  req: Request,
  res: Response
) => {
  try {

    const id = String(req.params.id);

    const {
      name,
      email,
      username,
      logo,
      status,
      type,
      apiEnabled,
      apiKey,
      webhookUrl,
      merchantApiUrl,
      bankId,
      bankName,
    } = req.body;

    const partner =
      await prisma.partner.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          username,
          logo,
          status,
          type,
          apiEnabled,
          apiKey,
          webhookUrl,
          merchantApiUrl,
          bankId,
          bankName,
        },
      });

    return res.json(partner);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const updatePartnerPassword = async (
  req: Request,
  res: Response
) => {
  try {

    const id = String(req.params.id);

    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await prisma.partner.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return res.json({
      message: "Password updated successfully.",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const generateApiKey = async (
  req: Request,
  res: Response
) => {
  try {

    const id = String(req.params.id);

    const apiKey =
      "GN_" +
      crypto.randomBytes(24)
        .toString("hex")
        .toUpperCase();

    const partner =
      await prisma.partner.update({
        where: {
          id,
        },
        data: {
          apiKey,
          apiEnabled: true,
        },
      });

    return res.json({
      apiKey: partner.apiKey,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const deletePartner = async (
  req: Request,
  res: Response
) => {
  try {

    const id = String(req.params.id);

    const campaigns =
      await prisma.campaign.count({
        where: {
          OR: [
            {
              bankId: id,
            },
            {
              merchantId: id,
            },
          ],
        },
      });

    const offers =
      await prisma.offer.count({
        where: {
          partnerId: id,
        },
      });

    if (campaigns > 0 || offers > 0) {
      return res.status(400).json({
        message:
          "This partner still has campaigns or offers. Delete them first.",
      });
    }

    await prisma.partner.delete({
      where: {
        id,
      },
    });

    return res.json({
      message: "Partner deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const uploadMerchantLogo = async (
  req: any,
  res: Response
) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    return res.json({
      logo: `/uploads/merchants/${req.file.filename}`,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Upload failed",
    });

  }
};