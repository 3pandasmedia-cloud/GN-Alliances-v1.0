export const adminModules = [
  ["dashboard", "Dashboard"], ["merchants", "Merchants"], ["banks", "Banks"], ["fintechs", "FinTechs"],
  ["campaigns", "Campaigns"], ["offers", "Offers"], ["analytics", "Analytics"], ["reconciliation", "Reconciliation"],
  ["landingOffers", "Landing Offers"], ["employees", "Employees"], ["settings", "Settings"],
] as const;
export type AdminModule = typeof adminModules[number][0];
export type ModulePermissions = Record<AdminModule, boolean>;
export const defaultModules = (): ModulePermissions => Object.fromEntries(adminModules.map(([key]) => [key, true])) as ModulePermissions;
export const moduleForPath = (path: string): AdminModule | "admins" | null => {
  const part = path.replace(/^\/platform\/(super-admin|admin)\/?/, "");
  if (!part) return "dashboard";
  if (/^clients\/banks(?:\/|$)/.test(part)) return "banks";
  if (/^clients(?:\/|$)/.test(part)) return "fintechs";
  const key = part.split("/")[0];
  const map: Record<string, AdminModule | "admins"> = { merchants: "merchants", lakeeshop: "merchants", campaigns: "campaigns", offers: "offers", analytics: "analytics", reconciliation: "reconciliation", "landing-offers": "landingOffers", employees: "employees", settings: "settings", admins: "admins", "website-settings": "admins", users: "employees" };
  return map[key] ?? null;
};
