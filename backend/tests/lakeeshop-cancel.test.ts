import "dotenv/config";
import assert from "node:assert/strict";
import { test } from "node:test";
import prisma from "../config/prisma";
import { cancelOrder } from "../controllers/lakeeshopController";
import { encrypt } from "../services/lakeeshopService";

test("cancellation follows provider approval and preserves rejected orders", async () => {
  const original = { config: prisma.lakeeshopApiConfig.findFirst, order: prisma.lakeeshopOrder.findUnique, update: prisma.lakeeshopOrder.update, log: prisma.lakeeshopApiTestLog.create, fetch: globalThis.fetch };
  const encryptionKey = process.env.LAKEESHOP_ENCRYPTION_KEY;
  process.env.LAKEESHOP_ENCRYPTION_KEY = Buffer.alloc(32, 7).toString("hex");
  const setting = { id: "cancellation-test", enabled: true, environment: "sandbox", merchantId: "test", secretEncrypted: encrypt("test-secret"), authEndpoint: "https://lvalidate.lakeetech.com/token", baseUrl: "https://lsorder.lakeetech.com", requestTimeoutMs: 1000 };
  let stored = { id: "order-1", providerOrderId: "provider-1", clientOrderId: "client-1", status: "RECEIVED" };
  let approved = false, providerCalls = 0;
  (prisma.lakeeshopApiConfig as any).findFirst = async () => setting;
  (prisma.lakeeshopOrder as any).findUnique = async () => stored;
  (prisma.lakeeshopOrder as any).update = async ({ data }: any) => (stored = { ...stored, ...data });
  (prisma.lakeeshopApiTestLog as any).create = async () => ({});
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url === setting.authEndpoint) return new Response(JSON.stringify({ access_token: "test-token" }), { status: 200 });
    assert.equal(url, setting.baseUrl + "/order/id/provider-1");
    assert.equal(init?.method, "DELETE"); providerCalls++;
    return new Response(JSON.stringify({ message: approved ? "Cancelled" : "Cancellation window has closed" }), { status: approved ? 200 : 409 });
  };
  const cancel = async () => {
    let code = 200, body: any;
    const res = { status(value: number) { code = value; return this; }, json(value: unknown) { body = value; return this; } };
    await cancelOrder({ params: { id: stored.id }, user: { id: "admin", role: "admin" } } as any, res as any);
    return { code, body };
  };
  try {
    const rejected = await cancel(); assert.equal(rejected.code, 502); assert.match(rejected.body.message, /window has closed/); assert.equal(stored.status, "RECEIVED");
    approved = true;
    const accepted = await cancel(); assert.equal(accepted.code, 200); assert.equal(accepted.body.order.status, "CANCELLED");
    assert.equal((await cancel()).code, 400); assert.equal(providerCalls, 2);
    stored.status = "DELIVERED"; assert.equal((await cancel()).code, 400); assert.equal(providerCalls, 2);
  } finally {
    prisma.lakeeshopApiConfig.findFirst = original.config; prisma.lakeeshopOrder.findUnique = original.order;
    prisma.lakeeshopOrder.update = original.update; prisma.lakeeshopApiTestLog.create = original.log; globalThis.fetch = original.fetch;
    if (encryptionKey === undefined) delete process.env.LAKEESHOP_ENCRYPTION_KEY; else process.env.LAKEESHOP_ENCRYPTION_KEY = encryptionKey;
  }
});
