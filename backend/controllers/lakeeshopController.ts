import { Response } from "express";
import { mergeEndpoints, validEndpointSettings, endpointPath } from "../services/lakeeshopEndpoints";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/authMiddleware";
import { accessToken, connectionMessage, defaults, decrypt, encrypt, message, publicConfig, validAuth, validBase } from "../services/lakeeshopService";

const config = async () => {
  const saved = (await prisma.lakeeshopApiConfig.findFirst({ orderBy: { createdAt: "asc" } })) || await prisma.lakeeshopApiConfig.create({ data: { ...defaults, endpoints: defaults.endpoints } });
  return { ...saved, endpoints: mergeEndpoints(saved.endpoints) };
};
const writeLog = (req: AuthRequest, name: string, setting: any, result: any) => prisma.lakeeshopApiTestLog.create({ data: { apiName: name, environment: setting.environment, status: result.ok ? "SUCCESS" : "FAILED", httpStatus: result.httpStatus, responseTimeMs: result.responseTimeMs, message: message(result.message), createdById: req.user?.id } });
const catalogPageCache = new Map<string, { expiresAt: number; value: { data: any; items: any[]; path: string } }>();
const catalogPageRequests = new Map<string, Promise<{ data: any; items: any[]; path: string }>>();
const catalogCacheTtlMs = 5 * 60 * 1000;

export const getSettings = async (_: AuthRequest, res: Response) => { try { res.json(publicConfig(await config())); } catch { res.status(500).json({ message: "Unable to load Lakeeshop settings" }); } };
export const updateSettings = async (req: AuthRequest, res: Response) => { try { const current = await config(); const body = req.body || {}; if (!["sandbox", "production"].includes(body.environment) || typeof body.integrationName !== "string" || !body.integrationName.trim() || !validBase(body.baseUrl) || !validAuth(body.authEndpoint) || !Number.isInteger(body.requestTimeoutMs) || body.requestTimeoutMs < 1000 || body.requestTimeoutMs > 30000 || !validEndpointSettings(body.endpoints)) return res.status(400).json({ message: "Please provide valid Lakeeshop settings." }); let secretEncrypted = current.secretEncrypted; if (typeof body.secretKey === "string" && body.secretKey) secretEncrypted = encrypt(body.secretKey); const updated = await prisma.lakeeshopApiConfig.update({ where: { id: current.id }, data: { integrationName: body.integrationName.trim(), enabled: Boolean(body.enabled), environment: body.environment, baseUrl: body.baseUrl, authEndpoint: body.authEndpoint, merchantId: typeof body.merchantId === "string" ? body.merchantId.trim() || null : null, requestTimeoutMs: body.requestTimeoutMs, endpoints: mergeEndpoints({ ...current.endpoints, ...body.endpoints }), secretEncrypted, updatedById: req.user?.id } }); await writeLog(req, "Configuration", updated, { ok: true, message: "Lakeeshop settings updated" }); res.json(publicConfig(updated)); } catch (error) { res.status(500).json({ message: error instanceof Error && error.message === "Encryption unavailable" ? "Set LAKEESHOP_ENCRYPTION_KEY before saving a secret." : "Unable to save Lakeeshop settings" }); } };

