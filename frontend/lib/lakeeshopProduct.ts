// Some provider descriptions were decoded as Windows-1252 more than once.
// Repair only reversible UTF-8 sequences, leaving valid multilingual text intact.
export function repairProductText(value: string): string {
  const extra = new Map<number, number>([
    [0x20ac,0x80],[0x201a,0x82],[0x0192,0x83],[0x201e,0x84],[0x2026,0x85],
    [0x2020,0x86],[0x2021,0x87],[0x02c6,0x88],[0x2030,0x89],[0x0160,0x8a],
    [0x2039,0x8b],[0x0152,0x8c],[0x017d,0x8e],[0x2018,0x91],[0x2019,0x92],
    [0x201c,0x93],[0x201d,0x94],[0x2022,0x95],[0x2013,0x96],[0x2014,0x97],
    [0x02dc,0x98],[0x2122,0x99],[0x0161,0x9a],[0x203a,0x9b],[0x0153,0x9c],
    [0x017e,0x9e],[0x0178,0x9f],
  ]);
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let result = value;
  for (let pass = 0; pass < 4; pass++) {
    const next = result.replace(/[\u00c2-\u00f4][\u0080-\u00ff\u0152\u0153\u0160\u0161\u0178\u017d\u017e\u0192\u02c6\u02dc\u2013-\u2026\u2030\u2039\u203a\u20ac\u2122]+/g, sequence => {
      const bytes: number[] = [];
      for (const char of sequence) { const point = char.codePointAt(0)!; const byte = extra.get(point) ?? (point <= 255 ? point : undefined); if (byte === undefined) return sequence; bytes.push(byte); }
      try { return decoder.decode(new Uint8Array(bytes)); } catch { return sequence; }
    });
    if (next === result) break;
    result = next;
  }
  return result;
}
type Product = Record<string, any>;
export function descriptionText(value: unknown): string {
  if (typeof value !== "string") return "";
  return repairProductText(value).replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (entity, code: string) => { const point = code[0].toLowerCase() === "x" ? parseInt(code.slice(1), 16) : Number(code); return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : entity; }).replace(/&bull;|&bullet;/gi, "\u2022").replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "").replace(/<br\s*\/?\s*>|<\/(p|div|li|h[1-6])>/gi, "\n").replace(/<li\b[^>]*>/gi, "\n• ").replace(/<[^>]+>/g, "").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").trim().replace(/^"([\s\S]*\n[\s\S]*)"$/, "$1");
}
const text = (...values: unknown[]) => values.map(descriptionText).find(Boolean) || "";
export function numeric(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}
export function productDetails(product: Product, fallbackCode: string) {
  const name = text(product.product_name, product.name) || fallbackCode;
  const code = String(product.sku_code || product.product_code || product.code || fallbackCode);
  const shortDescription = text(product.short_description, product.shortDescription, product.summary);
  const fullDescription = text(product.detail_description, product.long_description, product.full_description, product.product_description, product.description);
  const images = [...new Set([
    ...(typeof product.images === "object" && product.images ? Object.values(product.images) : []),
    product.image, product.image_url, product.thumbnail,
  ].filter((value): value is string => typeof value === "string" && /^https?:\/\//i.test(value)))];
  const paragraphs: string[] = [], features: string[] = [], specifications: { label: string; value: string }[] = [];
  const addSpec = (label: string, value: unknown) => {
    const rendered = typeof value === "number" ? String(value) : descriptionText(value);
    if (rendered && !specifications.some(item => item.label.toLowerCase() === label.toLowerCase())) specifications.push({ label, value: rendered });
  };
  for (const raw of fullDescription.split("\n")) {
    const line = raw.trim();
    if (!line || line.toLowerCase() === name.toLowerCase() || /^(product details|description|specifications|features):?$/i.test(line)) continue;
    const bullet = /^[•*\-]\s*/.test(line);
    const content = line.replace(/^[•*\-]\s*/, "").trim();
    const pair = content.match(/^([^:]{1,45}):\s*(.+)$/);
    if (pair && (bullet || /^(brand|model|material|capacity|dimensions?|weight|warranty|colou?r|note)$/i.test(pair[1]))) addSpec(pair[1].trim(), pair[2]);
    else if (bullet) features.push(content);
    else if (line !== shortDescription) paragraphs.push(line);
  }
  if (product.specifications && typeof product.specifications === "object" && !Array.isArray(product.specifications)) Object.entries(product.specifications).forEach(([key, value]) => addSpec(key, value));
  for (const [key, label] of [["model", "Model"], ["material", "Material"], ["capacity", "Capacity"], ["dimensions", "Dimensions"], ["weight", "Weight"], ["warranty", "Warranty"], ["color", "Color"], ["hsn_code", "HSN code"], ["spec1", "Specification 1"], ["spec2", "Specification 2"], ["spec3", "Specification 3"], ["spec4", "Specification 4"]]) addSpec(label, product[key]);
  const price = numeric(product.product_price ?? product.sale_price ?? product.price ?? product.basic_price);
  return { name, code, images, shortDescription, fullDescription, paragraphs, features, specifications, brand: text(product.brand_name, product.brand), category: text(product.primary_category_name, product.category_name, product.category), subcategory: text(product.sub_category_name), price, mrp: numeric(product.product_mrp ?? product.mrp), basePrice: numeric(product.basic_price), tax: numeric(product.tax_amount), taxPercentage: numeric(product.tax_percentage), shipping: numeric(product.shipping_amount) };
}
