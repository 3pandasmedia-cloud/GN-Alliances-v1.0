import "dotenv/config";
import assert from "node:assert/strict";
import { test } from "node:test";
import { endpointDefaults, mergeEndpoints, endpointPath, validEndpointSettings } from "../services/lakeeshopEndpoints";
import { publicConfig } from "../services/lakeeshopService";
import { getSettings, updateSettings, cancelOrder } from "../controllers/lakeeshopController";
import prisma from "../config/prisma";

test("all integrated endpoints are merged without losing existing custom paths", () => {
  const legacy = { stock: { ...endpointDefaults.stock, path: "/product/stock_validate/product_code/:product_code/quantity/:quantity", enabled: false } };
  const merged = mergeEndpoints(legacy);
  assert.equal(Object.keys(merged).length, 11);
  assert.equal(merged.stock.path, legacy.stock.path);
  assert.equal(merged.stock.enabled, false);
  assert.equal(merged.orderCreate.method, "POST");
  assert.equal(merged.orderCancel.method, "DELETE");
  assert.equal(validEndpointSettings(merged), true);
  const config = publicConfig({ secretEncrypted: "private", endpoints: legacy });
  assert.equal(config.secretEncrypted, undefined);
  assert.equal(Object.keys(config.endpoints).length, 11);
});

test("endpoint validation enforces methods and required parameters", () => {
  assert.equal(validEndpointSettings({ ...endpointDefaults, orderCancel: { ...endpointDefaults.orderCancel, method: "GET" } }), false);
  assert.equal(validEndpointSettings({ ...endpointDefaults, productDetail: { ...endpointDefaults.productDetail, path: "/product_details/by_code" } }), false);
  assert.equal(validEndpointSettings({ ...endpointDefaults, orderCreate: { ...endpointDefaults.orderCreate, path: "//other.example/order" } }), false);
  assert.equal(validEndpointSettings({ ...endpointDefaults, orderCreate: { ...endpointDefaults.orderCreate, path: "/order/create#fragment" } }), false);
  const setting = { endpoints: { ...endpointDefaults, orderCancel: { ...endpointDefaults.orderCancel, path: "/custom/orders/:order_id" } } };
  assert.equal(endpointPath(setting, "orderCancel", { order_id: "a/b" }), "/custom/orders/a%2Fb");
  assert.equal(endpointPath(setting, "productsPage", { page: 2, size: 24 }), "/product_details/all/page?page=2&size=24");
  assert.throws(() => endpointPath({ endpoints: { orderCreate: { enabled: false } } }, "orderCreate"), /disabled/);
});

test("settings return and save all methods; disabled cancellation never contacts provider", async () => {
  const original = { config: prisma.lakeeshopApiConfig.findFirst, update: prisma.lakeeshopApiConfig.update, log: prisma.lakeeshopApiTestLog.create, order: prisma.lakeeshopOrder.findUnique, fetch: globalThis.fetch };
  let saved: any = { id: "test", integrationName: "Lakeeshop", environment: "sandbox", baseUrl: "https://lsorder.lakeetech.com", authEndpoint: "https://lvalidate.lakeetech.com/token", requestTimeoutMs: 15000, enabled: true, endpoints: { products: endpointDefaults.products } };
  (prisma.lakeeshopApiConfig as any).findFirst = async () => saved;
  (prisma.lakeeshopApiConfig as any).update = async ({ data }: any) => (saved = { ...saved, ...data });
  (prisma.lakeeshopApiTestLog as any).create = async () => ({});
  (prisma.lakeeshopOrder as any).findUnique = async () => ({ id: "order", status: "RECEIVED", providerOrderId: "provider" });
  globalThis.fetch = async () => { throw new Error("Unexpected provider request"); };
  const invoke = async (handler: any, body = {}) => {
    let status = 200, payload: any;
    const res = { status(code: number) { status = code; return this; }, json(value: any) { payload = value; return this; } };
    await handler({ body, params: { id: "order" }, user: { id: "owner", role: "super-admin" } }, res);
    return { status, payload };
  };
  try {
    const settings = await invoke(getSettings);
    assert.equal(Object.keys(settings.payload.endpoints).length, 11);
    const body = { ...saved, endpoints: mergeEndpoints(saved.endpoints) };
    body.endpoints.orderCancel.enabled = false;
    const updated = await invoke(updateSettings, body);
    assert.equal(updated.status, 200);
    assert.equal(saved.endpoints.orderCreate.method, "POST");
    assert.equal(saved.endpoints.orderCancel.enabled, false);
    const partial = await invoke(updateSettings, { ...body, endpoints: { products: endpointDefaults.products } });
    assert.equal(partial.status, 200);
    assert.equal(saved.endpoints.orderCancel.enabled, false);
    const cancelled = await invoke(cancelOrder);
    assert.match(cancelled.payload.message, /Cancel Order is disabled/);
  } finally {
    prisma.lakeeshopApiConfig.findFirst = original.config; prisma.lakeeshopApiConfig.update = original.update;
    prisma.lakeeshopApiTestLog.create = original.log; prisma.lakeeshopOrder.findUnique = original.order; globalThis.fetch = original.fetch;
  }
});
