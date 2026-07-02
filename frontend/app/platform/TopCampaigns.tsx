"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";

type Campaign = {
  id: string;
  name: string;
  status: string;
};

export default function TopCampaigns() {
  const [campaigns, setCampaigns] =
    useState<Campaign[]>([]);

  useEffect(() => {
    authFetch("/campaigns")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCampaigns(data.slice(0, 5));
        } else {
          console.error(
            "Campaign API Error:",
            data
          );

          setCampaigns([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setCampaigns([]);
      });
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

      <h3 className="text-xl font-bold mb-6">
        Latest Campaigns
      </h3>

      <div className="space-y-5">

        {campaigns.length === 0 ? (
          <p className="text-gray-500">
            No campaigns found
          </p>
        ) : (
          campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="border-b pb-4 last:border-0"
            >
              <h4 className="font-semibold">
                {campaign.name}
              </h4>

              <div className="flex justify-between mt-2 text-sm">

                <span className="text-gray-500">
                  Campaign
                </span>

                <span
                  className={
                    campaign.status === "ACTIVE"
                      ? "text-green-600 font-medium"
                      : "text-gray-500 font-medium"
                  }
                >
                  {campaign.status}
                </span>

              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}