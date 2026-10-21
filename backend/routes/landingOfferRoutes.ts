import { Router } from "express";
import { requireEntityOwner } from "../middleware/entityPermissions";

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

// Public counters do not change the offer configuration.
router.post("/:id/click", recordOfferClick);
router.post("/:id/view", recordOfferView);
router.use(requireEntityOwner);

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


export default router;