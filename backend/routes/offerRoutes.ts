import { Router } from "express";

import {
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  getOfferStats,
  updateOfferStatus,
} from "../controllers/offerController";

import { verifyToken } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";

const router = Router();

router.get("/", getOffers);

router.get(
  "/merchant/:partnerId",
  getOffers
);

router.get(
  "/stats",
  getOfferStats
);

router.post(
  "/",
  verifyToken,
  allowRoles(
    "super-admin",
    "admin"
  ),
  createOffer
);

router.put(
  "/:id",
  verifyToken,
  allowRoles(
    "super-admin",
    "admin"
  ),
  updateOffer
);

router.put(
  "/:id/status",
  verifyToken,
  allowRoles(
    "super-admin",
    "admin"
  ),
  updateOfferStatus
);

router.delete(
  "/:id",
  verifyToken,
  allowRoles(
    "super-admin",
    "admin"
  ),
  deleteOffer
);

export default router;