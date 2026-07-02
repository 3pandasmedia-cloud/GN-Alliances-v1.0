import { Router } from "express";

import {
  getReports,
  createReport,
  deleteReport,
  getReportStats,
} from "../controllers/reportController";

const router = Router();

router.get(
  "/",
  getReports
);

router.get(
  "/stats",
  getReportStats
);

router.post(
  "/",
  createReport
);

router.delete(
  "/:id",
  deleteReport
);

export default router;