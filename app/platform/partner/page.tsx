import DashboardCard from "../DashboardCard";
import PerformanceChart from "../PerformanceChart";

import {
  Megaphone,
  Gift,
  IndianRupee,
  Ticket,
} from "lucide-react";

export default function PartnerDashboard() {
  return (
    <div className="space-y-6 md:space-y-8">

      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Partner Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Track your campaigns and performance
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <DashboardCard
          title="Campaigns"
          value="18"
          icon={Megaphone}
          iconBg="#DCFCE7"
          iconColor="#16A34A"
        />

        <DashboardCard
          title="Active Offers"
          value="54"
          icon={Gift}
          iconBg="#F3E8FF"
          iconColor="#9333EA"
        />

        <DashboardCard
          title="Revenue"
          value="₹18.2L"
          icon={IndianRupee}
          iconBg="#CFFAFE"
          iconColor="#0891B2"
        />

        <DashboardCard
          title="Redemptions"
          value="4,821"
          icon={Ticket}
          iconBg="#FEE2E2"
          iconColor="#DC2626"
        />

      </div>

      <PerformanceChart />

    </div>
  );
}