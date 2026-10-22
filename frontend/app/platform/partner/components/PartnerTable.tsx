"use client";
import { useState } from "react";
import { API_URL } from "@/lib/config";
import Link from "next/link";

export type Merchant = {
  id: string; name: string; slug: string; email: string; logo: string | null;
  status: string; apiConnected: boolean; connectionCheckedAt: string | null; integration: boolean;
};
function ConnectionBadge({ merchant }: { merchant: Merchant }) {
  return <span title={merchant.connectionCheckedAt ? `Connection checked: ${new Date(merchant.connectionCheckedAt).toLocaleString()}` : "No verified API connection is available for this merchant."} className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${merchant.apiConnected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{merchant.apiConnected ? "API Connected" : "API Not Connected"}</span>;
}
function MerchantIdentity({ merchant }: { merchant: Merchant }) {
  const [failedLogo, setFailedLogo] = useState<string>();
  const logo = merchant.logo?.startsWith("/uploads/") ? `${API_URL.replace(/\/api\/?$/, "")}${merchant.logo}` : merchant.logo;
  return <div className="flex items-center gap-4">
    {logo && failedLogo !== logo ? <img src={logo} onError={() => setFailedLogo(logo)} alt={`${merchant.name} logo`} className="h-14 w-14 shrink-0 rounded-2xl border bg-white object-contain p-1"/> : <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0A2E8A] text-lg font-bold text-[#F2A900]">{merchant.name.charAt(0).toUpperCase()}</div>}
    <div><h3 className="text-lg font-semibold text-[#0B2E83]">{merchant.name}</h3><p className="text-sm text-gray-500">{merchant.integration ? "Catalog and inventory API integration" : merchant.email}</p>{!merchant.integration && <p className="mt-1 text-xs capitalize text-gray-400">Merchant account: {merchant.status.toLowerCase().replaceAll("_", " ")}</p>}</div>
  </div>;
}
export default function PartnerTable({ merchants, loading }: { merchants: Merchant[]; loading: boolean }) {
  const href = (merchant: Merchant) => merchant.integration ? "/platform/super-admin/lakeeshop/items" : `/platform/super-admin/merchants/${merchant.slug}`;
  return <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
    <div className="hidden overflow-x-auto md:block"><table className="w-full"><thead><tr className="border-b bg-gray-50"><th className="px-6 py-4 text-left">Merchant</th><th className="px-6 py-4 text-left">Status</th></tr></thead>
      <tbody>{merchants.map(merchant => <tr key={merchant.id} className="border-b transition hover:bg-blue-50"><td className="px-6 py-5"><Link href={href(merchant)}><MerchantIdentity merchant={merchant}/></Link></td><td className="px-6 py-5"><ConnectionBadge merchant={merchant}/></td></tr>)}
        {!merchants.length && <tr><td colSpan={2} className="p-8 text-center text-gray-500">{loading ? "Loading merchants and checking API connections..." : "No merchants found."}</td></tr>}
      </tbody></table></div>
    <div className="space-y-4 p-4 md:hidden">{merchants.map(merchant => <Link key={merchant.id} href={href(merchant)} className="block space-y-4 rounded-2xl border p-4 transition hover:border-[#0B2E83]"><MerchantIdentity merchant={merchant}/><ConnectionBadge merchant={merchant}/></Link>)}{!merchants.length && <p className="p-4 text-center text-gray-500">{loading ? "Loading merchants and checking API connections..." : "No merchants found."}</p>}</div>
  </div>;
}
