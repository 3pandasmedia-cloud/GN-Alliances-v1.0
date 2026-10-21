import assert from "node:assert/strict";
import { test } from "node:test";

test("order cache survives navigation, isolates accounts, and expires safely", async () => {
  const { readLakeeshopCache, writeLakeeshopCache } = await import("../../frontend/lib/" + "lakeeshopCache.ts");
  const values = new Map<string, string>();
  const original = Object.getOwnPropertyDescriptor(globalThis, "sessionStorage");
  Object.defineProperty(globalThis, "sessionStorage", { configurable: true, value: { getItem: (key: string) => values.get(key) || null, setItem: (key: string, value: string) => values.set(key, value) } });
  try {
    sessionStorage.setItem("gn-user", JSON.stringify({ id: "one" }));
    const orders = [{ id: "order-1", status: "RECEIVED" }];
    writeLakeeshopCache("orders", orders);
    assert.deepEqual(readLakeeshopCache("orders")?.value, orders);
    sessionStorage.setItem("gn-user", JSON.stringify({ id: "two" }));
    assert.equal(readLakeeshopCache("orders"), null);
    sessionStorage.setItem("gn-user", JSON.stringify({ id: "one" }));
    assert.deepEqual(readLakeeshopCache("orders")?.value, orders);
    sessionStorage.setItem("gn-lakeeshop-v1:one:orders", JSON.stringify({ value: orders, savedAt: Date.now() - 86400001 }));
    assert.equal(readLakeeshopCache("orders"), null);
    sessionStorage.setItem("gn-user", "malformed");
    assert.doesNotThrow(() => writeLakeeshopCache("orders", orders));
    assert.equal(readLakeeshopCache("orders"), null);
  } finally {
    if (original) Object.defineProperty(globalThis, "sessionStorage", original);
    else delete (globalThis as any).sessionStorage;
  }
});
