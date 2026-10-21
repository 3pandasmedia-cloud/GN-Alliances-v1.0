"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Info, ShieldCheck, TriangleAlert, X } from "lucide-react";
import styles from "./Popup.module.css";

type Kind = "alert" | "confirm" | "prompt";
type Request = { kind: Kind; message: string; initial: string; resolve: (value: string | boolean | null) => void };
const queue: Request[] = [];
let notify: (() => void) | undefined;
function request(kind: Kind, message: unknown, initial = "") {
  return new Promise<string | boolean | null>(resolve => {
    queue.push({ kind, message: String(message ?? ""), initial, resolve });
    notify?.();
  });
}
export const popup = {
  alert: async (message?: unknown) => { await request("alert", message); },
  confirm: async (message: unknown) => (await request("confirm", message)) === true,
  prompt: async (message: unknown, initial = "") => await request("prompt", message, initial) as string | null,
};

export default function PopupHost() {
  const [active, setActive] = useState<Request | null>(null);
  const [value, setValue] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const cancelButton = useRef<HTMLButtonElement>(null);
  const acceptButton = useRef<HTMLButtonElement>(null);
  const current = useRef<Request | null>(null);
  useEffect(() => {
    const next = () => {
      if (current.current || !queue.length) return;
      const item = queue.shift()!;
      current.current = item;
      setValue(item.initial);
      setActive(item);
    };
    notify = next;
    next();
    return () => { notify = undefined; };
  }, []);
  useEffect(() => {
    if (!active || !dialog.current) return;
    dialog.current.showModal();
    if (active.kind === "prompt") { input.current?.focus(); input.current?.select(); }
    else if (active.kind === "confirm") cancelButton.current?.focus();
    else acceptButton.current?.focus();
  }, [active]);
  const finish = (accepted: boolean) => {
    if (!current.current) return;
    const item = current.current;
    current.current = null;
    dialog.current?.close();
    setActive(null);
    item.resolve(item.kind === "prompt" ? accepted ? value : null : accepted);
    // Let React unmount this dialog before opening the next queued message.
    window.setTimeout(() => notify?.(), 0);
  };
  if (!active) return null;
  const destructive = active.kind === "confirm" && /delete|cancel.*order|cannot be undone/i.test(active.message);
  const title = active.kind === "prompt" ? "Update details" : active.kind === "confirm" ? destructive ? "Confirm your action" : "Before you continue" : "Account notification";
  const Icon = destructive ? TriangleAlert : active.kind === "alert" ? Info : ShieldCheck;
  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="gn-popup-title" aria-describedby="gn-popup-message" onCancel={event => { event.preventDefault(); finish(false); }}>
    <form onSubmit={event => { event.preventDefault(); finish(true); }} className={styles.card}>
      <div className={styles.brand}><span className={styles.brandMark}>GN</span><span>G.N. ALLIANCES<span className={styles.tagline}>PARTNERSHIPS THAT GROW</span></span><button type="button" className={styles.close} aria-label="Close popup" onClick={() => finish(false)}><X size={18}/></button></div>
      <div className={styles.content}>
        <span className={`${styles.icon} ${destructive ? styles.danger : ""}`}><Icon size={25} strokeWidth={1.7}/></span>
        <h2 id="gn-popup-title">{title}</h2>
        <p id="gn-popup-message">{active.kind === "prompt" ? "Keep your account details up to date." : active.message}</p>
        {active.kind === "prompt" && <div className={styles.field}><label htmlFor="gn-popup-input">{active.message}</label><input ref={input} id="gn-popup-input" value={value} onChange={event => setValue(event.target.value)} autoComplete="off" required/></div>}
      </div>
      <div className={styles.footer}>
        {active.kind !== "alert" && <button ref={cancelButton} type="button" className={styles.secondary} onClick={() => finish(false)}>Cancel</button>}
        <button ref={acceptButton} type="submit" autoFocus={active.kind !== "prompt"} className={`${styles.primary} ${destructive ? styles.destructive : ""}`}>{active.kind === "prompt" ? "Save changes" : active.kind === "confirm" ? "Confirm" : "Got it"}<ArrowRight size={16}/></button>
      </div>
    </form>
  </dialog>;
}
