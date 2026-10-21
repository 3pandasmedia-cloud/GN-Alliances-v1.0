"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { authFetch } from "@/lib/api";
import { AdminModule, moduleForPath } from "@/lib/adminAccess";

const Context = createContext({ role: "", ready: false, error: "", can: (_: AdminModule | "admins"): boolean => false, refresh: () => {} });
export const useAdminAccess = () => useContext(Context);
export function AdminAccessProvider({ children }: { children: React.ReactNode }) {
  const [access, setAccess] = useState<{ role: string; adminModules: Record<string, boolean> | null } | null>(null);
  const [error, setError] = useState("");
  const refresh = useCallback(async () => {
    try {
      const response = await authFetch("/auth/access", { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to verify your access. Please sign in again.");
      setAccess(await response.json()); setError("");
    } catch { setAccess(null); setError("Unable to verify your access. Please try again."); }
  }, []);
  useEffect(() => { void refresh(); const timer = window.setInterval(refresh, 30000); window.addEventListener("focus", refresh); return () => { window.clearInterval(timer); window.removeEventListener("focus", refresh); }; }, [refresh]);
  const can = (key: AdminModule | "admins") => access?.role === "super-admin" || (access?.role === "admin" && key !== "admins" && (access.adminModules == null || access.adminModules[key] === true));
  return <Context.Provider value={{ role: access?.role || "", ready: !!access, error, can, refresh }}>{children}</Context.Provider>;
}
export function AdminModuleGuard({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { ready, error, can, refresh } = useAdminAccess();
  if (error) return <div role="alert" className="rounded-2xl border bg-white p-8">{error}<button onClick={refresh} className="ml-3 text-blue-800 underline">Retry</button></div>;
  if (!ready) return <p className="p-8 text-slate-500">Checking access...</p>;
  const key = moduleForPath(path);
  if (key && !can(key)) return <div className="rounded-3xl border border-slate-200 bg-white p-10"><h1 className="text-2xl font-bold text-[#0b2e83]">Section unavailable</h1><p className="mt-3 text-slate-500">This section is not enabled for your account. Please contact 3Pandas Media.</p></div>;
  return <>{children}</>;
}
