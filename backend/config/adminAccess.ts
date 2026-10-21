export const adminModuleKeys = ["dashboard", "merchants", "banks", "fintechs", "campaigns", "offers", "analytics", "reconciliation", "landingOffers", "employees", "settings"] as const;
export type AdminModule = typeof adminModuleKeys[number];
export const moduleEnabled = (modules: unknown, key: AdminModule) => modules == null || (typeof modules === "object" && !Array.isArray(modules) && (modules as Record<string, unknown>)[key] === true);
export const validModules = (value: unknown): value is Record<AdminModule, boolean> => !!value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).every(key => adminModuleKeys.includes(key as AdminModule)) && adminModuleKeys.every(key => typeof (value as any)[key] === "boolean");
