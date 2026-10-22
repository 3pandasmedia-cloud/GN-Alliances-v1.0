"use client";
import { useEffect, useRef, useState } from "react";
import { Activity, CheckCircle2, Save, Settings2, Wifi } from "lucide-react";
import { API_URL } from "@/lib/config";
import { readLakeeshopCache, writeLakeeshopCache } from "@/lib/lakeeshopCache";
import { authFetch } from "@/lib/api";
import EndpointSettings from "./EndpointSettings";
import styles from "./SettingsPanel.module.css";

type Props = { setting: any; setSetting: (value: any) => void; status: any; logs: any[] };
export default function SettingsPanel({ setting, setSetting, status, logs }: Props) {
  const [health, setHealth] = useState(status);
  const [activity, setActivity] = useState(logs);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoError, setLogoError] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [saveOk, setSaveOk] = useState(false);
  const savingRef = useRef(false);
  useEffect(() => setHealth(status), [status]);
  useEffect(() => setActivity(logs), [logs]);
  const refreshActivity = async () => {
    const [statusResult, logResult] = await Promise.allSettled([authFetch("/lakeeshop/status"), authFetch("/lakeeshop/logs")]);
    if (statusResult.status === "fulfilled" && statusResult.value.ok) setHealth(await statusResult.value.json());
    if (logResult.status === "fulfilled" && logResult.value.ok) setActivity((await logResult.value.json()).items || []);
  };
  const save = async (event: React.FormEvent) => {
    event.preventDefault(); if (savingRef.current) return;
    savingRef.current = true; setSaving(true); setNotice("");
    try {
      const response = await authFetch("/lakeeshop/settings", { method: "PUT", body: JSON.stringify(setting) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Unable to save settings.");
      setSetting(data); writeLakeeshopCache("settings", data);
      const cached = readLakeeshopCache<{ merchants: { integration: boolean; logo: string | null; name: string }[]; stats: unknown }>("merchant-overview");
      if (cached) writeLakeeshopCache("merchant-overview", { ...cached.value, merchants: cached.value.merchants.map(merchant => merchant.integration ? { ...merchant, logo: data.logo, name: data.integrationName } : merchant) });
      setSaveOk(true); setNotice("Settings saved successfully."); void refreshActivity().catch(() => undefined);
    } catch (error) { setSaveOk(false); setNotice(error instanceof Error ? error.message : "Unable to save settings."); }
    finally { savingRef.current = false; setSaving(false); }
  };
  const edit = (key: string, value: unknown) => setSetting({ ...setting, [key]: value });
  const uploadLogo = async (file?: File) => {
    if (!file) return;
    setLogoError("");
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 2 * 1024 * 1024) { setLogoError("Choose a PNG, JPG or WebP image up to 2 MB."); return; }
    setUploadingLogo(true);
    try {
      const body = new FormData(); body.append("logo", file);
      const response = await authFetch("/partners/upload-logo", { method: "POST", body });
      const data = await response.json();
      if (!response.ok || !data.logo) throw new Error(data.message || "Unable to upload logo.");
      edit("logo", data.logo);
    } catch (error) { setLogoError(error instanceof Error ? error.message : "Unable to upload logo."); }
    finally { setUploadingLogo(false); }
  };
  const logoUrl = setting.logo?.startsWith("/uploads/") ? `${API_URL.replace(/\/api\/?$/, "")}${setting.logo}` : setting.logo;
  return <div className={styles.page}>
    <header className={styles.heading}><span className={styles.eyebrow}>INTEGRATION SETTINGS</span><h1>Lakeeshop settings</h1><p>Manage your connection and configure API endpoints.</p></header>
    <div className={styles.stats}>
      <div className={styles.stat}><span className={styles.icon}><Wifi size={21}/></span><div><p>Connection</p><strong>{health?.status === "CONNECTED" ? "API Connected" : health?.status === "UNKNOWN" ? "Not checked" : "API Not Connected"}</strong></div></div>
      <div className={styles.stat}><span className={styles.icon}><CheckCircle2 size={21}/></span><div><p>Enabled endpoints</p><strong>{health?.enabledApis ?? Object.values(setting.endpoints).filter((item: any) => item.enabled).length}<small> / {Object.keys(setting.endpoints).length}</small></strong></div></div>
      <div className={styles.stat}><span className={styles.icon}><Activity size={21}/></span><div><p>Last successful check</p><strong className={styles.date}>{health?.lastSuccessfulCheck ? new Date(health.lastSuccessfulCheck).toLocaleString() : "No checks yet"}</strong></div></div>
    </div>
    <form className={styles.form} onSubmit={save}>
      <section className={styles.panel}>
        <div className={styles.sectionHeader}><div><h2>Merchant logo</h2><p>Upload the original logo for the merchants list, then save settings to apply it.</p></div></div>
        <div className="flex flex-wrap items-center gap-4 p-5">
          {logoUrl ? <img src={logoUrl} alt="Merchant logo preview" className="h-20 w-20 rounded-xl border bg-white object-contain p-2"/> : <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-blue-50 text-2xl font-bold text-[#0A2E8A]">{setting.integrationName?.charAt(0) || "L"}</div>}
          <label className="space-y-2 text-sm font-medium"><span className="block">{uploadingLogo ? "Uploading logo..." : "Choose logo (PNG, JPG or WebP, up to 2 MB)"}</span><input className="cursor-pointer file:cursor-pointer disabled:cursor-not-allowed disabled:file:cursor-not-allowed" type="file" accept="image/png,image/jpeg,image/webp" disabled={saving || uploadingLogo} onChange={event => { void uploadLogo(event.target.files?.[0]); event.target.value = ""; }}/></label>
          {setting.logo && <button type="button" disabled={saving || uploadingLogo} onClick={() => edit("logo", null)} className="rounded-lg border px-3 py-2 text-sm">Remove logo</button>}
          {logoError && <p role="alert" className="text-sm text-red-700">{logoError}</p>}
        </div>
      </section>
      <section className={styles.panel}>
        <div className={styles.sectionHeader}><div><h2><Settings2 size={20}/> Connection configuration</h2><p>Update your connection details and save your changes.</p></div><span className={styles.tag}>{setting.environment === "production" ? "Production" : "Sandbox"}</span></div>
        <fieldset className={styles.fields} disabled={saving || uploadingLogo}>
          {[["integrationName", "Integration name", "text"], ["baseUrl", "API base URL", "url"], ["authEndpoint", "Authentication URL", "url"], ["merchantId", "Merchant ID", "text"], ["requestTimeoutMs", "Request timeout (ms)", "number"]].map(([key, label, type]) => <label className={styles.field} key={key}><span>{label}</span><input required type={type} value={setting[key] ?? ""} min={key === "requestTimeoutMs" ? 1000 : undefined} max={key === "requestTimeoutMs" ? 30000 : undefined} step={key === "requestTimeoutMs" ? 1000 : undefined} onChange={event => edit(key, type === "number" ? Number(event.target.value) : event.target.value)}/></label>)}
          <label className={styles.field}><span>Environment</span><select value={setting.environment} onChange={event => edit("environment", event.target.value)}><option value="sandbox">Sandbox</option><option value="production">Production</option></select></label>
          <label className={styles.field}><span>Secret key {setting.secretConfigured && <small className={styles.configured}>Configured</small>}</span><input type="password" value={setting.secretKey || ""} placeholder="Leave blank to keep the saved secret" autoComplete="new-password" onChange={event => edit("secretKey", event.target.value)}/></label>
          <label className={styles.enabled}><input type="checkbox" checked={setting.enabled} onChange={event => edit("enabled", event.target.checked)}/><span><strong>Enable integration</strong><small>Allow Lakeeshop API requests.</small></span></label>
        </fieldset>
      </section>
      <EndpointSettings endpoints={setting.endpoints} onChange={endpoints => edit("endpoints", endpoints)}/>
      <div className={styles.saveBar}>{notice && <p role="status" className={saveOk ? styles.successText : styles.errorText}>{notice}</p>}<button type="submit" disabled={saving || uploadingLogo} className={styles.save}><Save size={17}/>{saving ? "Saving..." : "Save settings"}</button></div>
    </form>
    <section className={styles.panel}><div className={styles.sectionHeader}><div><h2>Recent API activity</h2><p>Results from your latest requests and tests.</p></div></div><div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Time</th><th>API</th><th>Result</th><th>HTTP</th><th>Message</th></tr></thead><tbody>{activity.length ? activity.map((item: any) => <tr key={item.id}><td>{new Date(item.createdAt).toLocaleString()}</td><td>{item.apiName}</td><td><span className={item.status === "SUCCESS" ? styles.successText : styles.errorText}>{item.status}</span></td><td>{item.httpStatus ?? "-"}</td><td>{item.httpStatus === 200 && item.status === "SUCCESS" ? "API Working" : item.message}</td></tr>) : <tr><td colSpan={5}>No API activity recorded yet.</td></tr>}</tbody></table></div></section>
  </div>;
}
