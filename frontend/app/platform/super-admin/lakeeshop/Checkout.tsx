"use client";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MapPin, PackageCheck, ShoppingCart, UserRound } from "lucide-react";
import styles from "./Checkout.module.css";

type Props = {
  productCode: string; product?: Record<string, any>; quantity: number;
  setQuantity: (value: number) => void; order: Record<string, string>;
  setOrder: (value: Record<string, string>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  busy: boolean; notice: string; placedReference: string;
};
const currency = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
const fields = [
  ["customer_name", "Full name", "text", "Enter recipient's name", "name"],
  ["customer_email", "Email address", "email", "name@example.com", "email"],
  ["customer_mobile", "Mobile number", "tel", "10-digit mobile number", "tel-national"],
  ["pincode", "PIN code", "text", "6-digit PIN code", "postal-code"],
  ["address_line1", "Address line 1", "text", "House, building and street", "address-line1"],
  ["address_line2", "Address line 2 (optional)", "text", "Area or landmark", "address-line2"],
  ["city", "City", "text", "Enter city", "address-level2"],
  ["state", "State", "text", "Enter state", "address-level1"],
];
export default function Checkout({ productCode, product, quantity, setQuantity, order, setOrder, onSubmit, busy, notice, placedReference }: Props) {
  const image = product?.images?.image1 || product?.images?.image || product?.image || product?.image_url || product?.thumbnail;
  const name = product?.product_name || product?.name || productCode;
  const rawPrice = product?.product_price ?? product?.sale_price ?? product?.price ?? product?.basic_price;
  const price = rawPrice == null || rawPrice === "" ? NaN : Number(rawPrice);
  const hasPrice = Number.isFinite(price);
  return <div className={styles.checkout}>
    <Link className={styles.back} href={`/platform/super-admin/lakeeshop/items/${encodeURIComponent(productCode)}`}><ArrowLeft size={16}/> Back to product</Link>
    <header className={styles.header}><span className={styles.eyebrow}>LAKEESHOP / CHECKOUT</span><h1>Complete your order</h1><p>Add the recipient's details and review your order before placing it.</p></header>
    {notice && <div role="status" aria-live="polite" className={placedReference ? styles.success : styles.notice}>{placedReference && <CheckCircle2 size={20}/>}<span>{notice}</span>{placedReference && <Link href="/platform/super-admin/lakeeshop/orders">View orders</Link>}</div>}
    <form onSubmit={onSubmit} className={styles.layout}>
      <section className={styles.card}>
        <div className={styles.sectionTitle}><span className={styles.icon}><MapPin size={22}/></span><div><h2>Delivery details</h2><p>Where should we send this order?</p></div></div>
        <fieldset disabled={busy || !!placedReference} className={styles.fields}>
          {fields.map(([key, label, type, placeholder, autocomplete]) => <label key={key} htmlFor={`checkout-${key}`} className={styles.field}><span>{label}</span><input id={`checkout-${key}`} name={key} required={key !== "address_line2"} type={type} value={order[key] || ""} autoComplete={autocomplete} placeholder={placeholder} inputMode={key === "pincode" || key === "customer_mobile" ? "numeric" : undefined} maxLength={key === "pincode" ? 6 : key === "customer_mobile" ? 10 : undefined} pattern={key === "pincode" ? "[0-9]{6}" : key === "customer_mobile" ? "[0-9]{10}" : undefined} title={key === "pincode" ? "Enter a 6-digit PIN code" : key === "customer_mobile" ? "Enter a 10-digit mobile number" : undefined} onChange={event => setOrder({ ...order, [key]: event.target.value })}/></label>)}
        </fieldset>
        <div className={styles.deliveryNote}><UserRound size={17}/><span>Use the recipient's contact details for delivery updates.</span></div>
      </section>
      <aside className={`${styles.card} ${styles.summary}`}>
        <div className={styles.summaryTitle}><ShoppingCart size={20}/><h2>Order summary</h2></div>
        <div className={styles.productImage}>{image ? <img src={image} alt={String(name)}/> : <PackageCheck size={54}/>}</div>
        <p className={styles.brand}>{product?.brand_name || product?.brand || "Lakeeshop"}</p><h3>{product ? name : "Loading product details..."}</h3><p className={styles.sku}>SKU: {productCode}</p>
        <div className={styles.quantityRow}><label htmlFor="checkout-quantity">Quantity</label><input id="checkout-quantity" type="number" min={1} step={1} required value={quantity} disabled={busy || !!placedReference} onChange={event => setQuantity(Math.max(1, Math.floor(Number(event.target.value) || 1)))}/></div>
        <dl className={styles.totals}><div><dt>Unit price</dt><dd>{hasPrice ? currency(price) : "Unavailable"}</dd></div><div className={styles.total}><dt>Estimated total</dt><dd>{hasPrice ? currency(price * quantity) : "Unavailable"}</dd></div></dl>
        <p className={styles.priceNote}>Based on the current catalog price. Final fulfilment is confirmed by Lakeeshop.</p>
        <button type="submit" className={styles.submit} disabled={busy || !product || !!placedReference}>{placedReference ? <CheckCircle2 size={18}/> : <ShoppingCart size={18}/>} {placedReference ? "Order placed" : busy ? "Placing order..." : "Place order"}</button>
        <p className={styles.helper}>Review the product, quantity and delivery address before placing your order.</p>
      </aside>
    </form>
  </div>;
}
