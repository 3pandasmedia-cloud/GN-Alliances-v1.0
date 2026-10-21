"use client";
import { useRef, useState } from "react";
import { Play, CheckCircle2, XCircle, LoaderCircle } from "lucide-react";
import { authFetch } from "@/lib/api";
import styles from "./SettingsPanel.module.css";

type Endpoint = { name: string; method: string; enabled: boolean };
type Result = { ok: boolean; httpStatus?: number; responseTimeMs?: number; message: string };
const exampleOrder = JSON.stringify({ productCode: "", quantity: 1, customer: { customer_name: "", customer_email: "", customer_mobile: "", address_line1: "", address_line2: "", city: "", state: "", pincode: "" } }, null, 2);
export default function ApiChecks({ endpoints, environment, onTested }: { endpoints: Record<string, Endpoint>; environment: string; onTested: () => void }) {
  const [values, setValues] = useState({ productCode: "", quantity: "1", pincode: "", page: "0", size: "1", orderId: "" });
  const [orderJson, setOrderJson] = useState(exampleOrder);
  const [results, setResults] = useState<Record<string, Result>>({});
  const [running, setRunning] = useState("");
  const runningRef = useRef(false);
  const run = async (key: string, event: React.FormEvent) => {
    event.preventDefault(); if (runningRef.current) return;
    let body: Record<string, unknown> = { ...values, quantity: Number(values.quantity), page: Number(values.page), size: Number(values.size) };
    try {
      if (key === "orderCreate") { body = JSON.parse(orderJson); if (!body || Array.isArray(body) || typeof body !== "object") throw new Error("Enter an order request as a JSON object."); }
      if (key === "orderCreate" || key === "orderCancel") {
        const action = key === "orderCreate" ? "create an order using the entered delivery details" : `cancel order ${values.orderId}`;
        if (!window.confirm(`This test will ${action} in ${environment} mode. Send this request to Lakeeshop?`)) return;
        body.confirmMutation = true;
      }
      runningRef.current = true; setRunning(key);
      const response = await authFetch(`/lakeeshop/test/${key}`, { method: "POST", body: JSON.stringify(body) });
      const data = await response.json().catch(() => ({}));
      const ok = response.ok && data.ok === true;
      setResults(old => ({ ...old, [key]: { ...data, ok, message: ok && data.httpStatus === 200 ? "API Working" : data.message || "Unable to test this API." } }));
      onTested();
    } catch (error) { setResults(old => ({ ...old, [key]: { ok: false, message: error instanceof SyntaxError ? "Enter valid order JSON before testing." : error instanceof Error ? error.message : "Unable to connect. Please try again." } })); }
    finally { runningRef.current = false; setRunning(""); }
  };
  const field = (key: keyof typeof values, label: string, type = "text") => <label className={styles.field}><span>{label}</span><input required type={type} value={values[key]} min={key === "page" ? 0 : 1} max={key === "size" ? 50 : undefined} pattern={key === "pincode" ? "[0-9]{6}" : undefined} placeholder={key === "productCode" ? "Product SKU" : key === "orderId" ? "Lakeeshop or client order ID" : undefined} onChange={event => setValues(old => ({ ...old, [key]: event.target.value }))}/></label>;
  return <section className={styles.panel}>
    <div className={styles.sectionHeader}><div><h2>API checks</h2><p>Test each endpoint and see its response here. Tests use your saved settings.</p></div><span className={styles.tag}>{Object.keys(endpoints).length} tests</span></div>
    <div className={styles.checkGrid}>{Object.entries(endpoints).map(([key, endpoint]) => {
      const result = results[key];
      return <form key={key} className={styles.checkCard} onSubmit={event => void run(key, event)}>
        <div className={styles.checkTitle}><h3>{endpoint.name}</h3><span className={styles.method}>{endpoint.method}</span></div>
        <div className={styles.checkFields}>
          {(key === "productDetail" || key === "stock") && field("productCode", "Product code")}
          {key === "stock" && field("quantity", "Quantity", "number")}
          {key === "pincode" && field("pincode", "PIN code")}
          {key === "productsPage" && <>{field("page", "Page", "number")}{field("size", "Page size", "number")}</>}
          {(key === "orderStatus" || key === "orderCancel") && field("orderId", "Order ID")}
          {key === "orderCreate" && <label className={styles.field}><span>Order request (JSON)</span><textarea required rows={8} value={orderJson} spellCheck={false} onChange={event => setOrderJson(event.target.value)}/></label>}
        </div>
        {(key === "orderCreate" || key === "orderCancel") && <p className={styles.warning}>Sends an order-changing request in {environment} mode. Confirmation is required.</p>}
        <div className={styles.checkFooter}><button type="submit" className={styles.testButton} disabled={!!running || !endpoint.enabled} aria-label={`Test ${endpoint.name}`}>{running === key ? <LoaderCircle size={15} className={styles.spin}/> : <Play size={14}/>} {running === key ? "Testing..." : "Test API"}</button>{!endpoint.enabled && <span className={styles.muted}>Disabled</span>}</div>
        {result && <div role="status" aria-live="polite" className={`${styles.result} ${result.ok ? styles.pass : styles.fail}`}>{result.ok ? <CheckCircle2 size={17}/> : <XCircle size={17}/>}<div><strong>{result.message}</strong><span>{result.httpStatus ? `HTTP ${result.httpStatus}` : "No provider response"}{result.responseTimeMs !== undefined ? ` | ${result.responseTimeMs} ms` : ""}</span></div></div>}
      </form>;
    })}</div>
  </section>;
}
