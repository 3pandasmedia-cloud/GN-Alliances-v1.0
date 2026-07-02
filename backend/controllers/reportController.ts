import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getReports = async (
  req: Request,
  res: Response
) => {
  try {
    const reports =
      await prisma.campaignReport.findMany({
        orderBy: {
          reportDate: "desc",
        },
      });

    res.json(reports);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const createReport = async (
  req: Request,
  res: Response
) => {
  try {
    const report =
      await prisma.campaignReport.create({
        data: req.body,
      });

    res.json(report);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteReport = async (
  req: Request,
  res: Response
) => {
  try {
    await prisma.campaignReport.delete({
      where: {
        id: String(req.params.id),
      },
    });

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getReportStats = async (
  req: Request,
  res: Response
) => {
  try {
    const reports =
      await prisma.campaignReport.findMany();

    const totalUsers =
      reports.reduce(
        (sum, report) =>
          sum + report.users,
        0
      );

    const totalTransactions =
      reports.reduce(
        (sum, report) =>
          sum + report.transactions,
        0
      );

    const totalGMV =
      reports.reduce(
        (sum, report) =>
          sum + report.gmv,
        0
      );

    const totalSpend =
      reports.reduce(
        (sum, report) =>
          sum + report.spend,
        0
      );

    res.json({
      totalUsers,
      totalTransactions,
      totalGMV,
      totalSpend,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};