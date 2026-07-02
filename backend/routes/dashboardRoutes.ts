import { Router } from "express";

import {
  getDashboardStats,
  getMerchantDashboardStats,
} from "../controllers/dashboardController";

const router = Router();

router.get(
  "/stats",
  getDashboardStats
);

router.get(
  "/merchant/:id",
  getMerchantDashboardStats
);

export default router;