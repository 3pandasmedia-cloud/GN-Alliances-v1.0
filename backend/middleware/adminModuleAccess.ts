import { Response, NextFunction } from "express";
import { AuthRequest, verifyToken } from "./authMiddleware";
import { AdminModule, moduleEnabled } from "../config/adminAccess";
import prisma from "../config/prisma";

export const adminModuleAccess = (req: AuthRequest, res: Response, next: NextFunction) => {
  const path = req.path;
  if (path === "/profile" && req.method === "GET") return next();
  if (path === "/landing-offers/public" || /^\/landing-offers\/[^/]+\/(click|view)$/.test(path)) return next();
  const sections: Record<string, AdminModule> = { dashboard: "dashboard", lakeeshop: "merchants", "search-merchants": "merchants", campaigns: "campaigns", offers: "offers", analytics: "analytics", reports: "reconciliation", "landing-offers": "landingOffers", employees: "employees", users: "employees", clients: "fintechs", profile: "settings", "two-factor": "settings" };
  const section = path.split("/")[1];
  if (!(section in sections) && section !== "partners") return next();
  // Protected section requests always use current database permissions.
  return verifyToken(req, res, async () => {
    if (req.user?.role !== "admin") return next();
    try {
      let key = sections[section];
      if (section === "search-merchants" && moduleEnabled(req.user?.adminModules, "landingOffers")) return next();
      if (section === "partners") {
        if (path === "/partners" || path === "/partners/") {
          if (!["merchants", "banks", "fintechs"].every(item => moduleEnabled(req.user?.adminModules, item as AdminModule))) return res.status(403).json({ message: "This section is not available for your account." });
          return next();
        }
        let type = path.match(/^\/partners\/type\/([^/]+)/)?.[1];
        if (!type && /^\/partners\/slug\//.test(path)) type = (await prisma.partner.findUnique({ where: { slug: decodeURIComponent(path.split("/")[3]) }, select: { type: true } }))?.type;
        else if (!type && !/^\/partners\/(stats|merchant-overview|upload-logo)/.test(path)) type = (await prisma.partner.findUnique({ where: { id: decodeURIComponent(path.split("/")[2]) }, select: { type: true } }))?.type;
        key = type?.toUpperCase() === "BANK" ? "banks" : type?.toUpperCase() === "FINTECH" ? "fintechs" : "merchants";
      }
      if (!moduleEnabled(req.user?.adminModules, key)) return res.status(403).json({ message: "This section is not available for your account. Please contact 3Pandas Media." });
      next();
    } catch { res.status(500).json({ message: "Unable to verify section access." }); }
  });
};
