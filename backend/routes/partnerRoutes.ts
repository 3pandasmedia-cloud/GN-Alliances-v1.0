import { Router } from "express";
import { getMerchantOverview } from "../controllers/merchantOverviewController";

import {
  getPartnerStats,
  getPartners,
  getPartnerById,
  getPartnerBySlug,
  createPartner,
  updatePartner,
  updatePartnerPassword,
  deletePartner,
  uploadMerchantLogo,
  generateApiKey,
  getPartnersByType,
  getBankOverview,
} from "../controllers/partnerController";

import { verifyToken } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";
import {
  merchantUpload,
} from "../middleware/merchantUploadMiddleware";

const router = Router();

router.get("/merchant-overview", verifyToken, allowRoles("super-admin", "admin"), getMerchantOverview);

router.get(
  "/stats",
  verifyToken,
  allowRoles("super-admin", "admin"),
  getPartnerStats
);

router.get(
  "/:id/overview",
  verifyToken,
  getBankOverview
);

router.get(
  "/slug/:slug",
  verifyToken,
  getPartnerBySlug
);

router.get(
  "/type/:type",
  verifyToken,
  allowRoles("super-admin", "admin"),
  getPartnersByType
);

router.get(
  "/",
  verifyToken,
  allowRoles("super-admin", "admin"),
  getPartners
);

router.post(
  "/",
  verifyToken,
  allowRoles("super-admin", "admin"),
  merchantUpload.single("logo"),
  createPartner
);

router.get(
  "/:id",
  verifyToken,
  allowRoles("super-admin", "admin"),
  getPartnerById
);

router.put(
  "/:id",
  verifyToken,
  allowRoles("super-admin", "admin"),
  updatePartner
);

router.put(
  "/:id/password",
  verifyToken,
  allowRoles("super-admin", "admin"),
  updatePartnerPassword
);

router.post(
  "/:id/generate-api-key",
  verifyToken,
  allowRoles("super-admin"),
  generateApiKey
);

router.delete(
  "/:id",
  verifyToken,
  allowRoles("super-admin", "admin"),
  deletePartner
);

router.post(
  "/upload-logo",
  verifyToken,
  merchantUpload.single("logo"),
  uploadMerchantLogo
);

export default router;