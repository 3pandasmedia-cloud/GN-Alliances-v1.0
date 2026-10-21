import "dotenv/config";
import assert from "node:assert/strict";
import { test } from "node:test";
import jwt from "jsonwebtoken";
import app from "../app";
import prisma from "../config/prisma";

test("client Admin can place orders while entity management remains owner-only", async () => {
  const landing = { create: prisma.landingOffer.create, update: prisma.landingOffer.update, delete: prisma.landingOffer.delete };
  (prisma.landingOffer as any).create = async ({ data }: any) => ({ id: "test-offer", ...data });
  (prisma.landingOffer as any).update = async ({ data }: any) => ({ id: "test-offer", ...data });
  (prisma.landingOffer as any).delete = async () => ({ id: "test-offer" });
  const originalFindUnique = prisma.user.findUnique;
  const originalFindMany = prisma.user.findMany;
  const originalOrderFindUnique = prisma.lakeeshopOrder.findUnique;
  (prisma.lakeeshopOrder as any).findUnique = async () => null;
  const originalConfigFindFirst = prisma.lakeeshopApiConfig.findFirst;
  // Validate order access without contacting a provider or placing a real order.
  (prisma.lakeeshopApiConfig as any).findFirst = async () => ({ enabled: true, merchantId: "test-merchant" });
  (prisma.user as any).findUnique = async ({ where }: any) => ({ id: where.id, role: where.id === "owner" ? "super-admin" : where.id === "employee" ? "employee" : "admin", status: "ACTIVE", password: "$2b$10$invalidhash" });
  (prisma.user as any).findMany = async () => [];
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>(resolve => server.on("listening", resolve));
  const address = server.address() as import("node:net").AddressInfo;
  const request = (path: string, method = "GET", body?: object, id = "client") => fetch(`http://127.0.0.1:${address.port}/api${path}`, {
    method, headers: { Authorization: `Bearer ${jwt.sign({ id, role: id === "owner" ? "super-admin" : "admin" }, process.env.JWT_SECRET!)}`, "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  try {
    assert.equal((await request("/admins")).status, 403);
    assert.equal((await request("/admins", "GET", undefined, "owner")).status, 200);
    assert.equal((await request("/employees")).status, 200);
    assert.equal((await request("/clients")).status, 200);
    assert.equal((await request("/users", "POST", { name: "Escalated", email: "x@example.com", password: "test-password", role: "super-admin" })).status, 403);
    assert.equal((await request("/users", "POST", { role: "admin" })).status, 403);
    assert.equal((await request("/users/protected", "PUT", { role: "employee" })).status, 403);
    assert.equal((await request("/users/protected", "DELETE")).status, 403);
    assert.equal((await request("/partners/test", "PUT", { apiEnabled: true })).status, 403);
    assert.equal((await request("/partners/test/generate-api-key", "POST")).status, 403);
    for (const path of ["/lakeeshop/settings", "/lakeeshop/status", "/lakeeshop/logs"]) assert.equal((await request(path)).status, 403);
    assert.equal((await request("/lakeeshop/settings", "PUT", {})).status, 403);
    assert.equal((await request("/lakeeshop/test/authentication", "POST", {})).status, 403);
    // Every entity mutation must be blocked before its handler or upload runs.
    for (const path of ["/users", "/partners", "/offers", "/campaigns", "/reports", "/admins", "/employees", "/clients"]) {
      for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
        assert.equal((await request(path, method, {})).status, 403, `${method} ${path}`);
      }
    }
    for (const id of ["client", "owner"]) {
      const checkout = await request("/lakeeshop/orders", "POST", {}, id);
      assert.equal(checkout.status, 400);
      assert.match((await checkout.json()).message, /valid product, quantity, and complete delivery details/);
    }
    for (const method of ["PUT", "PATCH", "DELETE"]) {
      assert.equal((await request("/lakeeshop/orders", method, {})).status, 403);
    }
    assert.equal((await request("/lakeeshop/orders/example", "DELETE")).status, 404);
    assert.equal((await request("/lakeeshop/orders/example", "POST", {})).status, 403);
    assert.equal((await fetch(`http://127.0.0.1:${address.port}/api/lakeeshop/orders`, { method: "POST" })).status, 401);
    assert.equal((await request("/partners/upload-logo", "POST", {})).status, 403);
    for (const id of ["client", "owner"]) {
      assert.equal((await request("/landing-offers", "POST", { title: "Test", startDate: "2026-10-21", endDate: "2026-11-21" }, id)).status, 200);
      assert.equal((await request("/landing-offers/example", "PUT", { title: "Updated", startDate: "2026-10-21", endDate: "2026-11-21" }, id)).status, 200);
      assert.equal((await request("/landing-offers/example", "DELETE", undefined, id)).status, 200);
    }
    for (const [path, method] of [["/landing-offers", "POST"], ["/landing-offers/example", "PUT"], ["/landing-offers/example", "DELETE"], ["/landing-offers/upload", "POST"]]) {
      assert.equal((await request(path, method, {}, "employee")).status, 403);
    }
    // Requests without a session cannot bypass ownership on previously public write routes.
    for (const path of ["/reports", "/landing-offers", "/landing-offers/upload"]) {
      assert.equal((await fetch(`http://127.0.0.1:${address.port}/api${path}`, { method: "POST" })).status, 401);
    }
    const profile = await request("/profile");
    assert.equal(profile.status, 200);
    // Existing personal security routes still reach their own validation, not the entity guard.
    assert.equal((await request("/profile/password", "PUT", { currentPassword: "wrong", newPassword: "another-password" })).status !== 403, true);
    const resend = await fetch(`http://127.0.0.1:${address.port}/api/auth/resend-login-otp`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "owner@example.com" }) });
    // The resend route must never create a passwordless login challenge.
    assert.equal(resend.status, 400);
  } finally {
    Object.assign(prisma.landingOffer, landing);
    prisma.lakeeshopOrder.findUnique = originalOrderFindUnique;
    prisma.user.findUnique = originalFindUnique;
    prisma.user.findMany = originalFindMany;
    prisma.lakeeshopApiConfig.findFirst = originalConfigFindFirst;
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
});

