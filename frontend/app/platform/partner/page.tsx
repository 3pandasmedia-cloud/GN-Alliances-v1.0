import Link from "next/link";
import DashboardCard from "../DashboardCard";
import {
  ArrowUpRight,
  CheckCircle2,
  CircleDollarSign,
  Gift,
  Megaphone,
  Plus,
  Ticket,
} from "lucide-react";

const recentRedemptions = [
  { customer: "Aarav Sharma", offer: "15% off on dining", amount: "₹450", time: "2 min ago" },
  { customer: "Priya Menon", offer: "Weekend cashback", amount: "₹320", time: "18 min ago" },
  { customer: "Rohan Kapoor", offer: "Flat ₹200 off", amount: "₹200", time: "42 min ago" },
  { customer: "Ananya Iyer", offer: "15% off on dining", amount: "₹610", time: "1 hr ago" },
];

const campaignProgress = [
  { name: "Monsoon Dining Rewards", used: 78, status: "Live" },
  { name: "Weekend Cashback", used: 54, status: "Live" },
  { name: "New Customer Welcome", used: 31, status: "Scheduled" },
];

export default function PartnerDashboard() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-[#071d57] via-[#0a2c79] to-[#1255c4] px-6 py-7 text-white shadow-lg md:px-8 md:py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-100">Merchant portal</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Good morning, Merchant</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 md:text-base">Here’s a live view of your offers, customer activity and upcoming settlements.</p>
          </div>
          <Link href="/platform/partner/offers" className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0b378e] transition hover:bg-blue-50">
            <Plus size={18} /> Create offer
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:gap-6">
        <DashboardCard title="Active Offers" value="12" icon={Gift} iconBg="#F3E8FF" iconColor="#7E22CE" />
        <DashboardCard title="Live Campaigns" value="4" icon={Megaphone} iconBg="#DCFCE7" iconColor="#15803D" />
        <DashboardCard title="Redemptions This Month" value="1,284" icon={Ticket} iconBg="#FEF3C7" iconColor="#B45309" />
        <DashboardCard title="Pending Settlement" value="₹48,650" icon={CircleDollarSign} iconBg="#DBEAFE" iconColor="#1D4ED8" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div><h2 className="text-lg font-bold text-slate-900">Campaign performance</h2><p className="mt-1 text-sm text-slate-500">Redemption progress across your active campaigns</p></div>
            <Link href="/platform/partner/campaigns" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700">View all <ArrowUpRight size={16} /></Link>
          </div>
          <div className="mt-6 space-y-5">
            {campaignProgress.map((campaign) => (
              <div key={campaign.name}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm"><span className="font-semibold text-slate-700">{campaign.name}</span><span className={campaign.status === "Live" ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700" : "rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700"}>{campaign.status}</span></div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-[#1356c6] to-[#5c97ff]" style={{ width: `${campaign.used}%` }} /></div>
                <p className="mt-2 text-xs text-slate-500">{campaign.used}% of monthly redemption target reached</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
          <div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-slate-900">Payout status</h2><p className="mt-1 text-sm text-slate-500">Next settlement summary</p></div><CircleDollarSign className="text-blue-700" size={28} /></div>
          <div className="mt-7 rounded-2xl bg-blue-50 p-5"><p className="text-sm font-medium text-blue-800">Estimated payout</p><p className="mt-1 text-3xl font-bold text-[#08266c]">₹48,650</p><p className="mt-2 text-sm text-blue-700">Scheduled for 31 July 2026</p></div>
          <div className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><span className="text-slate-500">Validated redemptions</span><span className="font-semibold text-slate-800">1,184</span></div><div className="flex justify-between"><span className="text-slate-500">Under review</span><span className="font-semibold text-amber-600">12</span></div><div className="flex justify-between"><span className="text-slate-500">Settlement status</span><span className="inline-flex items-center gap-1 font-semibold text-emerald-600"><CheckCircle2 size={15} /> On track</span></div></div>
          <Link href="/platform/partner/payouts" className="mt-6 inline-flex text-sm font-semibold text-blue-700">View payout details <ArrowUpRight className="ml-1" size={16} /></Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
        <div className="flex items-start justify-between gap-4"><div><h2 className="text-lg font-bold text-slate-900">Recent redemptions</h2><p className="mt-1 text-sm text-slate-500">Latest customer activity across your offers</p></div><Link href="/platform/partner/redemptions" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700">View all <ArrowUpRight size={16} /></Link></div>
        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400"><tr><th className="pb-3 font-semibold">Customer</th><th className="pb-3 font-semibold">Offer redeemed</th><th className="pb-3 font-semibold">Value</th><th className="pb-3 font-semibold">Status</th><th className="pb-3 text-right font-semibold">Time</th></tr></thead><tbody>{recentRedemptions.map((redemption) => (<tr key={redemption.customer} className="border-b border-slate-50 last:border-0"><td className="py-4 font-semibold text-slate-700">{redemption.customer}</td><td className="py-4 text-slate-600">{redemption.offer}</td><td className="py-4 font-semibold text-slate-800">{redemption.amount}</td><td className="py-4"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Approved</span></td><td className="py-4 text-right text-slate-500">{redemption.time}</td></tr>))}</tbody></table></div>
      </section>
    </div>
  );
}
