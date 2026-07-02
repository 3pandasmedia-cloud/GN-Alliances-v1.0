"use client";

import { useEffect, useState } from "react";

import { authFetch } from "@/lib/api";

import CampaignStatsCard from "../components/CampaignStatsCard";
import CampaignTable from "../components/CampaignTable";

export default function CampaignsPage() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    draft: 0,
    inactive: 0,
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const loadStats = async () => {
    try {
      const response = await authFetch("/campaigns/stats");

      const data = await response.json();

      setStats({
        total: data.total || 0,
        active: data.active || 0,
        draft: data.draft || 0,
        inactive: data.inactive || 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold">
          Campaigns
        </h1>

        <p className="text-gray-500 mt-2">
          View campaigns assigned to your merchant.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-6">

        <CampaignStatsCard
          title="Total Campaigns"
          value={stats.total}
        />

        <CampaignStatsCard
          title="Active"
          value={stats.active}
          color="#16A34A"
        />

        <CampaignStatsCard
          title="Draft"
          value={stats.draft}
          color="#CA8A04"
        />

        <CampaignStatsCard
          title="Inactive"
          value={stats.inactive}
          color="#DC2626"
        />

      </div>

      {/* Campaign Table */}

      <CampaignTable
        refreshKey={refreshKey}
      />

    </div>
  );
}