export const testEndpoint = async (req: AuthRequest, res: Response, suppliedKey?: string) => {
  const key = suppliedKey || String(req.params.endpoint || "");
  const began = Date.now();
  const setting = await config();
  const endpoint = setting.endpoints[key];
  if (!setting.enabled || !endpoint?.enabled) return res.status(400).json({ ok: false, message: "This API is disabled or needs configuration." });
  const body = req.body || {};
  const changesOrder = key === "orderCreate" || key === "orderCancel";
  if (changesOrder && body.confirmMutation !== true) return res.status(400).json({ ok: false, message: "Confirm this test first. It can create or cancel an order in the configured environment." });
  if (key === "orderCreate") return createOrder(req, res);
  const values: Record<string, string | number> = {};
  if (key === "pincode") {
    if (!/^[0-9]{6}$/.test(String(body.pincode || ""))) return res.status(400).json({ ok: false, message: "Enter a 6-digit PIN code." });
    values.pincode = body.pincode;
  }
  if (key === "productDetail" || key === "stock") {
    if (!/^[A-Za-z0-9._-]{1,120}$/.test(String(body.productCode || ""))) return res.status(400).json({ ok: false, message: "Enter a valid product code." });
    values.product_code = body.productCode;
  }
  if (key === "stock") {
    const quantity = Number(body.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ ok: false, message: "Enter a valid quantity." });
    values.quantity = quantity;
  }
  if (key === "productsPage") {
    const page = Number(body.page ?? 0), size = Number(body.size ?? 1);
    if (!Number.isInteger(page) || page < 0 || page > 9999 || !Number.isInteger(size) || size < 1 || size > 50) return res.status(400).json({ ok: false, message: "Enter a valid page and a page size between 1 and 50." });
    values.page = page; values.size = size;
  }
  if (key === "orderStatus" || key === "orderCancel") {
    const id = String(body.orderId || "").trim();
    if (!/^[A-Za-z0-9._-]{1,150}$/.test(id)) return res.status(400).json({ ok: false, message: "Enter a valid Lakeeshop or client order ID." });
    values.order_id = id;
  }
  try {
    let response: globalThis.Response;
    if (key === "authentication") {
      if (!setting.merchantId || !setting.secretEncrypted) return res.status(400).json({ ok: false, message: "Save the merchant ID and secret key before testing authentication." });
      response = await fetch(setting.authEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, signal: AbortSignal.timeout(setting.requestTimeoutMs), body: JSON.stringify({ merchant_id: setting.merchantId, secret_key: decrypt(setting.secretEncrypted) }) });
    } else {
      const path = endpointPath(setting, key, values);
      const token = await accessToken(setting);
      response = await fetch(new URL(path, `${setting.baseUrl}/`), { method: endpoint.method, headers: { Accept: "application/json", Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(setting.requestTimeoutMs) });
    }
    const payload = await response.json().catch(() => null);
    const hasToken = key !== "authentication" || Boolean(payload?.access_token || payload?.token || payload?.data?.access_token || payload?.data?.token);
    const ok = response.ok && hasToken && payload?.success !== false && !payload?.error;
    const result = { ok, httpStatus: response.status, responseTimeMs: Date.now() - began, message: ok ? (response.status === 200 ? "API Working" : `API request succeeded (HTTP ${response.status}).`) : message(payload?.message || (hasToken ? "API request failed." : "Authentication did not return an access token.")) };
    if (ok && key === "orderCancel") await prisma.lakeeshopOrder.updateMany({ where: { OR: [{ providerOrderId: String(values.order_id) }, { clientOrderId: String(values.order_id) }] }, data: { status: "CANCELLED", statusResponse: payload } });
    await writeLog(req, endpoint.name, setting, result);
    return res.status(ok ? 200 : 502).json(result);
  } catch (error) {
    const result = { ok: false, responseTimeMs: Date.now() - began, message: connectionMessage(error) };
    await writeLog(req, endpoint.name, setting, result);
    return res.status(502).json(result);
  }
};
export const testAuthentication = (req: AuthRequest, res: Response) => testEndpoint(req, res, "authentication");
export const testProducts = (req: AuthRequest, res: Response) => testEndpoint(req, res, "products");
export const testBrands = (req: AuthRequest, res: Response) => testEndpoint(req, res, "brands");
export const testCategories = (req: AuthRequest, res: Response) => testEndpoint(req, res, "categories");
export const testPincode = (req: AuthRequest, res: Response) => testEndpoint(req, res, "pincode");
export const testStock = (req: AuthRequest, res: Response) => testEndpoint(req, res, "stock");
export const getStatus = async (_: AuthRequest, res: Response) => { try { const setting = await config(); const logs = await prisma.lakeeshopApiTestLog.findMany({ take: 20, orderBy: { createdAt: "desc" } }); const last = logs.find((item) => item.status === "SUCCESS"); const latest = logs[0]; const configured = setting.enabled && setting.merchantId && setting.secretEncrypted; const status = !configured ? "CONFIGURATION_REQUIRED" : latest?.status === "FAILED" ? "AUTHENTICATION_FAILED" : last ? "CONNECTED" : "UNKNOWN"; res.json({ status, environment: setting.environment, baseUrl: setting.baseUrl, enabledApis: Object.values(setting.endpoints as any).filter((item: any) => item.enabled).length, lastSuccessfulCheck: last?.createdAt || null, lastHealthCheck: latest?.createdAt || null, endpoints: setting.endpoints, recentActivity: logs.slice(0, 5) }); } catch { res.status(500).json({ message: "Unable to load Lakeeshop status" }); } };
export const getLogs = async (req: AuthRequest, res: Response) => { try { const where: any = {}; ["apiName", "environment", "status"].forEach((key) => { if (typeof req.query[key] === "string" && req.query[key]) where[key] = req.query[key]; }); const take = Math.min(Math.max(Number(req.query.limit) || 25, 1), 100); const [items, total] = await Promise.all([prisma.lakeeshopApiTestLog.findMany({ where, take, orderBy: { createdAt: "desc" } }), prisma.lakeeshopApiTestLog.count({ where })]); res.json({ items, total }); } catch { res.status(500).json({ message: "Unable to load Lakeeshop activity" }); } };
const catalogData = async (req: AuthRequest, res: Response, key: "products" | "categories") => {
  const setting = await config();
  const endpoint: any = (setting.endpoints as any)[key];
  if (!setting.enabled || !endpoint?.enabled) return res.status(400).json({ message: "Enable and configure the Lakeeshop integration before loading data." });
  const requestedPage = Math.max(0, Math.min(Number.parseInt(String(req.query.page || "0"), 10) || 0, 9999));
  const size = Math.max(1, Math.min(Number.parseInt(String(req.query.size || "20"), 10) || 20, 50));
  const category = typeof req.query.category === "string" ? req.query.category.trim().slice(0, 120) : "";
  const search = typeof req.query.search === "string" ? req.query.search.trim().slice(0, 120) : "";
  try {
    const token = await accessToken(setting);
    const getPage = async (sourcePage: number) => {
      const path = endpointPath(setting, "productsPage", { page: sourcePage, size });
      const cacheKey = `${setting.id}:${setting.updatedAt}:${setting.baseUrl}:${path}`;
      const cached = catalogPageCache.get(cacheKey);
      if (cached && cached.expiresAt > Date.now()) return cached.value;
      const inFlight = catalogPageRequests.get(cacheKey);
      if (inFlight) return inFlight;
      const request = (async () => {
        const response = await fetch(new URL(path, `${setting.baseUrl}/`), { headers: { Accept: "application/json", Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(setting.requestTimeoutMs) });
        const data = await response.json().catch(() => null);
        if (!response.ok) throw new Error(message(data?.message || "Lakeeshop could not load data"));
        const items = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : Array.isArray(data?.content) ? data.content : [];
        const value = { data, items, path };
        catalogPageCache.set(cacheKey, { expiresAt: Date.now() + catalogCacheTtlMs, value });
        return value;
      })();
      catalogPageRequests.set(cacheKey, request);
      try { return await request; } finally { catalogPageRequests.delete(cacheKey); }
    };
    if (key === "categories") {
      const response = await fetch(new URL(endpoint.path, `${setting.baseUrl}/`), { headers: { Accept: "application/json", Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(setting.requestTimeoutMs) });
      const data = await response.json().catch(() => null);
      if (!response.ok) return res.status(502).json({ message: message(data?.message || "Lakeeshop could not load data") });
      return res.json({ data, source: endpoint.path, fetchedAt: new Date().toISOString() });
    }
    if (!category && !search) {
      const result = await getPage(requestedPage);
      return res.json({ data: result.data, page: requestedPage, size, source: result.path, fetchedAt: new Date().toISOString() });
    }
    const matches: any[] = [];
    for (let sourcePage = 0; sourcePage < 500 && matches.length < (requestedPage + 1) * size; sourcePage += 1) {
      const result = await getPage(sourcePage);
      const matchesCategory = (item: any) => Object.values(item || {}).some((value) => typeof value === "string" && value.trim().toLocaleLowerCase() === category.toLocaleLowerCase());
      const matchesSearch = (item: any) => !search || [item?.product_name, item?.name, item?.product_code, item?.sku_code, item?.brand_name, item?.brand].some((value) => typeof value === "string" && value.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
      matches.push(...result.items.filter((item: any) => (!category || matchesCategory(item)) && matchesSearch(item)));
      if (result.items.length < size) break;
    }
    return res.json({ data: matches.slice(requestedPage * size, (requestedPage + 1) * size), page: requestedPage, size, category, search, fetchedAt: new Date().toISOString() });
  } catch (error) { return res.status(502).json({ message: connectionMessage(error) }); }
};
export const getCatalogItems = (req: AuthRequest, res: Response) => catalogData(req, res, "products");
export const getCatalogCategories = (req: AuthRequest, res: Response) => catalogData(req, res, "categories");

export const getCatalogItem = async (req: AuthRequest, res: Response) => {
  const setting = await config();
  const code = String(req.params.code || "").trim();
  if (!setting.enabled || !(setting.endpoints as any).products?.enabled) return res.status(400).json({ message: "Enable and configure the Lakeeshop integration before loading data." });
  if (!/^[A-Za-z0-9._-]{1,120}$/.test(code)) return res.status(400).json({ message: "Invalid product code." });
  try {
    const token = await accessToken(setting);
    const response = await fetch(new URL(endpointPath(setting, "productDetail", { product_code: code }), `${setting.baseUrl}/`), { headers: { Accept: "application/json", Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(setting.requestTimeoutMs) });
    const data = await response.json().catch(() => null);
    if (!response.ok) return res.status(502).json({ message: message(data?.message || "Lakeeshop could not load product details") });
    return res.json({ data });
  } catch (error) { return res.status(502).json({ message: connectionMessage(error) }); }
};

const valueFrom = (value: any, keys: string[]): any => { if (!value || typeof value !== "object") return undefined; if (Array.isArray(value)) return value.map(item => valueFrom(item, keys)).find(Boolean); for (const key of keys) if (value[key] !== undefined && value[key] !== null && value[key] !== "") return value[key]; return Object.values(value).map(item => valueFrom(item, keys)).find(Boolean); };
const statusFrom = (value: any) => String(value?.data?.status || valueFrom(value, ["order_status", "orderStatus", "order_state", "orderState", "status"]) || "SUBMITTED").toUpperCase();
const providerOrderIdFrom = (value: any) => { const id = valueFrom(value, ["lakee_order_id", "lakeeOrderId", "lakeeshop_order_id", "lakeeshopOrderId", "order_id", "orderId"]); return id ? String(id) : undefined; };

const refreshOrder = async (setting: any, order: any) => {
  const identifier = order.providerOrderId || order.clientOrderId;
  try {
    const token = await accessToken(setting);
    const response = await fetch(new URL(endpointPath(setting, "orderStatus", { order_id: identifier }), `${setting.baseUrl}/`), { headers: { Accept: "application/json", Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(setting.requestTimeoutMs) });
    const data = await response.json().catch(() => null);
    if (!response.ok) return order;
    // A slow refresh must not overwrite a newer cancellation or status update.
    const result = await prisma.lakeeshopOrder.updateMany({ where: { id: order.id, updatedAt: order.updatedAt }, data: { providerOrderId: providerOrderIdFrom(data) || order.providerOrderId, status: statusFrom(data), statusResponse: data } });
    if (result.count === 0) return (await prisma.lakeeshopOrder.findUnique({ where: { id: order.id } })) || order;
    return { ...order, providerOrderId: providerOrderIdFrom(data) || order.providerOrderId, status: statusFrom(data), statusResponse: data };
  } catch { return order; }
};

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const setting = await config();
    let orders = await (prisma as any).lakeeshopOrder.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    if (req.query.refresh === "true" && setting.enabled) orders = await Promise.all(orders.map((order: any) => refreshOrder(setting, order)));
    res.json({ items: orders });
  } catch { res.status(500).json({ message: "Unable to load Lakeeshop orders." }); }
};

export const cancelOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = await (prisma as any).lakeeshopOrder.findUnique({ where: { id: String(req.params.id || "") } });
    if (!order) return res.status(404).json({ message: "Order not found." });
    if (/cancel|deliver|complete|closed|fail|reject/i.test(order.status)) return res.status(400).json({ message: `This order cannot be cancelled because it is ${order.status.toLowerCase()}.` });
    const setting = await config();
    if (!setting.enabled) return res.status(400).json({ message: "Enable the Lakeeshop integration before cancelling an order." });
    const identifier = order.providerOrderId || order.clientOrderId;
    const cancelPath = endpointPath(setting, "orderCancel", { order_id: identifier });
    const token = await accessToken(setting);
    const response = await fetch(new URL(cancelPath, `${setting.baseUrl}/`), { method: "DELETE", headers: { Accept: "application/json", Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(setting.requestTimeoutMs) });
    const data = await response.json().catch(() => null);
    if (!response.ok) return res.status(502).json({ message: message(data?.message || "Lakeeshop could not cancel the order") });
    const updated = await (prisma as any).lakeeshopOrder.update({ where: { id: order.id }, data: { status: "CANCELLED", statusResponse: data } });
    await writeLog(req, "Order Cancellation", setting, { ok: true, httpStatus: response.status, message: "Order cancelled" });
    return res.json({ ok: true, httpStatus: response.status, message: "Order cancelled successfully.", order: updated });
  } catch (error) { return res.status(502).json({ message: connectionMessage(error) }); }
};

export const createOrder = async (req: AuthRequest, res: Response) => {
  const setting = await config();
  const body = req.body || {};
  const productCode = String(body.productCode || "").trim();
  const quantity = Number(body.quantity);
  const customer = body.customer || {};
  const required = ["customer_name", "customer_email", "customer_mobile", "address_line1", "city", "state", "pincode"];
  if (!setting.enabled || !setting.merchantId) return res.status(400).json({ message: "Enable the integration and configure the merchant ID before placing orders." });
  if (!/^[A-Za-z0-9._-]{1,120}$/.test(productCode) || !Number.isInteger(quantity) || quantity < 1 || required.some(key => !String(customer[key] || "").trim())) return res.status(400).json({ message: "Enter a valid product, quantity, and complete delivery details." });
  if (!/^\d{6}$/.test(String(customer.pincode)) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(customer.customer_email)) || !/^\d{10}$/.test(String(customer.customer_mobile).replace(/\D/g, ""))) return res.status(400).json({ message: "Enter a valid email, 10-digit mobile number, and 6-digit pincode." });
  const clientOrderId = `GN-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  try {
    const token = await accessToken(setting);
    const productResponse = await fetch(new URL(endpointPath(setting, "productDetail", { product_code: productCode }), `${setting.baseUrl}/`), { headers: { Accept: "application/json", Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(setting.requestTimeoutMs) });
    const productData = await productResponse.json().catch(() => null);
    if (!productResponse.ok) return res.status(502).json({ message: message(productData?.message || "Lakeeshop could not validate the selected product") });
    const product = Array.isArray(productData) ? productData[0] : Array.isArray(productData?.data) ? productData.data[0] : productData?.data || productData;
    const productName = String(product?.product_name || product?.name || productCode).slice(0, 300);
    const mobile = Number(String(customer.customer_mobile).replace(/\D/g, ""));
    const invoicePrice = String(product?.product_price ?? product?.sale_price ?? product?.price ?? product?.basic_price ?? "0");
    const payload = [{ merchant_id: setting.merchantId, client_order_id: clientOrderId, order_date: new Date().toISOString().slice(0, 10), source: "GN Alliances", customer_details: { customer_name: customer.customer_name.trim(), customer_email: customer.customer_email.trim(), customer_mobile: mobile, alternate_number: mobile, address_details: { ship_to_name: customer.customer_name.trim(), address_line1: customer.address_line1.trim(), address_line2: String(customer.address_line2 || "").trim(), address_line3: "", address_line4: "", landmark: "", city: customer.city.trim(), state: customer.state.trim(), pincode: Number(customer.pincode) } }, product_details: { client_product_code: productCode, product_name: productName, quantity }, additional_info: { program_name: "GN Alliances", po_number: clientOrderId, invoice_price: invoicePrice, redemption_details: { redemption_type: "GN Alliances", points: 0, amount: 0 } } }];
    const response = await fetch(new URL(endpointPath(setting, "orderCreate"), `${setting.baseUrl}/`), { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(payload), signal: AbortSignal.timeout(setting.requestTimeoutMs) });
    const data = await response.json().catch(() => null);
    const result = { ok: response.ok, httpStatus: response.status, message: response.ok ? "Order placed" : message(data?.message || "Lakeeshop could not create the order") };
    await writeLog(req, "Order Create", setting, result);
    const savedOrder = response.ok ? await (prisma as any).lakeeshopOrder.create({ data: { clientOrderId, providerOrderId: providerOrderIdFrom(data), status: statusFrom(data), productCode, productName, quantity, customer: { name: customer.customer_name.trim(), email: customer.customer_email.trim(), mobile, addressLine1: customer.address_line1.trim(), addressLine2: String(customer.address_line2 || "").trim(), city: customer.city.trim(), state: customer.state.trim(), pincode: String(customer.pincode) }, providerResponse: data, createdById: req.user?.id } }) : undefined;
    return res.status(response.ok ? 201 : 502).json({ ...result, clientOrderId, order: savedOrder, data: response.ok ? data : undefined });
  } catch (error) { const result = { ok: false, message: connectionMessage(error) }; await writeLog(req, "Order Create", setting, result); return res.status(502).json(result); }
};
