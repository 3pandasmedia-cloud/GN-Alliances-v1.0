"use client";

// Session-only, account-scoped snapshots: never reuse another account's orders.
const cacheKey = (name: string) => {
  const user = JSON.parse(sessionStorage.getItem("gn-user") || "null");
  return user?.id ? `gn-lakeeshop-v1:${user.id}:${name}` : null;
};
export function readLakeeshopCache<T>(name: string): { value: T; savedAt: number } | null {
  try {
    const key = cacheKey(name);
    const entry = key ? JSON.parse(sessionStorage.getItem(key) || "null") : null;
    return entry && Date.now() - entry.savedAt < 86400000 ? entry : null;
  } catch { return null; }
}
export function writeLakeeshopCache(name: string, value: unknown) {
  const savedAt = Date.now();
  try {
    const key = cacheKey(name);
    if (key) sessionStorage.setItem(key, JSON.stringify({ value, savedAt }));
  } catch { /* Full or unavailable storage must not interrupt orders. */ }
  return savedAt;
}
