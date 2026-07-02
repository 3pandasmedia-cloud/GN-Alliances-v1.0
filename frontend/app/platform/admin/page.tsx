"use client";

import { useEffect, useState } from "react";

import DashboardCard from "../DashboardCard";
import PerformanceChart from "../PerformanceChart";
import TopCampaigns from "../TopCampaigns";
import RecentCampaigns from "../RecentCampaigns";
import CategoryChart from "../CategoryChart";
import PendingApprovals from "../PendingApprovals";

import RoleGuard from "@/components/auth/RoleGuard";

import {
  Users,
  Megaphone,
  Gift,
  Clock3,
  IndianRupee,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    partners: 0,
    campaigns: 0,
    offers: 0,
    users: 0,
  });

  useEffect(() => {
    fetch(
      "https://api.gnalliances.com/api/dashboard/stats"
    )
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <RoleGuard allowedRole="admin">

      <div className="space-y-6 lg:space-y-8">

        <div>

          <h2
            className="
              text-2xl
              md:text-3xl
              lg:text-4xl
              font-bold
            "
          >
            Welcome back, Admin 👋
          </h2>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Here's what's happening with GN today.
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-5
            gap-4
            lg:gap-6
          "
        >

          <DashboardCard
            title="Total Partners"
            value={String(stats.partners)}
            icon={Users}
            iconBg="#DBEAFE"
            iconColor="#2563EB"
          />

          <DashboardCard
            title="Active Campaigns"
            value={String(stats.campaigns)}
            icon={Megaphone}
            iconBg="#DCFCE7"
            iconColor="#16A34A"
          />

          <DashboardCard
            title="Offers Live"
            value={String(stats.offers)}
            icon={Gift}
            iconBg="#F3E8FF"
            iconColor="#9333EA"
          />

          <DashboardCard
            title="Platform Users"
            value={String(stats.users)}
            icon={Clock3}
            iconBg="#FEF3C7"
            iconColor="#D97706"
          />

          <DashboardCard
            title="Revenue Generated"
            value="₹0"
            icon={IndianRupee}
            iconBg="#CFFAFE"
            iconColor="#0891B2"
          />

        </div>

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-[2fr_1fr]
            gap-6
          "
        >

          <PerformanceChart />

          <TopCampaigns />

        </div>

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            2xl:grid-cols-[2fr_1fr_1fr]
            gap-6
          "
        >

          <RecentCampaigns />

          <CategoryChart />

          <PendingApprovals />

        </div>

      </div>

    </RoleGuard>
  );
}