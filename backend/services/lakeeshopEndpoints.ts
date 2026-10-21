export type Endpoint = { name: string; method: "GET" | "POST" | "DELETE"; path: string; enabled: boolean; notes: string };
export const endpointDefaults: Record<string, Endpoint> = {
  authentication: { name: "Authentication", method: "POST", path: "/token", enabled: true, notes: "Uses the authentication URL configured above to obtain an access token." },
  products: { name: "Product Catalog", method: "GET", path: "/product_details/all", enabled: true, notes: "Retrieve the complete product catalog." },
  productsPage: { name: "Paginated Products", method: "GET", path: "/product_details/all/page?page=:page&size=:size", enabled: true, notes: "Used by the product listing. Parameters: page and size." },
  productDetail: { name: "Product Details", method: "GET", path: "/product_details/by_code/:product_code", enabled: true, notes: "Used by product details and checkout. Parameter: product_code." },
  brands: { name: "Brand API", method: "GET", path: "/brand/active", enabled: true, notes: "Retrieve active brands." },
  categories: { name: "Category API", method: "GET", path: "/category/active", enabled: true, notes: "Retrieve active categories." },
  pincode: { name: "PIN Code Validation", method: "GET", path: "/pincode/validate/:pincode", enabled: true, notes: "Parameter: pincode." },
  stock: { name: "Stock Validation", method: "GET", path: "/product_details/stock_validate/product_code/:product_code/quantity/:quantity", enabled: true, notes: "Parameters: product_code and quantity." },
  orderCreate: { name: "Create Order", method: "POST", path: "/order/create", enabled: true, notes: "Submits delivery and product details. Used by Place order." },
  orderStatus: { name: "Order Status", method: "GET", path: "/order/id/:order_id", enabled: true, notes: "Used to update order history. Parameter: order_id." },
  orderCancel: { name: "Cancel Order", method: "DELETE", path: "/order/id/:order_id", enabled: true, notes: "Requests cancellation from Lakeeshop. Parameter: order_id." },
};
export function mergeEndpoints(stored: any): Record<string, Endpoint> {
  return Object.fromEntries(Object.entries(endpointDefaults).map(([key, value]) => [key, { ...value, ...(stored?.[key] || {}), name: value.name, method: value.method }]));
}
const parameters = (path: string) => [...path.matchAll(/:([a-z_]+)/g)].map(match => match[1]);
export function validEndpointSettings(value: any): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.entries(value).every(([key, item]: [string, any]) => {
    const expected = endpointDefaults[key];
    if (!expected || !item || item.method !== expected.method || typeof item.enabled !== "boolean" || typeof item.path !== "string" || !item.path.startsWith("/") || item.path.startsWith("//") || item.path.includes("://") || item.path.includes("\\") || /[\s#]/.test(item.path)) return false;
    if (key === "authentication" && item.path !== "/token") return false;
    const required = parameters(expected.path);
    const actual = parameters(item.path);
    return required.every(name => actual.includes(name)) && actual.every(name => required.includes(name));
  });
}
export function endpointPath(config: any, key: string, values: Record<string, string | number> = {}) {
  const endpoint = mergeEndpoints(config.endpoints)[key];
  if (!endpoint) throw new Error("Unknown Lakeeshop endpoint.");
  if (!endpoint.enabled) throw new Error(`${endpoint.name} is disabled. Contact 3Pandas Media to enable it.`);
  return endpoint.path.replace(/:([a-z_]+)/g, (_: string, name: string) => {
    if (values[name] === undefined) throw new Error(`Missing endpoint parameter: ${name}`);
    return encodeURIComponent(String(values[name]));
  });
}
