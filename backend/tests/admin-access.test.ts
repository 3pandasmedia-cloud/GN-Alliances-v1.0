import "dotenv/config";
import assert from "node:assert/strict";
import { test } from "node:test";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { adminModuleAccess } from "../middleware/adminModuleAccess";
import { saveAdmin } from "../controllers/adminController";
import { verifyToken } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";
import { adminModuleKeys, moduleEnabled } from "../config/adminAccess";

test("Admin settings persist securely and section permissions use current database values", async () => {
  const originals = { find: prisma.user.findUnique, update: prisma.user.update, create: prisma.user.create, partner: prisma.partner.findUnique };
  let modules: any = Object.fromEntries(adminModuleKeys.map(key => [key, false]));
  let written: any;
  const target = { id: "target", name: "Client", email: "client@example.com", role: "admin", status: "ACTIVE", password: "existing-hash" };
  (prisma.user as any).findUnique = async ({ where }: any) => where.id === "owner" ? { ...target, id: "owner", role: "super-admin" } : where.id === "target" ? target : { ...target, id: "client", adminModules: modules };
  (prisma.user as any).update = async ({ data }: any) => { written = data; return { ...target, ...data }; };
  (prisma.user as any).create = async ({ data }: any) => { written = data; return { id: "created", ...data }; };
  (prisma.partner as any).findUnique = async ({ where }: any) => ({ type: where.id === "bank" ? "BANK" : "MERCHANT" });
  const app = express(); app.use(express.json());
  app.put("/api/admins/:id", verifyToken, allowRoles("super-admin"), saveAdmin);
  app.post("/api/admins", verifyToken, allowRoles("super-admin"), saveAdmin);
  app.use("/api", adminModuleAccess, (_req, res) => res.json({ ok: true }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>(resolve => server.once("listening", resolve));
  const address = server.address() as import("node:net").AddressInfo;
  const request = (path: string, id = "client", method = "GET", body?: any) => fetch(`http://127.0.0.1:${address.port}/api${path}`, { method, headers: { "Content-Type": "application/json", ...(id ? { Authorization: `Bearer ${jwt.sign({ id }, process.env.JWT_SECRET!)}` } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
  try {
    const routes: Record<string, string> = { dashboard: "/dashboard/stats", merchants: "/lakeeshop/catalog/items", banks: "/partners/type/BANK", fintechs: "/clients", campaigns: "/campaigns", offers: "/offers", analytics: "/analytics/merchant/example", reconciliation: "/reports", landingOffers: "/landing-offers", employees: "/employees", settings: "/profile/password" };
    for (const [key, path] of Object.entries(routes)) {
      assert.equal((await request(path)).status, 403, key);
      assert.equal((await request(path, "")).status, 401, `anonymous ${key}`);
      assert.equal((await request(path, "owner")).status, 200, `owner ${key}`);
      modules[key] = true;
      assert.equal((await request(path)).status, 200, `enabled ${key}`);
      modules[key] = false;
    }
    modules.banks = true;
    assert.equal((await request("/partners/bank/overview")).status, 200);
    assert.equal((await request("/partners/merchant")).status, 403);
    assert.equal((await request("/partners")).status, 403);
    assert.equal((await request("/landing-offers/public", "")).status, 200);
    assert.equal((await request("/profile")).status, 200);
    assert.equal((await request("/search-merchants")).status, 403);
    modules.landingOffers = true;
    assert.equal((await request("/search-merchants")).status, 200);
    const body = { name: "Updated Admin", email: "NEW@example.com", password: "", status: "ACTIVE", twoFactor: false, twoFactorEmail: "", adminModules: Object.fromEntries(adminModuleKeys.map(key => [key, true])) };
    assert.equal((await request("/admins/target", "client", "PUT", body)).status, 403);
    assert.equal((await request("/admins/owner", "owner", "PUT", body)).status, 404);
    assert.equal((await request("/admins/target", "owner", "PUT", { ...body, adminModules: { ...body.adminModules, admins: true } })).status, 400);
    assert.equal((await request("/admins/target", "owner", "PUT", { ...body, twoFactor: true })).status, 400);
    const result = await request("/admins/target", "owner", "PUT", body);
    assert.equal(result.status, 200); assert.equal((await result.json()).password, undefined);
    assert.equal(written.password, undefined); assert.equal(written.email, "new@example.com");
    const created = await request("/admins", "owner", "POST", { ...body, password: "test-password-123" });
    assert.equal(created.status, 200); assert.equal((await created.json()).password, undefined);
    assert.equal(await bcrypt.compare("test-password-123", written.password), true);
    assert.equal(written.role, "admin");
    modules = null;
    assert.equal(moduleEnabled(modules, "dashboard"), true);
    assert.equal((await request("/campaigns")).status, 200);
  } finally {
    prisma.user.findUnique = originals.find; prisma.user.update = originals.update; prisma.user.create = originals.create; prisma.partner.findUnique = originals.partner;
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
});
