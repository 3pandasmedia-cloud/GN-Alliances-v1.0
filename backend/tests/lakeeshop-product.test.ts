import assert from "node:assert/strict";
import { test } from "node:test";

test("product page uses actual Lakeeshop description fields and complete specifications", async () => {
  const { productDetails } = await import("../../frontend/lib/" + "lakeeshopProduct.ts");
  const product = productDetails({ product_name: "WILDCRAFT GYM BAG 3 DUFFLE BAG", sku_code: "BWB-LGT-OTH-0113", brand_name: "WILDCRAFT", short_description: "Keep your gym necessities neatly organised.", detail_description: "WILDCRAFT GYM BAG 3 DUFFLE BAG\nKeep your gym necessities neatly organised.\nProduct Details\n• Brand: WILDCRAFT\n• Capacity: 30L\n• Material: Nylon Ripstop Coated, TM Dobby\n• Adjustable shoulder strap.\n• Ventilated shoe section.\n• Warranty: Manufacturer warranty\n• Note: Color depends only on stock availability", images: { image1: "https://images.example.com/one.jpg", image2: "https://images.example.com/two.jpg", image3: "https://images.example.com/three.jpg" }, product_price: 1499, basic_price: 1058.47, tax_amount: 190.53, tax_percentage: 18, shipping_amount: 250, product_mrp: 1499, hsn_code: "42021250", spec1: null }, "fallback");
  assert.equal(product.code, "BWB-LGT-OTH-0113");
  assert.equal(product.images.length, 3);
  assert.equal(product.shortDescription, "Keep your gym necessities neatly organised.");
  assert.deepEqual(product.features, ["Adjustable shoulder strap.", "Ventilated shoe section."]);
  assert.ok(product.specifications.some((item: any) => item.label === "Capacity" && item.value === "30L"));
  assert.ok(product.specifications.some((item: any) => item.label === "Note" && item.value.includes("stock availability")));
  assert.ok(!product.specifications.some((item: any) => item.label === "Specification 1"));
  assert.equal(Math.round((product.basePrice + product.tax + product.shipping) * 100), product.price * 100);
});

test("missing API fields stay unavailable and HTML descriptions render as text", async () => {
  const { productDetails, descriptionText } = await import("../../frontend/lib/" + "lakeeshopProduct.ts");
  const missing = productDetails({ qty: 1 }, "SKU-1");
  assert.equal(missing.price, undefined); assert.equal(missing.fullDescription, "");
  assert.deepEqual(missing.features, []); assert.deepEqual(missing.specifications, []);
  assert.equal((missing as any).inStock, undefined);
  const html = descriptionText('<script>alert(1)</script><p>Soft &amp; durable</p><ul><li>Easy to carry</li></ul>');
  assert.ok(html.includes("Soft & durable")); assert.ok(html.includes("Easy to carry"));
  assert.ok(!html.includes("alert(1)")); assert.ok(!html.includes("<li>"));
});

test("repairs repeatedly corrupted bullets while preserving valid Unicode and product measurements", async () => {
  const { productDetails, descriptionText } = await import("../../frontend/lib/" + "lakeeshopProduct.ts");
  const cp1252 = new TextDecoder("windows-1252");
  const damage = (value: string) => cp1252.decode(new TextEncoder().encode(value));
  for (const bullet of ["•", damage("•"), damage(damage("•")), damage(damage(damage("•"))), "&#8226;", "&bull;"]) {
    const product = productDetails({ product_name: "Wonderchef Nigella", detail_description: `"Wonderchef Nigella\n${bullet} Brand: Wonderchef\n${bullet} Perfect Cooking Every Time\n${bullet} Dimension: 29 x 21.5 x 7 cm\n${bullet} Weight: 1.5 kg\n${bullet} Warranty: Manufacturer warranty"` }, "SKU");
    assert.deepEqual(product.features, ["Perfect Cooking Every Time"]);
    assert.ok(product.specifications.some((item: any) => item.label === "Brand" && item.value === "Wonderchef"));
    assert.ok(product.specifications.some((item: any) => item.label === "Warranty" && item.value === "Manufacturer warranty"));
    assert.deepEqual(product.paragraphs, []);
  }
  assert.equal(descriptionText("Café • ₹1,499 — हिंदी 日本語 20cm"), "Café • ₹1,499 — हिंदी 日本語 20cm");
  assert.equal(descriptionText('Dimensions: 20" x 12"'), 'Dimensions: 20" x 12"');
});
