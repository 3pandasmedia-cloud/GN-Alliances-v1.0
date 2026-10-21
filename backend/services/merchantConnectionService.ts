import { endpointPath } from "./lakeeshopEndpoints";
import { accessToken, validAuth, validBase } from "./lakeeshopService";

const checks = new Map<string, { expiresAt: number; connected: boolean; checkedAt: string }>();
const pending = new Map<string, Promise<{ connected: boolean; checkedAt: string }>>();

// A configured integration is only connected after a real authenticated catalog request.
export async function checkMerchantConnection(setting: any) {
  const checkedAt = new Date().toISOString();
  if (!setting.enabled || !setting.merchantId || !setting.secretEncrypted || !(setting.endpoints as any)?.products?.enabled || !validBase(setting.baseUrl) || !validAuth(setting.authEndpoint)) {
    return { connected: false, checkedAt };
  }
  const key = `${setting.id}:${new Date(setting.updatedAt).getTime()}`;
  const cached = checks.get(key);
  if (cached && cached.expiresAt > Date.now()) return { connected: cached.connected, checkedAt: cached.checkedAt };
  const existing = pending.get(key);
  if (existing) return existing;
  const request = (async () => {
    let connected = false;
    try {
      const bounded = { ...setting, requestTimeoutMs: Math.min(setting.requestTimeoutMs || 5000, 5000) };
      const token = await accessToken(bounded);
      const response = await fetch(new URL(endpointPath(setting, "productsPage", { page: 0, size: 1 }), `${setting.baseUrl}/`), { headers: { Accept: "application/json", Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(bounded.requestTimeoutMs) });
      const body = await response.json().catch(() => null);
      connected = response.ok && body !== null && body.success !== false && !body.error;
    } catch { connected = false; }
    const result = { connected, checkedAt: new Date().toISOString() };
    checks.set(key, { ...result, expiresAt: Date.now() + 30000 });
    return result;
  })();
  pending.set(key, request);
  try { return await request; } finally { pending.delete(key); }
}
