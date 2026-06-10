import DashboardCard from "../DashboardCard";

import {
  Gift,
  Wallet,
  Ticket,
  IndianRupee,
} from "lucide-react";

export default function ClientDashboard() {
  return (
    <div className="space-y-6 md:space-y-8">

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Client Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Rewards and savings overview
        </p>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <DashboardCard
          title="Reward Points"
          value="12,450"
          icon={Gift}
          iconBg="#F3E8FF"
          iconColor="#9333EA"
        />

        <DashboardCard
          title="Available Offers"
          value="78"
          icon={Ticket}
          iconBg="#DBEAFE"
          iconColor="#2563EB"
        />

        <DashboardCard
          title="Savings Earned"
          value="₹18,250"
          icon={IndianRupee}
          iconBg="#DCFCE7"
          iconColor="#16A34A"
        />

        <DashboardCard
          title="Wallet Balance"
          value="₹3,420"
          icon={Wallet}
          iconBg="#FEF3C7"
          iconColor="#D97706"
        />

      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

        <h3 className="text-xl font-bold mb-6">
          Popular Offers
        </h3>

        <div className="space-y-4">

          <div className="border-b pb-3">
            10% Dining Cashback
          </div>

          <div className="border-b pb-3">
            Fuel Rewards Offer
          </div>

          <div className="border-b pb-3">
            Travel Discount
          </div>

          <div>
            Movie Ticket Offer
          </div>

        </div>

      </div>

    </div>
  );
}