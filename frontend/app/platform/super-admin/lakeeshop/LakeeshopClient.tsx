

// @ts-nocheck
"use client";
import { popup } from "@/components/ui/Popup";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Activity, ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, Menu, PackageSearch, Search, ShoppingCart, Wifi, X } from "lucide-react";
import { authFetch } from "@/lib/api";
import { useSuperAdmin } from "@/lib/useSuperAdmin";
import { readLakeeshopCache, writeLakeeshopCache } from "@/lib/lakeeshopCache";
import { categoryNames } from "@/lib/lakeeshopCategories";
import Checkout from "./Checkout";
import OrderHistory from "./OrderHistory";
import ProductDetail from "./ProductDetail";
import SettingsPanel from "./SettingsPanel";
import productCardStyles from "./ProductCard.module.css";

type Page = "items" | "orders" | "settings" | "detail" | "checkout";
type Props = { page: Page; productCode?: string };
const tabs: [string, string, string[]][] = [["Products", "/platform/super-admin/lakeeshop/items", ["items", "detail", "checkout"]], ["Orders", "/platform/super-admin/lakeeshop/orders", ["orders"]], ["Settings", "/platform/super-admin/lakeeshop/settings", ["settings"]]];
const Btn = ({ children, className = "", ...props }: any) => <button {...props} className={`rounded-xl bg-[#0A2E8A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#082570] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>{children}</button>;
const money = (value: unknown) => Number.isFinite(Number(value)) ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value)) : "Price unavailable";
const rowsFrom = (value: any) => Array.isArray(value) ? value : Array.isArray(value?.data) ? value.data : Array.isArray(value?.content) ? value.content : [];
const productCodeFrom = (product: any) => product?.product_code || product?.sku_code || product?.code || product?.id;
const productName = (product: any) => product?.product_name || product?.name || productCodeFrom(product) || "Unnamed product";
const productImage = (product: any) => product?.images?.image1 || product?.images?.image || product?.image || product?.image_url || product?.thumbnail;
const productPrice = (product: any) => product?.product_price ?? product?.sale_price ?? product?.price ?? product?.basic_price;
const findProduct = (value: any): any => { if (Array.isArray(value)) return value.map(findProduct).find(Boolean); if (!value || typeof value !== "object") return undefined; if (productCodeFrom(value) && (value.product_name || value.name || productImage(value) || productPrice(value) !== undefined)) return value; return Object.values(value).map(findProduct).find(Boolean); };
const isInCategory = (product: any, category: string) => {
  const target = category.trim().toLocaleLowerCase();
  const fields = ["primary_category_name", "primaryCategoryName", "sub_category_name", "subCategoryName", "category_name", "categoryName", "category", "main_category_name", "mainCategoryName"];
  return fields.some(field => typeof product?.[field] === "string" && product[field].trim().toLocaleLowerCase() === target);
};

const Nav = ({ page }: Props) => <nav className="rounded-2xl border border-slate-200 bg-white px-2 shadow-sm"><div className="flex items-center gap-1 overflow-x-auto"><Link href="/platform/super-admin/merchants" aria-label="Back to merchants" title="Back to merchants" className="mr-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#0A2E8A] transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"><ArrowLeft size={20}/></Link><Link href="/platform/super-admin/lakeeshop/items" className="mr-3 flex shrink-0 items-center gap-2 border-r border-slate-200 py-3 pr-4 font-bold text-[#0A2E8A]"><PackageSearch size={21}/>Lakeeshop</Link>{tabs.map(([label, href, pages]) => <Link key={href} href={href} className={`shrink-0 border-b-2 px-3 py-4 text-sm font-semibold transition-colors ${(pages as string[]).includes(page) ? "border-[#F2A900] text-[#0A2E8A]" : "border-transparent text-slate-600 hover:border-slate-300 hover:text-[#0A2E8A]"}`}>{label}</Link>)}</div></nav>;

function ProductCard({ product }: { product: any }) {
  const code = productCodeFrom(product);
  const image = productImage(product);
  const name = productName(product);
  const href = `/platform/super-admin/lakeeshop/items/${encodeURIComponent(String(code))}`;
  const rememberProduct = () => { if (code) writeLakeeshopCache(`product:${code}`, product); };
  return <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#0A2E8A] hover:shadow-lg">
    <Link href={href} onClick={rememberProduct} className="block flex-1">
      <div className="flex aspect-[4/3] items-center justify-center bg-slate-50 p-3">{image ? <img src={image} alt={name} className="h-full w-full object-contain mix-blend-multiply"/> : <PackageSearch size={42} className="text-slate-300"/>}</div>
      <div className="space-y-1.5 p-3"><p className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-slate-800">{name}</p><p className="truncate text-xs text-slate-500">{product.brand_name || product.brand || "Lakeeshop"}{product.sub_category_name ? ` | ${product.sub_category_name}` : ""}</p><strong className="text-base text-slate-900">{money(productPrice(product))}</strong>{code && <p className="truncate text-xs text-slate-400">SKU: {code}</p>}</div>
    </Link>
    {code && <div className={productCardStyles.actions}><Link href={`${href}/checkout`} onClick={rememberProduct} aria-label={`Checkout ${name}`} className={productCardStyles.checkout}><ShoppingCart size={16}/>Checkout</Link></div>}
  </article>;
}

export default function LakeeshopClient({ page, productCode }: Props) {
  const [setting, setSetting] = useState<any>(); const [status, setStatus] = useState<any>(); const [logs, setLogs] = useState<any[]>([]); const [orderHistory, setOrderHistory] = useState<any[]>([]); const [notice, setNotice] = useState(""); const [busy, setBusy] = useState(""); const [catalog, setCatalog] = useState<any>(); const [categoryCatalog, setCategoryCatalog] = useState<any>(); const [detail, setDetail] = useState<any>(); const [catalogPage, setCatalogPage] = useState(0); const [categoryOpen, setCategoryOpen] = useState(false); const [selectedCategory, setSelectedCategory] = useState("All categories"); const [searchInput, setSearchInput] = useState(""); const [searchTerm, setSearchTerm] = useState(""); const [catalogLoading, setCatalogLoading] = useState(false); const [quantity, setQuantity] = useState(1); const [order, setOrder] = useState<Record<string, string>>({ customer_name: "", customer_email: "", customer_mobile: "", address_line1: "", address_line2: "", city: "", state: "", pincode: "" }); const categoryMenuRef = useRef<HTMLElement>(null); const categoryControlRef = useRef<HTMLDivElement>(null);
  const [ordersRefreshing, setOrdersRefreshing] = useState(false);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [ordersUpdatedAt, setOrdersUpdatedAt] = useState<number>();
  const [placedReference, setPlacedReference] = useState("");
  const orderRevision = useRef(0);
  const orderAction = useRef(false);
  const isSuperAdmin = useSuperAdmin();
  const load = async () => { if (page !== "settings") { setSetting({ id: "operational" }); return; } if (JSON.parse(sessionStorage.getItem("gn-user") || "null")?.role !== "super-admin") { setSetting({ id: "client-admin" }); return; } const [settings, health, activity] = await Promise.all([authFetch("/lakeeshop/settings"), authFetch("/lakeeshop/status"), authFetch("/lakeeshop/logs")]); if (!settings.ok) throw new Error((await settings.json().catch(() => ({}))).message || "The Lakeeshop backend is unavailable."); setSetting(await settings.json()); if (health.ok) setStatus(await health.json()); if (activity.ok) setLogs((await activity.json()).items || []); };
  useEffect(() => { load().catch(error => setNotice(error instanceof Error ? error.message : "Unable to load Lakeeshop.")); }, [page]);
  useEffect(() => {
    if (page !== "orders") return;
    let active = true;
    let refreshing = false;
    const cached = readLakeeshopCache<any[]>("orders");
    if (cached && Array.isArray(cached.value)) { setOrderHistory(cached.value); setOrdersUpdatedAt(cached.savedAt); setOrdersLoaded(true); }
    const apply = (items: any[], revision: number) => {
      if (!active || revision !== orderRevision.current) return;
      setOrderHistory(items); setOrdersLoaded(true); setOrdersUpdatedAt(writeLakeeshopCache("orders", items));
    };
    const refresh = async (first = false) => {
      if (refreshing || orderAction.current) return;
      refreshing = true; setOrdersRefreshing(true);
      const revision = orderRevision.current;
      try {
        // Local database rows arrive first; provider status checks run afterwards.
        if (first) {
          const saved = await authFetch("/lakeeshop/orders");
          if (saved.ok) { const data = await saved.json(); if (Array.isArray(data.items)) apply(data.items, revision); }
        }
        const response = await authFetch("/lakeeshop/orders?refresh=true");
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(payload.message || "Unable to update orders.");
        if (Array.isArray(payload.items)) apply(payload.items, revision);
      } catch (error) {
        if (active) setNotice(error instanceof Error ? error.message : "Unable to update orders. Your saved list is still available.");
      } finally { refreshing = false; if (active) { setOrdersRefreshing(false); setOrdersLoaded(true); } }
    };
    void refresh(true);
    const timer = window.setInterval(() => void refresh(), 30000);
    return () => { active = false; window.clearInterval(timer); };
  }, [page]);
  useEffect(() => {
    if (!setting || page !== "items") return;
    let active = true;
    const params = new URLSearchParams({ page: String(catalogPage), size: "24" });
    if (selectedCategory !== "All categories") params.set("category", selectedCategory);
    if (searchTerm) params.set("search", searchTerm);
    const key = `catalog:${params}`;
    setCatalog(readLakeeshopCache<any>(key)?.value);
    setCatalogLoading(true);
    authFetch(`/lakeeshop/catalog/items?${params}`).then(async response => {
      const payload = await response.json(); if (!response.ok) throw new Error(payload.message);
      if (active) { setCatalog(payload); writeLakeeshopCache(key, payload); }
    }).catch(error => active && setNotice(error instanceof Error ? error.message : "Unable to load products.")).finally(() => active && setCatalogLoading(false));
    return () => { active = false; };
  }, [page, setting?.id, catalogPage, selectedCategory, searchTerm]);
  useEffect(() => { if (!setting || page !== "items") return; let active = true; setCategoryCatalog(readLakeeshopCache<any>("categories")?.value); authFetch("/lakeeshop/catalog/categories").then(async response => { const payload = await response.json(); if (!response.ok) throw new Error(payload.message); if (active) { setCategoryCatalog(payload); writeLakeeshopCache("categories", payload); } }).catch(error => active && setNotice(error instanceof Error ? error.message : "Unable to load categories.")); return () => { active = false; }; }, [page, setting?.id]);
  useEffect(() => { if (!categoryOpen) return; const closeOnOutsideClick = (event: MouseEvent) => { const target = event.target as Node; if (!categoryMenuRef.current?.contains(target) && !categoryControlRef.current?.contains(target)) setCategoryOpen(false); }; document.addEventListener("mousedown", closeOnOutsideClick); return () => document.removeEventListener("mousedown", closeOnOutsideClick); }, [categoryOpen]);
  useEffect(() => { if (!setting || (page !== "detail" && page !== "checkout") || !productCode) return; let active = true; setPlacedReference(""); setDetail(readLakeeshopCache<any>(`product:${productCode}`)?.value); authFetch(`/lakeeshop/catalog/items/${encodeURIComponent(productCode)}`).then(async response => { const payload = await response.json(); if (!response.ok) throw new Error(payload.message); if (active) { const product = findProduct(payload); setDetail(product); writeLakeeshopCache(`product:${productCode}`, product); } }).catch(error => active && setNotice(error instanceof Error ? error.message : "Unable to load product details.")); return () => { active = false; }; }, [page, setting?.id, productCode]);

  const submitOrder = async (event: React.FormEvent) => {
    event.preventDefault(); if (!productCode || orderAction.current || placedReference) return;
    orderAction.current = true; setBusy("order"); setNotice("");
    try {
      const response = await authFetch("/lakeeshop/orders", { method: "POST", body: JSON.stringify({ productCode, quantity, customer: order }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Unable to place the order.");
      setPlacedReference(data.clientOrderId); setNotice(`Order placed successfully. Reference: ${data.clientOrderId}`);
      if (data.order) { const old = readLakeeshopCache<any[]>("orders")?.value || []; writeLakeeshopCache("orders", [data.order, ...old.filter(item => item.id !== data.order.id)]); }
    } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to place the order. Please try again."); }
    finally { orderAction.current = false; setBusy(""); }
  };
  const cancelOrder = async (id: string) => {
    if (orderAction.current || !await popup.confirm("Cancel this order? Cancellation is subject to Lakeeshop approval and cannot be undone.")) return;
    orderAction.current = true; orderRevision.current += 1; setBusy(id); setNotice("");
    try {
      const response = await authFetch(`/lakeeshop/orders/${encodeURIComponent(id)}`, { method: "DELETE" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Lakeeshop could not cancel this order.");
      if (data.order) setOrderHistory(items => { const updated = items.map(item => item.id === id ? data.order : item); writeLakeeshopCache("orders", updated); return updated; });
      setNotice(data.message || "Order cancelled successfully.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to cancel the order. Please try again."); }
    finally { orderRevision.current += 1; orderAction.current = false; setBusy(""); }
  };
  const selectedProduct = findProduct(detail);
  if (page === "settings" && !isSuperAdmin) return <div className="space-y-6"><Nav page={page}/><div className="rounded-2xl border bg-white p-6"><h1 className="text-2xl font-bold">API Settings</h1><p className="mt-3 text-gray-600">Please contact 3Pandas Media to edit APIs.</p></div></div>;
  if (!setting) return <div className="rounded-2xl border bg-white p-6"><h1 className="text-2xl font-bold text-[#0A2E8A]">Lakeeshop</h1><p className="mt-3 text-gray-600">{notice || "Loading Lakeeshop..."}</p></div>;
  if (page === "items") {
    const rows = rowsFrom(catalog?.data).filter((product: any) => (selectedCategory === "All categories" || isInCategory(product, selectedCategory)) && (!searchTerm || [productName(product), productCodeFrom(product), product.brand_name, product.brand].some(value => typeof value === "string" && value.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))));
    const categories = ["All categories", ...Array.from(new Set(categoryNames(categoryCatalog?.data)))];
    const pages = Array.from({ length: 3 }, (_, offset) => Math.max(0, catalogPage - 1) + offset);
    return <div className="space-y-5"><Nav page={page}/><div className="relative z-10 flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-bold text-slate-900">Products</h1><p className="mt-1 text-sm text-slate-500">Page {catalogPage + 1}  |  {rows.length} items{catalogLoading ? "  |  Updating..." : ""}</p></div><div className="flex flex-wrap items-center gap-2"><form onSubmit={event => { event.preventDefault(); setCatalogPage(0); setSearchTerm(searchInput.trim()); }} className="flex items-center rounded-xl border border-slate-300 bg-white p-1 shadow-sm"><input value={searchInput} onFocus={() => { setSelectedCategory("All categories"); setCatalogPage(0); setCategoryOpen(false); }} onChange={event => setSearchInput(event.target.value)} placeholder="Search products or SKU" className="w-48 bg-transparent px-3 py-1.5 text-sm outline-none"/><button type="submit" aria-label="Search products" className="rounded-lg bg-[#0A2E8A] p-2 text-white hover:bg-[#082570]"><Search size={16}/></button></form><div ref={categoryControlRef}><Btn onClick={() => setCategoryOpen(value => !value)}><Menu className="mr-2 inline" size={16}/>{selectedCategory}</Btn></div></div>{categoryOpen && <section ref={categoryMenuRef} style={{ maxHeight: "18rem", overflowY: "auto" }} className="absolute right-0 top-16 z-50 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-2xl"><div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-2 py-2 text-sm font-bold"><span>Categories</span><button onClick={() => setCategoryOpen(false)} aria-label="Close categories"><X size={16}/></button></div>{categoryCatalog && categories.length === 1 && <p role="status" className="px-3 py-3 text-sm text-slate-500">Lakeeshop returned no categories for the configured API. All products are still available.</p>}{categories.map(category => <button key={category} onClick={() => { setSelectedCategory(category); setCatalogPage(0); setCategoryOpen(false); }} className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${selectedCategory === category ? "bg-blue-50 font-semibold text-[#0A2E8A]" : "hover:bg-slate-50"}`}>{category}</button>)}</section>}</div>{notice && <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">{notice}</p>}{rows.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">{rows.map((row: any, index: number) => <ProductCard key={productCodeFrom(row) || index} product={row}/>)}</div> : <div className="rounded-2xl border border-dashed bg-white p-12 text-center text-slate-500">{catalogLoading ? "Loading products..." : searchTerm ? "No products match your search." : "No products in this category."}</div>}<div className="flex items-center justify-center gap-2"><Btn disabled={catalogPage === 0 || catalogLoading} onClick={() => setCatalogPage(value => Math.max(0, value - 1))}><ChevronLeft className="inline" size={16}/> Previous</Btn>{pages.map(number => <button key={number} disabled={catalogLoading} onClick={() => setCatalogPage(number)} className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-bold disabled:opacity-50 ${number === catalogPage ? "border-[#0A2E8A] bg-[#0A2E8A] text-white" : "bg-white text-slate-700 hover:border-[#0A2E8A]"}`}>{number + 1}</button>)}<Btn disabled={rows.length < 24 || catalogLoading} onClick={() => setCatalogPage(value => value + 1)}>Next <ChevronRight className="inline" size={16}/></Btn></div></div>;
  }
  if (page === "detail") return <div className="space-y-6"><Nav page={page}/><ProductDetail product={selectedProduct} productCode={String(productCode || "")} notice={notice}/></div>;
  if (page === "checkout") return <div className="space-y-6"><Nav page={page}/><Checkout productCode={String(productCode || "")} product={selectedProduct} quantity={quantity} setQuantity={setQuantity} order={order} setOrder={setOrder} onSubmit={submitOrder} busy={busy === "order"} notice={notice} placedReference={placedReference}/></div>;
  if (page === "orders") return <div className="space-y-6"><Nav page="orders"/><OrderHistory orders={orderHistory} busy={busy} onCancel={cancelOrder} notice={notice} refreshing={ordersRefreshing} loaded={ordersLoaded} updatedAt={ordersUpdatedAt}/></div>;
  return <div className="space-y-6"><Nav page="settings"/><SettingsPanel setting={setting} setSetting={setSetting} status={status} logs={logs}/></div>;
}
