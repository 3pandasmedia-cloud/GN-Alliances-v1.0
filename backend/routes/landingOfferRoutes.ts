import { Router } from "express";
import { AuthRequest, verifyToken } from "../middleware/authMiddleware";

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
router.use((req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  return verifyToken(req, res, () => {
    const role = (req as AuthRequest).user?.role;
    if (role !== "super-admin" && role !== "admin") return res.status(403).json({ message: "Only Admins can manage landing offers." });
    next();
  });
});

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