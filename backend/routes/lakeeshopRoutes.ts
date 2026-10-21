import { Router } from "express";
import { cancelOrder, createOrder, getCatalogCategories, getCatalogItem, getCatalogItems, getLogs, getOrders, getSettings, getStatus, testAuthentication, testBrands, testCategories, testPincode, testProducts, testStock, testEndpoint, updateSettings } from "../controllers/lakeeshopController";
import { AuthRequest, verifyToken } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";
import { requireEntityOwner } from "../middleware/entityPermissions";

const router = Router();
router.use(verifyToken, allowRoles("super-admin", "admin"));

// Placing an order is available to client Admins as well as the owner.
router.post("/orders", createOrder);
router.delete("/orders/:id", cancelOrder);

// Entity and API configuration changes remain owner-only.
router.use(requireEntityOwner);
router.use((req: AuthRequest, res, next) => {
  if (req.user?.role !== "super-admin" && ["/settings", "/status", "/logs", "/test"].some(path => req.path === path || req.path.startsWith(path + "/"))) {
    return res.status(403).json({ message: "Please contact 3Pandas Media to edit APIs." });
  }
  next();
});
router.get("/settings", getSettings);
router.put("/settings", updateSettings);
router.get("/status", getStatus);
router.get("/logs", getLogs);
router.get("/orders", getOrders);
router.get("/catalog/items", getCatalogItems);
router.get("/catalog/items/:code", getCatalogItem);
router.get("/catalog/categories", getCatalogCategories);
router.post("/test/authentication", testAuthentication);
router.post("/test/products", testProducts);
router.post("/test/brands", testBrands);
router.post("/test/categories", testCategories);
router.post("/test/pincode", testPincode);
router.post("/test/stock", testStock);
router.post("/test/:endpoint", (req, res) => testEndpoint(req, res));
export default router;
