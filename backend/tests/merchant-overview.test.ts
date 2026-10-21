import "dotenv/config";
import assert from "node:assert/strict";
import { test } from "node:test";
import prisma from "../config/prisma";
import { getMerchantOverview } from "../controllers/merchantOverviewController";
import { encrypt } from "../services/lakeeshopService";

test("merchant totals and API status come from saved records and a real connection result", async () => {
  const original = { partners: prisma.partner.findMany, config: prisma.lakeeshopApiConfig.findFirst, fetch: globalThis.fetch, encryptionKey: process.env.LAKEESHOP_ENCRYPTION_KEY };
  process.env.LAKEESHOP_ENCRYPTION_KEY = Buffer.alloc(32, 9).toString("hex");
  let partners: any[] = [
    { id: "a", name: "A", slug: "a", email: "a@example.com", logo: null, status: "ACTIVE" },
    { id: "b", name: "B", slug: "b", email: "b@example.com", logo: null, status: "PENDING_APPROVAL" },
    { id: "c", name: "C", slug: "c", email: "c@example.com", logo: null, status: "INACTIVE" },
  ];
  let setting: any = null;
  let providerOk = true;
  let calls = 0;
  (prisma.partner as any).findMany = async ({ where, select }: any) => { assert.equal(where.type, "MERCHANT"); assert.equal(select.password, undefined); assert.equal(select.apiKey, undefined); return partners; };
  (prisma.lakeeshopApiConfig as any).findFirst = async () => setting;
  globalThis.fetch = async (input, init) => {
    calls++;
    if (String(input).endsWith("/token")) return new Response(JSON.stringify({ access_token: "merchant-test-token" }), { status: 200 });
    assert.equal((init?.headers as any).Authorization, "Bearer merchant-test-token");
    return new Response(JSON.stringify(providerOk ? { data: [] } : { error: "Unavailable" }), { status: providerOk ? 200 : 503 });
  };
  const overview = async () => {
    let code = 200, body: any;
    const res = { setHeader() {}, status(value: number) { code = value; return this; }, json(value: any) { body = value; return this; } };
    await getMerchantOverview({} as any, res as any);
    assert.equal(code, 200); return body;
  };
  try {
    assert.deepEqual((await overview()).stats, { total: 3, active: 1, pending: 1, inactive: 1 });
    assert.equal(calls, 0);
    setting = { id: "merchant-test", updatedAt: new Date(1), integrationName: "Lakeeshop", enabled: true, merchantId: "test", secretEncrypted: encrypt("test-secret"), endpoints: { products: { enabled: true } }, baseUrl: "https://lsorder.lakeetech.com", authEndpoint: "https://lvalidate.lakeetech.com/token", requestTimeoutMs: 1000 };
    const online = await overview();
    assert.deepEqual(online.stats, { total: 4, active: 2, pending: 1, inactive: 1 });
    assert.equal(online.merchants[0].apiConnected, true);
    assert.equal(online.merchants[0].secretEncrypted, undefined);
    const previousCalls = calls; await overview(); assert.equal(calls, previousCalls);
    providerOk = false; setting.updatedAt = new Date(2);
    const offline = await overview();
    assert.deepEqual(offline.stats, { total: 4, active: 1, pending: 1, inactive: 2 });
    assert.equal(offline.merchants[0].apiConnected, false);
    setting.enabled = false;
    const disabled = await overview(); assert.equal(disabled.merchants[0].apiConnected, false);
    const before = calls; await overview(); assert.equal(calls, before);
    partners.push({ id: "lakeeshop-partner", name: "Lakeeshop", slug: "lakeeshop", email: "merchant@example.com", logo: null, status: "ACTIVE" });
    assert.equal((await overview()).stats.total, 4);
  } finally {
    prisma.partner.findMany = original.partners; prisma.lakeeshopApiConfig.findFirst = original.config; globalThis.fetch = original.fetch;
    if (original.encryptionKey === undefined) delete process.env.LAKEESHOP_ENCRYPTION_KEY; else process.env.LAKEESHOP_ENCRYPTION_KEY = original.encryptionKey;
  }
});
