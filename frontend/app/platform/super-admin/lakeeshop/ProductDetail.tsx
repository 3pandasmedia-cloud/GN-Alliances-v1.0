"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown, ImageOff, Package, ShoppingCart } from "lucide-react";
import { productDetails } from "@/lib/lakeeshopProduct";
import styles from "./ProductDetail.module.css";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);
export default function ProductDetail({ product, productCode, notice }: { product?: Record<string, any>; productCode: string; notice: string }) {
  const detail = productDetails(product || {}, productCode);
  const [selectedImage, setSelectedImage] = useState("");
  const [failedImage, setFailedImage] = useState("");
  const imageKey = detail.images.join("|");
  useEffect(() => { setSelectedImage(""); setFailedImage(""); }, [productCode, imageKey]);
  const image = selectedImage || detail.images[0];
  const hasDescription = detail.shortDescription || detail.paragraphs.length || detail.features.length;
  return <div className={styles.page}>
    <Link href="/platform/super-admin/lakeeshop/items" className={styles.back}><ArrowLeft size={16}/>Back to products</Link>
    {notice && <p role="status" className={styles.notice}>{notice}</p>}
    {!product ? <div className={styles.loading}><Package size={30}/><h1>{notice ? "Product details unavailable" : "Loading product details..."}</h1><p>{notice ? "Return to the product list and try again." : "Getting the latest information from Lakeeshop."}</p></div> : <>
      <div className={styles.overview}>
        <section className={styles.gallery} aria-label="Product images"><div className={styles.mainImage}>{image && failedImage !== image ? <img src={image} alt={detail.name} onError={() => setFailedImage(image)}/> : <div className={styles.imageMissing}><ImageOff size={42}/><span>Image unavailable</span></div>}</div>
          {detail.images.length > 1 && <div className={styles.thumbnails}>{detail.images.map((url, index) => <button type="button" key={url} aria-label={`View product image ${index + 1}`} aria-pressed={image === url} className={image === url ? styles.selectedThumbnail : styles.thumbnail} onClick={() => { setSelectedImage(url); setFailedImage(""); }}><img src={url} alt={`${detail.name} - view ${index + 1}`}/></button>)}<span className={styles.imageCount}>{detail.images.length} product images</span></div>}
        </section>
        <section className={styles.summary}>
          <div className={styles.breadcrumb}>PRODUCT DETAILS{detail.category && <><span>/</span>{detail.category}</>}</div>
          {detail.brand && <p className={styles.brand}>{detail.brand}</p>}
          <h1>{detail.name}</h1><p className={styles.sku}>SKU <span>{detail.code}</span></p>
          {detail.subcategory && <span className={styles.category}>{detail.subcategory}</span>}
          <div className={styles.pricing}><div className={styles.price}>{detail.price !== undefined ? money(detail.price) : "Price unavailable"}</div>{detail.mrp !== undefined && detail.price !== undefined && detail.mrp > detail.price && <div className={styles.mrp}>MRP <s>{money(detail.mrp)}</s><span>Save {money(detail.mrp - detail.price)}</span></div>}</div>
          {detail.shortDescription && <p className={styles.introduction}>{detail.shortDescription}</p>}
          <div className={styles.quickSpecs}>{detail.specifications.filter(item => /^(model|capacity|material|weight)$/i.test(item.label)).slice(0,4).map(item => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div>
          <Link className={styles.checkout} href={`/platform/super-admin/lakeeshop/items/${encodeURIComponent(productCode)}/checkout`}><ShoppingCart size={18}/>Proceed to checkout<ArrowRight size={17}/></Link>
          <p className={styles.checkoutNote}>Enter delivery details and review your order at checkout.</p>
          {(detail.basePrice !== undefined || detail.tax !== undefined || detail.shipping !== undefined) && <details className={styles.breakdown}><summary>Price breakdown<ChevronDown size={16}/></summary><dl>{detail.basePrice !== undefined && <div><dt>Base price</dt><dd>{money(detail.basePrice)}</dd></div>}{detail.tax !== undefined && <div><dt>Tax{detail.taxPercentage !== undefined ? ` (${detail.taxPercentage}%)` : ""}</dt><dd>{money(detail.tax)}</dd></div>}{detail.shipping !== undefined && <div><dt>Shipping</dt><dd>{money(detail.shipping)}</dd></div>}{detail.price !== undefined && <div className={styles.total}><dt>Product total</dt><dd>{money(detail.price)}</dd></div>}</dl></details>}
        </section>
      </div>
      <div className={styles.information}>
        <section className={styles.description}><div className={styles.sectionHeading}><span>01</span><h2>About this product</h2></div>{detail.shortDescription && <p>{detail.shortDescription}</p>}{detail.paragraphs.map((paragraph,index) => <p key={index}>{paragraph}</p>)}{detail.features.length > 0 && <><h3>Product features</h3><ul>{detail.features.map((feature,index) => <li key={index}>{feature}</li>)}</ul></>}{!hasDescription && <p className={styles.unavailable}>The API has not provided a description for this product.</p>}</section>
        <section className={styles.specifications}><div className={styles.sectionHeading}><span>02</span><h2>Specifications</h2></div>{detail.specifications.length > 0 ? <dl>{detail.specifications.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl> : <p className={styles.unavailable}>The API has not provided additional specifications.</p>}</section>
      </div><p className={styles.source}>Product descriptions, specifications, images and prices are supplied by Lakeeshop.</p>
    </>}
  </div>;
}
