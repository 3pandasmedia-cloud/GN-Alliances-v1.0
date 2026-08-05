import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getLandingOffers = async (
  req: Request,
  res: Response
) => {
  try {
    const offers = await prisma.landingOffer.findMany({
      orderBy: {
        displayOrder: "asc",
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

export const getLandingOffer = async (
  req: Request,
  res: Response
) => {
  try {

    const offer =
      await prisma.landingOffer.findUnique({
        where: {
          id: String(req.params.id),
        },
      });

    if (!offer) {
      return res.status(404).json({
        message: "Offer not found",
      });
    }

    return res.json(offer);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const createLandingOffer = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      title,
      merchantId,
      merchantName,
      banner,
      destinationUrl,
      description,
      status,
      displayOrder,
      startDate,
      endDate,
    } = req.body;

    const offer =
      await prisma.landingOffer.create({
        data: {
          title,
          merchantId,
          merchantName,
          banner,
          destinationUrl,
          description,
          status,
          displayOrder,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
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

export const updateLandingOffer = async (
  req: Request,
  res: Response
) => {
  try {

    const id = String(req.params.id);

    const {
      title,
      merchantId,
      merchantName,
      banner,
      destinationUrl,
      description,
      status,
      displayOrder,
      startDate,
      endDate,
    } = req.body;

    const offer =
      await prisma.landingOffer.update({
        where: {
          id,
        },
        data: {
          title,
          merchantId,
          merchantName,
          banner,
          destinationUrl,
          description,
          status,
          displayOrder,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
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

export const deleteLandingOffer = async (
  req: Request,
  res: Response
) => {
  try {

    await prisma.landingOffer.delete({
      where: {
        id: String(req.params.id),
      },
    });

    return res.json({
      message: "Offer deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const recordOfferClick = async (
  req: Request,
  res: Response
) => {
  try {

    const id = String(req.params.id);

    const offer =
      await prisma.landingOffer.update({
        where: {
          id,
        },
        data: {
          clicks: {
            increment: 1,
          },
        },
      });

    return res.json({
      destinationUrl: offer.destinationUrl,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const recordOfferView = async (
  req: Request,
  res: Response
) => {
  try {

    await prisma.landingOffer.update({
      where: {
        id: String(req.params.id),
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return res.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });

  }
};

export const uploadLandingOfferBanner = async (
  req: any,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded.",
      });
    }

    return res.json({
      banner: `/uploads/landing-offers/${req.file.filename}`,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Upload failed.",
    });

  }
};

export const getPublicLandingOffers = async (
  req: Request,
  res: Response
) => {
  try {

    const today = new Date();

    const offers = await prisma.landingOffer.findMany({
      where: {
        status: "ACTIVE",

        startDate: {
          lte: today,
        },

        endDate: {
          gte: today,
        },
      },

      orderBy: {
        displayOrder: "asc",
      },
    });

    return res.json(offers);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });

  }
};