import { Router } from "express";

import {
  getLandingOffers,
  getLandingOffer,
  createLandingOffer,
  updateLandingOffer,
  deleteLandingOffer,
  recordOfferClick,
  recordOfferView,
  uploadLandingOfferBanner,
  getPublicLandingOffers
} from "../controllers/landingOfferController";

import uploadLandingOffer from "../middleware/uploadLandingOffer";

const router = Router();

// Public
router.get("/public", getPublicLandingOffers);

// Upload
router.post(
  "/upload",
  uploadLandingOffer.single("banner"),
  uploadLandingOfferBanner
);

// CRUD
router.get("/", getLandingOffers);
router.post("/", createLandingOffer);

router.get("/:id", getLandingOffer);
router.put("/:id", updateLandingOffer);
router.delete("/:id", deleteLandingOffer);

router.post("/:id/click", recordOfferClick);
router.post("/:id/view", recordOfferView);

export default router;