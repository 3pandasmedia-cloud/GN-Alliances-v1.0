"use client";
import styles from "./EndpointSettings.module.css";

type Endpoint = { name: string; method: string; path: string; enabled: boolean; notes?: string };
export default function EndpointSettings({ endpoints, onChange }: { endpoints: Record<string, Endpoint>; onChange: (value: Record<string, Endpoint>) => void }) {
  return <section className={styles.panel}>
    <header className={styles.header}><div><h2>API endpoints</h2><p>Manage authentication, catalog, validation and order endpoints.</p></div><span className={styles.count}>{Object.keys(endpoints).length} endpoints</span></header>
    <div className={styles.list}>{Object.entries(endpoints).map(([key, endpoint]) => <div key={key} className={styles.row}>
      <div className={styles.rowHeader}><div className={styles.identity}><span className={`${styles.method} ${endpoint.method === "POST" ? styles.post : endpoint.method === "DELETE" ? styles.remove : ""}`}>{endpoint.method}</span><h3>{endpoint.name}</h3></div><label className={styles.toggle}><input type="checkbox" checked={endpoint.enabled} onChange={event => onChange({ ...endpoints, [key]: { ...endpoint, enabled: event.target.checked } })} aria-label={`Enable ${endpoint.name}`}/>Enabled</label></div>
      <label className={styles.pathLabel} htmlFor={`endpoint-${key}`}>Endpoint path</label>
      <input id={`endpoint-${key}`} className={styles.path} value={endpoint.path} readOnly={key === "authentication"} onChange={event => onChange({ ...endpoints, [key]: { ...endpoint, path: event.target.value } })} spellCheck={false} autoComplete="off"/>
      {endpoint.notes && <p className={styles.note}>{endpoint.notes}</p>}
    </div>)}</div>
  </section>;
}
