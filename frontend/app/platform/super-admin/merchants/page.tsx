"use client";
import EntityActions from "@/components/auth/EntityActions";
import { useCallback, useEffect, useState } from "react";
import { readLakeeshopCache, writeLakeeshopCache } from "@/lib/lakeeshopCache";
import { authFetch } from "@/lib/api";
import { Building2, CircleCheck, CircleMinus } from "lucide-react";
import styles from "./Merchants.module.css";
import PartnerTable, { Merchant } from "../../partner/components/PartnerTable";
import AddPartnerModal from "../../partner/components/AddPartnerModal";

type Overview = { merchants: Merchant[]; stats: { total: number; active: number; pending: number; inactive: number } };
export default function MerchantsPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const load = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await authFetch("/partners/merchant-overview", { signal });
      const data = await response.json();
      if (!response.ok || !Array.isArray(data.merchants) || !data.stats) throw new Error(data.message || "Unable to load merchant data.");
      if (!signal?.aborted) { setOverview(data); writeLakeeshopCache("merchant-overview", data); setError(""); }
    } catch (error) {
      if (!signal?.aborted) setError(error instanceof Error ? error.message : "Unable to load merchant data.");
    } finally { if (!signal?.aborted) setLoading(false); }
  }, []);
  useEffect(() => {
    const cached = readLakeeshopCache<Overview>("merchant-overview");
    const controller = new AbortController();
    if (cached?.value?.merchants && cached.value.stats) queueMicrotask(() => { if (!controller.signal.aborted) { setOverview(cached.value); setLoading(false); } });
    let inFlight = false;
    const refresh = async () => { if (inFlight) return; inFlight = true; try { await load(controller.signal); } finally { inFlight = false; } };
    void refresh();
    const timer = window.setInterval(() => void refresh(), 30000);
    window.addEventListener("focus", refresh);
    return () => { controller.abort(); window.clearInterval(timer); window.removeEventListener("focus", refresh); };
  }, [load]);
  const stats = overview?.stats;
  return <div className={styles.page}>
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h1 className="text-3xl font-bold md:text-4xl">Merchants</h1><p className="mt-2 text-gray-500">View merchant accounts and live API connection status.</p></div><EntityActions><button onClick={() => setOpen(true)} className="h-12 rounded-xl bg-[#0B2E83] px-6 font-medium text-white transition hover:bg-[#08246B]">+ Add Partner</button></EntityActions></div>
    {error && <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{error}{overview && " Showing the last successful update."} <button className="ml-2 underline" onClick={() => void load()}>Retry</button></p>}
    <div className={styles.stats}>
      {[{ label: "Total Merchants", value: stats?.total, icon: Building2, tone: "" }, { label: "Active Merchants", value: stats?.active, icon: CircleCheck, tone: styles.active }, { label: "Inactive Merchants", value: stats?.inactive, icon: CircleMinus, tone: styles.inactive }].map(item => <div className={styles.card} key={item.label}><div><p className={styles.label}>{item.label}</p><h3 className={styles.value}>{item.value ?? "-"}</h3></div><span className={`${styles.icon} ${item.tone}`} aria-hidden="true"><item.icon size={22}/></span></div>)}
    </div>
    <PartnerTable merchants={overview?.merchants || []} loading={loading}/>
    <AddPartnerModal isOpen={open} onClose={() => setOpen(false)} onCreated={() => { void load(); }}/>
  </div>;
}
