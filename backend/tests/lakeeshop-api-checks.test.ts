import "dotenv/config";
import assert from "node:assert/strict";
import { test } from "node:test";
import prisma from "../config/prisma";
import { testEndpoint } from "../controllers/lakeeshopController";
import { endpointDefaults } from "../services/lakeeshopEndpoints";
import { encrypt } from "../services/lakeeshopService";

test("all 11 API tests report provider status, validate inputs, and require mutation confirmation", async () => {
  const original = { config: prisma.lakeeshopApiConfig.findFirst, log: prisma.lakeeshopApiTestLog.create, update: prisma.lakeeshopOrder.updateMany, create: prisma.lakeeshopOrder.create, fetch: globalThis.fetch, key: process.env.LAKEESHOP_ENCRYPTION_KEY };
  process.env.LAKEESHOP_ENCRYPTION_KEY = Buffer.alloc(32, 11).toString("hex");
  const setting = { id: "api-check-test", enabled: true, merchantId: "test", secretEncrypted: encrypt("secret"), environment: "sandbox", baseUrl: "https://lsorder.lakeetech.com", authEndpoint: "https://lvalidate.lakeetech.com/token", requestTimeoutMs: 1000, endpoints: endpointDefaults };
  let status = 200, requests: { url: string; method: string }[] = [], created = 0, cancelled = 0;
  (prisma.lakeeshopApiConfig as any).findFirst = async () => setting;
  (prisma.lakeeshopApiTestLog as any).create = async () => ({});
  (prisma.lakeeshopOrder as any).updateMany = async () => { cancelled++; return { count: 1 }; };
  (prisma.lakeeshopOrder as any).create = async ({ data }: any) => { created++; return { id: "test-order", ...data }; };
  globalThis.fetch = async (input, init) => {
    const url = String(input); requests.push({ url, method: init?.method || "GET" });
    if (url.endsWith("/token")) return new Response(JSON.stringify({ token: "PRIVATE_TEST_TOKEN" }), { status: 200 });
    return new Response(JSON.stringify(status === 200 ? { data: { order_id: "provider-test", status: "RECEIVED", product_name: "Test product", price: 500 } } : { message: "Provider unavailable" }), { status });
  };
  const invoke = async (key: string, body: any = {}) => {
    let code = 200, payload: any;
    const response = { status(value: number) { code = value; return this; }, json(value: any) { payload = value; return this; } };
    await testEndpoint({ params: { endpoint: key }, body, user: { id: "owner", role: "super-admin" } } as any, response as any);
    return { code, payload };
  };
  const inputs = { productCode: "TEST-SKU", quantity: 1, pincode: "560001", page: 0, size: 1, orderId: "provider-test" };
  try {
    for (const key of ["authentication", "products", "productsPage", "productDetail", "brands", "categories", "pincode", "stock", "orderStatus"]) {
      const result = await invoke(key, inputs);
      assert.equal(result.code, 200, key); assert.equal(result.payload.httpStatus, 200, key); assert.equal(result.payload.message, "API Working", key);
      assert.ok(!JSON.stringify(result.payload).includes("PRIVATE_TEST_TOKEN"));
    }
    const before = requests.length;
    assert.equal((await invoke("orderCancel", inputs)).code, 400);
    assert.equal((await invoke("orderCreate", inputs)).code, 400);
    assert.equal((await invoke("stock", { productCode: "TEST", quantity: 0 })).code, 400);
    assert.equal((await invoke("pincode", { pincode: "123" })).code, 400);
    assert.equal(requests.length, before);
    const cancel = await invoke("orderCancel", { ...inputs, confirmMutation: true });
    assert.equal(cancel.payload.message, "API Working"); assert.equal(requests.at(-1)?.method, "DELETE"); assert.equal(cancelled, 1);
    const create = await invoke("orderCreate", { ...inputs, confirmMutation: true, customer: { customer_name: "Test", customer_email: "test@example.com", customer_mobile: "9123456789", address_line1: "Test", city: "Test", state: "Test", pincode: "560001" } });
    assert.equal(create.code, 201); assert.equal(create.payload.httpStatus, 200); assert.equal(requests.at(-1)?.method, "POST"); assert.equal(created, 1);
    status = 503;
    const failed = await invoke("brands"); assert.equal(failed.code, 502); assert.equal(failed.payload.httpStatus, 503); assert.notEqual(failed.payload.message, "API Working");
    status = 201;
    const non200 = await invoke("brands"); assert.equal(non200.payload.httpStatus, 201); assert.notEqual(non200.payload.message, "API Working");
  } finally {
    prisma.lakeeshopApiConfig.findFirst = original.config; prisma.lakeeshopApiTestLog.create = original.log;
    prisma.lakeeshopOrder.updateMany = original.update; prisma.lakeeshopOrder.create = original.create; globalThis.fetch = original.fetch;
    if (original.key === undefined) delete process.env.LAKEESHOP_ENCRYPTION_KEY; else process.env.LAKEESHOP_ENCRYPTION_KEY = original.key;
  }
});
