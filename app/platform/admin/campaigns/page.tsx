"use client";

import RoleGuard from "@/components/auth/RoleGuard";

import CampaignTable from "../../partner/components/CampaignTable";

export default function AdminCampaignsPage() {
  return (
    <RoleGuard allowedRole="admin">

      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-bold">
            Campaigns
          </h1>

          <p className="text-gray-500 mt-2">
            View all active campaigns
          </p>

        </div>

        <CampaignTable
          allowDelete={false}
        />

      </div>

    </RoleGuard>
  );
}