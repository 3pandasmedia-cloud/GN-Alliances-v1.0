import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getOffers = async (
  req: Request,
  res: Response
) => {
  try {

    const offers =
      await prisma.offer.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return res.json(offers);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const getOfferStats = async (
  req: Request,
  res: Response
) => {
  try {

    const total =
      await prisma.offer.count();

    const active =
      await prisma.offer.count({
        where: {
          status: "ACTIVE",
        },
      });

    return res.json({
      total,
      active,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const createOffer = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      title,
      description,
      points,

      campaignId,
      partnerId,
    } = req.body;

    const merchant =
      await prisma.partner.findUnique({
        where: {
          id: partnerId,
        },
      });

    if (!merchant) {
      return res.status(404).json({
        message: "Merchant not found",
      });
    }

    const offer =
      await prisma.offer.create({
        data: {
          title,
          description,

          campaignId,

          partnerId,
          partnerName: merchant.name,

          points: Number(points),

          status: "ACTIVE",
        },
      });

    return res.json(offer);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const updateOffer = async (
  req: Request,
  res: Response
) => {
  try {

    const id = String(req.params.id);

    const {
      title,
      description,
      points,
      status,
    } = req.body;

    const offer =
      await prisma.offer.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          points: Number(points),
          status,
        },
      });

    return res.json(offer);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const updateOfferStatus = async (
  req: Request,
  res: Response
) => {
  try {

    const offer =
      await prisma.offer.update({
        where: {
          id: String(req.params.id),
        },
        data: {
          status: req.body.status,
        },
      });

    return res.json(offer);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const deleteOffer = async (
  req: Request,
  res: Response
) => {
  try {

    await prisma.offer.delete({
      where: {
        id: String(req.params.id),
      },
    });

    return res.json({
      message: "Offer deleted",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};