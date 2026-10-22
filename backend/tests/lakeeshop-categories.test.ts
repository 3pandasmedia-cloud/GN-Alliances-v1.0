import assert from "node:assert/strict";
import { test } from "node:test";
import { categoryNames } from "../../frontend/lib/lakeeshopCategories";

test("category menus accept names, records and nested provider envelopes", () => {
  assert.deepEqual(categoryNames([" Electronics ", "Appliances", ""]), ["Electronics", "Appliances"]);
  assert.deepEqual(categoryNames({ data: { content: [{ categoryName: "Electronics" }, { category_name: "Appliances" }] }, message: "Success" }), ["Electronics", "Appliances"]);
  assert.deepEqual(categoryNames([{ name: "Electronics", description: "Devices", children: [{ name: "Audio" }] }]), ["Electronics", "Audio"]);
  assert.deepEqual(categoryNames({ data: [], message: "Success" }), []);
});
