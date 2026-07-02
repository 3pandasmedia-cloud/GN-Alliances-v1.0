"use client";

import { useEffect, useState } from "react";

import CampaignStatsCard from "../../partner/components/CampaignStatsCard";
import CampaignTable from "../../partner/components/CampaignTable";
import CreateCampaignModal from "../../partner/components/CreateCampaignModal";

export default function CampaignsPage() {
  const [open, setOpen] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  const loadStats = () => {
    fetch(
      "https://api.gnalliances.com/api/campaigns/stats"
    )
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="space-y-6 md:space-y-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Campaign Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage campaigns across all partners
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="
            h-12
            px-6
            rounded-xl
            bg-[#0B2E83]
            text-white
            font-medium
          "
        >
          + Create Campaign
        </button>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <CampaignStatsCard
          title="Total Campaigns"
          value={String(stats.total)}
        />

        <CampaignStatsCard
          title="Active"
          value={String(stats.active)}
        />

        <CampaignStatsCard
          title="Inactive"
          value={String(stats.inactive)}
        />

        <CampaignStatsCard
          title="Scheduled"
          value="0"
        />

      </div>

      <CampaignTable />

      <CreateCampaignModal
        isOpen={open}
        onClose={() => {
          setOpen(false);

          setTimeout(() => {
            loadStats();
          }, 500);
        }}
      />

    </div>
  );
}