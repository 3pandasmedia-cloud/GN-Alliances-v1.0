import DashboardCard from "../../DashboardCard";

import {
  IndianRupee,
  Wallet,
  CheckCircle,
  Clock3,
} from "lucide-react";

export default function PartnerPayoutsPage() {
  const payouts = [
    {
      month: "June 2026",
      amount: "₹2,40,000",
      status: "Paid",
      date: "05 Jun 2026",
    },
    {
      month: "May 2026",
      amount: "₹1,95,000",
      status: "Paid",
      date: "05 May 2026",
    },
    {
      month: "April 2026",
      amount: "₹1,72,000",
      status: "Processing",
      date: "05 Apr 2026",
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Payouts
        </h1>

        <p className="text-gray-500 mt-2">
          Track settlements and earnings
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <DashboardCard
          title="Total Earnings"
          value="₹18.2L"
          icon={IndianRupee}
          iconBg="#DCFCE7"
          iconColor="#16A34A"
        />

        <DashboardCard
          title="Paid Out"
          value="₹15.8L"
          icon={CheckCircle}
          iconBg="#DBEAFE"
          iconColor="#2563EB"
        />

        <DashboardCard
          title="Pending"
          value="₹2.4L"
          icon={Clock3}
          iconBg="#FEF3C7"
          iconColor="#D97706"
        />

        <DashboardCard
          title="Transactions"
          value="42"
          icon={Wallet}
          iconBg="#F3E8FF"
          iconColor="#9333EA"
        />

      </div>

      {/* Recent Payouts */}

      <div
        className="
          bg-white
          rounded-3xl
          p-6
          border
          border-gray-100
          shadow-sm
        "
      >

        <h3 className="text-xl font-bold mb-6">
          Recent Payouts
        </h3>

        <div className="space-y-4">

          {payouts.map((payout) => (
            <div
              key={payout.month}
              className="
                border
                rounded-2xl
                p-4
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
              "
            >

              <div>

                <h4 className="font-semibold">
                  {payout.month}
                </h4>

                <p className="text-gray-500">
                  Settlement Date: {payout.date}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <div className="font-bold text-lg">
                  {payout.amount}
                </div>

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    ${
                      payout.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {payout.status}
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}