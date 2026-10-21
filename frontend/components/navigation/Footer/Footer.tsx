"use client";
import Container from "@/components/common/Container/Container";
import Image from "next/image";
import Link from "next/link";
import { useWebsiteContent } from "@/components/WebsiteContent";
export default function Footer() {
 const {footer,contact,sections}=useWebsiteContent();
 if(!sections.footer)return null;
 return <footer className="mt-5 border-t bg-white"><Container><div className="px-6 py-10 lg:px-8"><div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-5 lg:text-left">
 {footer.logo && <Link href="/"><Image unoptimized src={footer.logo} alt="GN Alliances" width={300} height={300} className="mx-auto h-28 w-auto object-contain lg:mx-0 lg:h-36"/></Link>}
 {footer.columns.map((column,index)=><div key={index}>{column.title&&<h3 className="mb-4 font-semibold">{column.title}</h3>}<ul className="space-y-3 text-gray-600">{column.links.filter(link=>link.label).map((link,i)=><li key={i}>{link.href?<Link className="transition hover:text-[#0a2e8a]" href={link.href}>{link.label}</Link>:link.label}</li>)}</ul></div>)}
 {(contact.email||contact.phone||contact.address)&&<div><h3 className="mb-4 font-semibold">{footer.contactTitle}</h3><ul className="space-y-3 break-words text-gray-600">{contact.email&&<li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>}{contact.phone&&<li><a href={`tel:${contact.phone.replace(/[^+0-9]/g,"")}`}>{contact.phone}</a></li>}{contact.address&&<li><a href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`} target="_blank" rel="noopener noreferrer" className="whitespace-pre-line">{contact.address}</a></li>}</ul></div>}
 </div><div className="mt-8 flex flex-col items-center justify-between gap-5 border-t pt-6 text-center text-sm text-gray-500 md:flex-row"><div className="flex flex-wrap justify-center gap-5">{footer.legalLinks.filter(link=>link.label).map((link,i)=>link.href?<Link key={i} href={link.href}>{link.label}</Link>:<span key={i}>{link.label}</span>)}</div>{footer.creditName&&<div className="flex items-center gap-2"><span>{footer.creditLabel}</span>{footer.creditLogo && <Image unoptimized src={footer.creditLogo} alt={footer.creditName} width={56} height={56} className="h-auto w-12 object-contain"/>}{footer.creditUrl?<a href={footer.creditUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700">{footer.creditName}</a>:<span>{footer.creditName}</span>}</div>}{footer.copyright&&<p>{footer.copyright}</p>}</div></div></Container></footer>;
}
