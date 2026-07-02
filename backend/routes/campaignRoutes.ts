import { Router } from "express";

import {
  getCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getCampaignStats,
} from "../controllers/campaignController";

import { verifyToken } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/bank/:bankId",
  verifyToken,
  getCampaigns
);

router.get(
  "/merchant/:partnerId",
  verifyToken,
  getCampaigns
);

router.get(
  "/",
  verifyToken,
  getCampaigns
);

router.get(
  "/stats",
  verifyToken,
  getCampaignStats
);

router.post(
  "/",
  verifyToken,
  allowRoles(
    "super-admin",
    "admin"
  ),
  createCampaign
);

router.put(
  "/:id",
  verifyToken,
  allowRoles(
    "super-admin",
    "admin"
  ),
  updateCampaign
);

router.delete(
  "/:id",
  verifyToken,
  allowRoles(
    "super-admin",
    "admin"
  ),
  deleteCampaign
);


export default router;