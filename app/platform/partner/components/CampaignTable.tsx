"use client";

import { useEffect, useState } from "react";

type Campaign = {
  id: string;
  name: string;
  partnerName: string;
  status: string;
  startDate: string;
  endDate: string;
};

type Props = {
  allowDelete?: boolean;
};

export default function CampaignTable({
  allowDelete = false,
}: Props) {
  const [campaigns, setCampaigns] =
    useState<Campaign[]>([]);

  const loadCampaigns = () => {
    fetch(
      "http://localhost:5000/api/campaigns"
    )
      .then((res) => res.json())
      .then(setCampaigns)
      .catch(console.error);
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const deleteCampaign = async (
    id: string
  ) => {
    if (
      !confirm(
        "Delete this campaign?"
      )
    )
      return;

    await fetch(
      `http://localhost:5000/api/campaigns/${id}`,
      {
        method: "DELETE",
      }
    );

    loadCampaigns();
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4">
                Campaign
              </th>

              <th className="text-left p-4">
                Partner
              </th>

              <th className="text-left p-4">
                Start
              </th>

              <th className="text-left p-4">
                End
              </th>

              <th className="text-left p-4">
                Status
              </th>

              {allowDelete && (
                <th className="text-left p-4">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>

            {campaigns.map(
              (campaign) => (
                <tr
                  key={campaign.id}
                  className="border-b"
                >
                  <td className="p-4">
                    {campaign.name}
                  </td>

                  <td className="p-4">
                    {campaign.partnerName}
                  </td>

                  <td className="p-4">
                    {new Date(
                      campaign.startDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {new Date(
                      campaign.endDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                      {
                        campaign.status
                      }
                    </span>
                  </td>

                  {allowDelete && (
                    <td className="p-4">

                      <button
                        onClick={() =>
                          deleteCampaign(campaign.id)
                        }
                        className="
        px-4
        py-2
        rounded-xl
        bg-red-100
        text-red-700
      "
                      >
                        Delete
                      </button>

                    </td>
                  )}
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}