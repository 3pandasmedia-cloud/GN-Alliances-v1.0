"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";

type Settings = { useCustom: boolean; host: string; port: number; username: string; fromEmail: string; fromName: string; passwordConfigured: boolean; serverConfigured: boolean; activeFromEmail: string };
const field = "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";
const button = "rounded-xl bg-[#0b2e83] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50";
export default function EmailSenderSettings({ onSaved }: { onSaved?: (ready: boolean) => void } = {}) {
  const [settings, setSettings] = useState<Settings>();
  const [password, setPassword] = useState("");
  const [testTo, setTestTo] = useState("");
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    authFetch("/website-settings/email", { signal: controller.signal }).then(async response => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to load email settings.");
      if (!controller.signal.aborted) setSettings(data);
    }).catch(error => { if (!controller.signal.aborted) setError(error.message); });
    return () => controller.abort();
  }, []);
  const edit = (patch: Partial<Settings>) => { setSettings(current => current ? { ...current, ...patch } : current); setDirty(true); setNotice(""); };
  const save = async (event: React.FormEvent) => {
    event.preventDefault(); if (!settings || busy) return;
    setBusy("save"); setError(""); setNotice("");
    try {
      const response = await authFetch("/website-settings/email", { method: "PUT", body: JSON.stringify({ useCustom: settings.useCustom, host: settings.host, port: settings.port, username: settings.username, fromEmail: settings.fromEmail, fromName: settings.fromName, password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to save email settings.");
      setSettings(data); setPassword(""); setDirty(false); onSaved?.(data.useCustom || data.serverConfigured);
      setNotice("Email sender saved. New OTP and demo notification emails will use this sender.");
    } catch (error) { setError(error instanceof Error ? error.message : "Unable to save email settings."); }
    finally { setBusy(""); }
  };
  const test = async (event: React.FormEvent) => {
    event.preventDefault(); if (busy || dirty) return;
    setBusy("test"); setError(""); setNotice("");
    try {
      const response = await authFetch("/website-settings/email/test", { method: "POST", body: JSON.stringify({ to: testTo }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to send test email.");
      setNotice(data.message);
    } catch (error) { setError(error instanceof Error ? error.message : "Unable to send test email."); }
    finally { setBusy(""); }
  };
  return <div className="space-y-5">
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm text-blue-950">
      <h2 className="text-lg font-bold">Email sender for OTPs and demo notifications</h2>
      <p className="mt-2">Connect your GN email mailbox here. This changes the sending account; public contact details and demo recipient addresses are managed in their own tabs.</p>
      <p className="mt-2">Use the SMTP details supplied by GN’s email provider. The sender address must be authorized by that provider. For Gmail or Google Workspace, use an app password when required.</p>
      {settings && <p className="mt-3 font-semibold">Saved active sender: {settings.activeFromEmail || "Not configured"}</p>}
    </section>
    {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    {notice && <p role="status" className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">{notice}</p>}
    {!settings ? <p>{error ? "Email settings could not be loaded. Reload to retry." : "Loading email settings..."}</p> : <>
      <form onSubmit={save} className="space-y-5 rounded-3xl border bg-white p-5 sm:p-6">
        <fieldset disabled={!!busy} className="space-y-5">
          <legend className="sr-only">Sending account</legend>
          <label className="block text-sm font-semibold">Sending configuration<select className={field} value={settings.useCustom ? "custom" : "server"} onChange={event => edit({ useCustom: event.target.value === "custom" })}><option value="server">Current server email configuration</option><option value="custom">GN mailbox / custom SMTP</option></select></label>
          {!settings.useCustom && <p className="text-sm text-slate-600">{settings.serverConfigured ? "The existing server email configuration remains active. Choose GN mailbox / custom SMTP to replace the personal sender." : "Server email is not configured. Connect a mailbox below."}</p>}
          {settings.useCustom && <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">SMTP host<input required autoComplete="off" value={settings.host} onChange={event => edit({ host: event.target.value })} placeholder="smtp.your-provider.com" className={field}/></label>
            <label className="text-sm font-semibold">SMTP port<select value={settings.port} onChange={event => edit({ port: Number(event.target.value) })} className={field}><option value={587}>587 — STARTTLS</option><option value={465}>465 — SSL/TLS</option><option value={2525}>2525 — STARTTLS</option></select></label>
            <label className="text-sm font-semibold">SMTP username / mailbox<input required autoComplete="off" value={settings.username} onChange={event => edit({ username: event.target.value })} className={field}/></label>
            <label className="text-sm font-semibold">SMTP password / app password<input type="password" required={!settings.passwordConfigured} autoComplete="new-password" value={password} onChange={event => { setPassword(event.target.value); setDirty(true); setNotice(""); }} placeholder={settings.passwordConfigured ? "Leave blank to keep saved password" : "Enter mailbox SMTP password"} className={field}/><span className="mt-2 block text-xs font-normal text-slate-500">{settings.passwordConfigured ? "A password is saved securely. Re-enter it if you change the server or mailbox." : "Stored encrypted and never displayed after saving."}</span></label>
            <label className="text-sm font-semibold">Sender name<input maxLength={100} value={settings.fromName} onChange={event => edit({ fromName: event.target.value })} className={field}/></label>
            <label className="text-sm font-semibold">Sender email address<input required type="email" value={settings.fromEmail} onChange={event => edit({ fromEmail: event.target.value })} placeholder="Your GN-provided address" className={field}/></label>
          </div>}
          <p className="text-sm text-slate-500">Saving a custom sender verifies SMTP login first. If verification fails, the previous sender remains active.</p>
          <button type="submit" className={button}>{busy === "save" ? "Verifying and saving..." : "Save email sender"}</button>
        </fieldset>
      </form>
      <form onSubmit={test} className="space-y-4 rounded-3xl border bg-white p-5 sm:p-6">
        <h3 className="font-bold">Send a test email</h3>
        <p className="text-sm text-slate-500">Uses the saved active sender. Save changes first, then confirm the sender address in the received message.</p>
        <label className="block text-sm font-semibold">Test recipient<input required type="email" value={testTo} onChange={event => setTestTo(event.target.value)} className={field}/></label>
        <button disabled={!!busy || dirty} className={button}>{busy === "test" ? "Sending..." : "Send test email"}</button>
        {dirty && <p className="text-sm text-amber-700">Save your changes before testing.</p>}
      </form>
    </>}
  </div>;
}
