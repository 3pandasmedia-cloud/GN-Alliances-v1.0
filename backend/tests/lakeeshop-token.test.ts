import assert from "node:assert/strict";
import { test } from "node:test";
import { accessToken, encrypt } from "../services/lakeeshopService";

test("cached tokens follow credential and environment changes", async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.LAKEESHOP_ENCRYPTION_KEY;
  process.env.LAKEESHOP_ENCRYPTION_KEY = "ab".repeat(32);
  const requests: any[] = [];
  globalThis.fetch = async (_url, options) => {
    requests.push(JSON.parse(String(options?.body)));
    return new Response(JSON.stringify({ access_token: `token-${requests.length}`, expires_in: 3600 }));
  };
  try {
    const config = { id: "token-rotation-test", environment: "sandbox", baseUrl: "https://lsorder.lakeetech.com", authEndpoint: "https://lvalidate.lakeetech.com/token", merchantId: "sandbox-merchant", secretEncrypted: encrypt("sandbox-secret"), requestTimeoutMs: 1000 };
    assert.equal(await accessToken(config), "token-1");
    assert.equal(await accessToken(config), "token-1");
    config.merchantId = "production-merchant";
    assert.equal(await accessToken(config), "token-2");
    config.secretEncrypted = encrypt("production-secret");
    assert.equal(await accessToken(config), "token-3");
    assert.deepEqual(requests[2], { merchant_id: "production-merchant", secret_key: "production-secret" });
    config.environment = "production";
    assert.equal(await accessToken(config), "token-4");
    config.baseUrl = "https://order.lakeetech.com";
    assert.equal(await accessToken(config), "token-5");
    assert.equal(await accessToken(config), "token-5");
    config.merchantId = "";
    await assert.rejects(accessToken(config), /credentials are incomplete/);
    assert.equal(requests.length, 5);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.LAKEESHOP_ENCRYPTION_KEY;
    else process.env.LAKEESHOP_ENCRYPTION_KEY = originalKey;
  }
});
