// EDIT GUIDE: Order list, date filters, detail view and Excel columns. See docs/EDITING_GUIDE.md.
"use client";

import { useState } from "react";
import { ArrowLeft, Download } from "lucide-react";

type Order = {
  id: string; clientOrderId: string; providerOrderId?: string; status: string;
  productName: string; productCode: string; quantity: number; createdAt: string; updatedAt?: string;
  customer?: { name?: string; email?: string; mobile?: string; addressLine1?: string; addressLine2?: string; city?: string; state?: string; pincode?: string };
};
type Props = { orders: Order[]; busy: string; onCancel: (id: string) => void; notice: string; refreshing: boolean; loaded: boolean; updatedAt?: number };
const button = "rounded-xl bg-[#0A2E8A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#082570] disabled:cursor-not-allowed disabled:opacity-50";
const address = (order: Order) => [order.customer?.addressLine1, order.customer?.addressLine2, order.customer?.city, order.customer?.state, order.customer?.pincode].filter(Boolean).join(", ");
const date = (value: string) => new Date(value).toLocaleString();
function Status({ status }: { status: string }) {
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${/cancel|fail|reject/i.test(status) ? "bg-red-100 text-red-700" : /deliver|complete|success/i.test(status) ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-800"}`}>{status.replaceAll("_", " ")}</span>;
}

export default function OrderHistory({ orders, busy, onCancel, notice, refreshing, loaded, updatedAt }: Props) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [range, setRange] = useState({ from: "", to: "" });
  const [selectedId, setSelectedId] = useState<string>();
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const invalid = !!from && !!to && from > to;
  const filtered = orders.filter(order => {
    const placed = new Date(order.createdAt).getTime();
    const start = range.from ? new Date(`${range.from}T00:00:00`).getTime() : -Infinity;
    const end = range.to ? new Date(`${range.to}T00:00:00`).getTime() : Infinity;
    const nextDay = new Date(end);
    if (range.to) nextDay.setDate(nextDay.getDate() + 1);
    return placed >= start && placed < (range.to ? nextDay.getTime() : Infinity);
  });
  const selected = orders.find(order => order.id === selectedId);
  const exportOrders = async () => {
    setExporting(true); setExportError("");
    try {
      const { Workbook } = await import("exceljs");
      const workbook = new Workbook();
      const sheet = workbook.addWorksheet("Orders");
      sheet.addRow(["Placed", "Order", "Client order", "Product", "Product code", "Quantity", "Customer", "Email", "Mobile", "Delivery address", "Status"]);
      filtered.forEach(order => sheet.addRow([date(order.createdAt), order.providerOrderId || order.clientOrderId, order.clientOrderId, order.productName, order.productCode, order.quantity, order.customer?.name || "", order.customer?.email || "", order.customer?.mobile || "", address(order), order.status.replaceAll("_", " ")]));
      sheet.getRow(1).font = { bold: true };
      sheet.columns.forEach(column => { column.width = 24; });
      sheet.getColumn(10).width = 60;
      sheet.views = [{ state: "frozen", ySplit: 1 }];
      sheet.autoFilter = { from: "A1", to: "K1" };
      const buffer = await workbook.xlsx.writeBuffer();
      const url = URL.createObjectURL(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
      const link = document.createElement("a");
      link.href = url; link.download = `lakeeshop-orders-${range.from || "all"}-to-${range.to || "latest"}.xlsx`;
      document.body.appendChild(link); link.click(); link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch { setExportError("Unable to export orders. Please try again."); }
    finally { setExporting(false); }
  };
  return <div className="space-y-6">
    <div><h1 className="text-2xl font-bold">{selected ? "Order details" : "Order history"}</h1><p className="mt-1 text-sm text-slate-500">Status updates automatically every 30 seconds.</p><p className="mt-2 text-xs text-slate-400" role="status">{refreshing ? "Checking for updates..." : updatedAt ? `Last updated at ${new Date(updatedAt).toLocaleTimeString()}` : "Loading orders..."}</p></div>
    {notice && <p role="status" className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-[#0A2E8A]">{notice}</p>}
    {selected ? <>
      <button onClick={() => setSelectedId(undefined)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A2E8A]"><ArrowLeft size={16}/>Back to orders</button>
      <section className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-bold">{selected.providerOrderId || selected.clientOrderId}</h2><Status status={selected.status}/></div>
        <dl className="grid gap-6 sm:grid-cols-2">
          {[["Client order", selected.clientOrderId], ["Placed", date(selected.createdAt)], ["Product", selected.productName], ["Product code", selected.productCode], ["Quantity", selected.quantity], ["Customer", selected.customer?.name], ["Email", selected.customer?.email], ["Mobile", selected.customer?.mobile], ["Delivery address", address(selected)], ["Last updated", selected.updatedAt ? date(selected.updatedAt) : "—"]].map(([label, value]) => <div key={label}><dt className="text-sm text-slate-500">{label}</dt><dd className="mt-1 break-words font-medium">{value || "—"}</dd></div>)}
        </dl>
        {!/cancel|deliver|complete|closed|fail|reject/i.test(selected.status) ? <div className="border-t pt-5"><button disabled={!!busy} onClick={() => onCancel(selected.id)} className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50">{busy === selected.id ? "Cancelling..." : "Cancel order"}</button></div> : <p className="border-t pt-5 text-sm text-slate-500">Cancellation is unavailable for this order.</p>}
      </section>
    </> : <>
      <section className="rounded-2xl border bg-white p-4 shadow-sm" aria-label="Order filters">
        <form onSubmit={event => { event.preventDefault(); if (!invalid) setRange({ from, to }); }} className="flex flex-wrap items-end gap-3">
          <label className="space-y-1 text-sm font-medium"><span className="block">From date</span><input type="date" value={from} max={to || undefined} onChange={event => setFrom(event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2"/></label>
          <label className="space-y-1 text-sm font-medium"><span className="block">To date</span><input type="date" value={to} min={from || undefined} onChange={event => setTo(event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2"/></label>
          <button type="submit" disabled={invalid} className={button}>Search range</button>
          <button type="button" onClick={() => { setFrom(""); setTo(""); setRange({ from: "", to: "" }); }} className="rounded-xl border px-4 py-2 text-sm font-semibold">Clear</button>
          <button type="button" disabled={!filtered.length || exporting} onClick={exportOrders} className={`${button} inline-flex items-center gap-2 sm:ml-auto`}><Download size={16}/>{exporting ? "Exporting..." : "Export to Excel"}</button>
        </form>
        {invalid && <p role="alert" className="mt-2 text-sm text-red-700">Choose an end date on or after the start date.</p>}
        <p className="mt-3 text-xs text-slate-500" role="status">{filtered.length} orders{range.from || range.to ? ` · ${range.from || "Beginning"} to ${range.to || "Latest"}` : " · All dates"}. Export includes these results.</p>
        {exportError && <p role="alert" className="mt-2 text-sm text-red-700">{exportError}</p>}
      </section>
      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm"><table className="min-w-full text-sm"><thead className="bg-slate-50 text-left text-slate-500"><tr>{["Placed", "Order", "Product", "Customer & delivery", "Status"].map(label => <th key={label} scope="col" className="p-4">{label}</th>)}</tr></thead>
        <tbody>{filtered.length ? filtered.map(order => <tr key={order.id} onClick={() => setSelectedId(order.id)} className="cursor-pointer border-t align-top hover:bg-blue-50/50">
          <td className="whitespace-nowrap p-4">{date(order.createdAt)}</td>
          <td className="p-4"><button onClick={event => { event.stopPropagation(); setSelectedId(order.id); }} className="cursor-pointer text-left font-semibold text-[#0A2E8A] underline underline-offset-4 focus-visible:outline-2">{order.providerOrderId || order.clientOrderId}</button><p className="mt-1 text-xs text-slate-500">Client: {order.clientOrderId}</p></td>
          <td className="p-4"><p className="font-semibold">{order.productName}</p><p className="text-xs text-slate-500">{order.productCode} | Qty {order.quantity}</p></td>
          <td className="p-4"><p>{order.customer?.name}</p><p className="text-xs text-slate-500">{order.customer?.email} | {order.customer?.mobile}</p><p className="mt-1 text-xs text-slate-500">{address(order)}</p></td>
          <td className="p-4"><Status status={order.status}/></td>
        </tr>) : <tr><td colSpan={5} className="p-8 text-center text-slate-500">{!loaded ? "Loading your orders..." : orders.length ? "No orders match the selected date range." : "No Lakeeshop orders have been placed yet."}</td></tr>}</tbody>
      </table></div>
    </>}
  </div>;
}
