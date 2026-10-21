import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/authMiddleware";
import { defaults } from "../services/lakeeshopService";
import { checkMerchantConnection } from "../services/merchantConnectionService";

type Merchant = { id: string; name: string; slug: string; email: string; logo: string | null; status: string; apiConnected: boolean; connectionCheckedAt: string | null; integration: boolean };
export const getMerchantOverview = async (_: AuthRequest, res: Response) => {
  try {
    const [partners, existingSetting] = await Promise.all([
      prisma.partner.findMany({ where: { type: "MERCHANT" }, orderBy: { createdAt: "desc" }, select: { id: true, name: true, slug: true, email: true, logo: true, status: true } }),
      prisma.lakeeshopApiConfig.findFirst({ orderBy: { createdAt: "asc" } }),
    ]);
    const setting = existingSetting || await prisma.lakeeshopApiConfig.upsert({ where: { id: "lakeeshop-default" }, update: {}, create: { id: "lakeeshop-default", ...defaults, endpoints: defaults.endpoints } });
    const merchants: Merchant[] = partners.map(partner => ({ ...partner, apiConnected: false, connectionCheckedAt: null, integration: false }));
    if (setting) {
      const connection = await checkMerchantConnection(setting);
      // Include the saved API merchant once, even if it also has a partner record.
      const index = merchants.findIndex(item => item.slug.toLowerCase() === "lakeeshop" || item.name.toLowerCase() === "lakeeshop" || item.name.toLowerCase() === setting.integrationName.toLowerCase());
      const integration = { id: `lakeeshop:${setting.id}`, name: setting.integrationName, slug: "lakeeshop", email: "", logo: null, status: connection.connected ? "ACTIVE" : "INACTIVE", apiConnected: connection.connected, connectionCheckedAt: connection.checkedAt, integration: true };
      if (index >= 0) merchants[index] = { ...merchants[index], ...integration, id: merchants[index].id };
      else merchants.unshift(integration);
    }
    const stats = { total: merchants.length, active: merchants.filter(item => item.status === "ACTIVE").length, pending: merchants.filter(item => ["PENDING", "PENDING_APPROVAL"].includes(item.status)).length, inactive: merchants.filter(item => item.status === "INACTIVE").length };
    res.setHeader("Cache-Control", "no-store");
    return res.json({ merchants, stats });
  } catch {
    return res.status(500).json({ message: "Unable to load merchant data. Please try again." });
  }
};
