import crypto from "crypto";
import { endpointDefaults, mergeEndpoints } from "./lakeeshopEndpoints";

export const defaults = { integrationName: "Lakeeshop", enabled: false, environment: "sandbox", baseUrl: "https://lsorder.lakeetech.com", authEndpoint: "https://lvalidate.lakeetech.com/token", requestTimeoutMs: 15000, endpoints: endpointDefaults };

const key = () => { const raw = process.env.LAKEESHOP_ENCRYPTION_KEY; if (!raw) throw new Error("Encryption unavailable"); const result = /^[0-9a-f]{64}$/i.test(raw) ? Buffer.from(raw, "hex") : Buffer.from(raw, "base64"); if (result.length !== 32) throw new Error("Encryption unavailable"); return result; };
export const encrypt = (value: string) => { const iv = crypto.randomBytes(12); const cipher = crypto.createCipheriv("aes-256-gcm", key(), iv); const data = Buffer.concat([cipher.update(value), cipher.final()]); return `${iv.toString("base64")}.${cipher.getAuthTag().toString("base64")}.${data.toString("base64")}`; };
export const decrypt = (value: string) => { const [iv, tag, data] = value.split("."); if (!iv || !tag || !data) throw new Error("Invalid secret"); const cipher = crypto.createDecipheriv("aes-256-gcm", key(), Buffer.from(iv, "base64")); cipher.setAuthTag(Buffer.from(tag, "base64")); return Buffer.concat([cipher.update(Buffer.from(data, "base64")), cipher.final()]).toString(); };
export const validBase = (value: string) => { try { const url = new URL(value); return url.protocol === "https:" && ["lsorder.lakeetech.com", "order.lakeetech.com"].includes(url.hostname) && url.pathname === "/"; } catch { return false; } };
export const validAuth = (value: string) => { try { const url = new URL(value); return url.protocol === "https:" && url.hostname === "lvalidate.lakeetech.com" && url.pathname === "/token"; } catch { return false; } };
export const validPath = (value: string) => value.startsWith("/") && !value.startsWith("//") && !value.includes("://") && !value.includes("\\");
export const publicConfig = (config: any) => ({ ...config, endpoints: mergeEndpoints(config.endpoints), secretEncrypted: undefined, secretConfigured: Boolean(config.secretEncrypted) });
export const message = (value: unknown) => (typeof value === "string" ? value : "Request failed").replace(/(secret|token|authorization)\s*[:=]\s*[^\s,}]+/gi, "$1: [redacted]").slice(0, 300);
export const connectionMessage = (error: unknown) => {
  if (!(error instanceof Error)) return "Unable to reach Lakeeshop";
  const cause = error.cause;
  const code = cause && typeof cause === "object" && "code" in cause ? String((cause as { code?: unknown }).code || "") : "";
  const reasons: Record<string, string> = {
    ENOTFOUND: "Lakeeshop's hostname could not be resolved. Check the backend server's DNS connection.",
    EAI_AGAIN: "DNS lookup for Lakeeshop timed out. Check the backend server's network connection.",
    ECONNREFUSED: "Lakeeshop refused the connection. Verify the approved API URL and service availability.",
    ECONNRESET: "Lakeeshop reset the connection. Try again and verify any firewall or proxy rules.",
    ETIMEDOUT: "The connection to Lakeeshop timed out. Check outbound HTTPS/firewall or proxy rules.",
    UND_ERR_CONNECT_TIMEOUT: "The connection to Lakeeshop timed out. Check outbound HTTPS/firewall or proxy rules.",
    CERT_HAS_EXPIRED: "Lakeeshop's TLS certificate has expired. Contact the API provider.",
    UNABLE_TO_VERIFY_LEAF_SIGNATURE: "Lakeeshop's TLS certificate could not be verified. Check the server trust store or proxy.",
  };
  if (code && reasons[code]) return reasons[code];
  if (error.name === "TimeoutError") return "The Lakeeshop request timed out. Check outbound HTTPS/firewall or proxy rules.";
  return error.message === "fetch failed" ? "Could not connect to Lakeeshop. Verify the backend server can make outbound HTTPS requests and that no firewall or proxy is blocking it." : message(error.message);
};

const tokenCache = new Map<string, { value: string; expiresAt: number }>();
const tokenFrom = (value: any): string | undefined => value?.access_token || value?.token || value?.data?.access_token || value?.data?.token;
export const accessToken = async (config: any) => {
  if (!mergeEndpoints(config.endpoints).authentication.enabled) throw new Error("Authentication is disabled. Contact 3Pandas Media to enable it.");
  const cached = tokenCache.get(config.id);
  if (cached && cached.expiresAt > Date.now()) return cached.value;
  if (!config.merchantId || !config.secretEncrypted) throw new Error("Lakeeshop credentials are incomplete");
  const response = await fetch(config.authEndpoint, { method: "POST", signal: AbortSignal.timeout(config.requestTimeoutMs), headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ merchant_id: config.merchantId, secret_key: decrypt(config.secretEncrypted) }) });
  const payload = await response.json().catch(() => null);
  const token = response.ok ? tokenFrom(payload) : undefined;
  if (!token) throw new Error(response.ok ? "Lakeeshop authentication response did not contain a token" : message(payload?.message || "Lakeeshop authentication failed"));
  const lifetime = Number(payload?.expires_in || payload?.expiresIn || payload?.data?.expires_in || 0);
  if (Number.isFinite(lifetime) && lifetime > 30) tokenCache.set(config.id, { value: token, expiresAt: Date.now() + (lifetime - 15) * 1000 });
  return token;
};
