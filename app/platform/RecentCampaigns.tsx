"use client";

import { useEffect, useState } from "react";

type Campaign = {
  id: string;
  name: string;
  partnerName: string;
  status: string;
  createdAt: string;
};

export default function RecentCampaigns() {
  const [campaigns, setCampaigns] =
    useState<Campaign[]>([]);

  useEffect(() => {
    fetch(
      "http://localhost:5000/api/campaigns"
    )
      .then((res) => res.json())
      .then(setCampaigns);
  }, []);

  const getStatusStyle = (
    status: string
  ) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";

      case "INACTIVE":
        return "bg-red-100 text-red-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-4
        md:p-6
        border
        border-gray-100
        shadow-sm
      "
    >

      <h3 className="text-lg md:text-xl font-bold mb-6">
        Recent Campaigns
      </h3>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">
                Campaign
              </th>

              <th className="py-3 text-left">
                Partner
              </th>

              <th className="py-3 text-left">
                Status
              </th>

              <th className="py-3 text-left">
                Created
              </th>

            </tr>

          </thead>

          <tbody>

            {campaigns.map(
              (campaign) => (
                <tr
                  key={campaign.id}
                  className="border-b"
                >
                  <td className="py-4">
                    {campaign.name}
                  </td>

                  <td>
                    {
                      campaign.partnerName
                    }
                  </td>

                  <td>

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        ${getStatusStyle(
                          campaign.status
                        )}
                      `}
                    >
                      {
                        campaign.status
                      }
                    </span>

                  </td>

                  <td>
                    {new Date(
                      campaign.createdAt
                    ).toLocaleDateString()}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}