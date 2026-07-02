import { Router } from "express";

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

router.get(
  "/stats",
  verifyToken,
  allowRoles("super-admin"),
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
  allowRoles("super-admin"),
  getPartnersByType
);

router.get(
  "/",
  verifyToken,
  allowRoles("super-admin"),
  getPartners
);

router.post(
  "/",
  verifyToken,
  allowRoles("super-admin"),
  merchantUpload.single("logo"),
  createPartner
);

router.get(
  "/:id",
  verifyToken,
  allowRoles("super-admin"),
  getPartnerById
);

router.put(
  "/:id",
  verifyToken,
  allowRoles("super-admin"),
  updatePartner
);

router.put(
  "/:id/password",
  verifyToken,
  allowRoles("super-admin"),
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
  allowRoles("super-admin"),
  deletePartner
);

router.post(
  "/upload-logo",
  verifyToken,
  merchantUpload.single("logo"),
  uploadMerchantLogo
);

export default router;