import { Router } from "express";
import { searchMerchants } from "../controllers/merchantSearchController";

const router = Router();

router.get("/", searchMerchants);

export default router;