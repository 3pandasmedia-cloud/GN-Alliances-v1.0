import { Router } from "express";

import {
  getMerchantAnalytics,
} from "../controllers/analyticsController";

const router = Router();

router.get(
  "/merchant/:partnerId",
  getMerchantAnalytics
);

export default router;