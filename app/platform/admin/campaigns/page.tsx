"use client";

import { useState } from "react";

import CampaignStatsCard from "../../partner/components/CampaignStatsCard";
import CampaignTable from "../../partner/components/CampaignTable";
import CreateCampaignModal from "../../partner/components/CreateCampaignModal";

export default function CampaignsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6 md:space-y-8">

      {/* Header */}

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

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <CampaignStatsCard
          title="Total Campaigns"
          value="84"
        />

        <CampaignStatsCard
          title="Active"
          value="36"
        />

        <CampaignStatsCard
          title="Scheduled"
          value="18"
        />

        <CampaignStatsCard
          title="Completed"
          value="30"
        />

      </div>

      {/* Table */}

      <CampaignTable />

      <CreateCampaignModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

    </div>
  );
}