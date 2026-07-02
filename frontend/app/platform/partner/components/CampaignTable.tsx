"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";

type Campaign = {
  id: string;
  name: string;
  description?: string;
  partnerName: string;
  status: string;
  startDate: string;
  endDate: string;
};

type Props = {
  allowDelete?: boolean;
  partnerId?: string;
};

export default function CampaignTable({
  allowDelete = false,
  partnerId,
}: Props) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCampaigns();
  }, [partnerId]);

  const loadCampaigns = async () => {
    try {
      const response = await authFetch(
        partnerId
          ? `/campaigns/merchant/${partnerId}`
          : "/campaigns"
      );

      const data = await response.json();

      setCampaigns(data);

    } catch (error) {
      console.error(error);
    }
  };

  const deleteCampaign = async (id: string) => {
    if (!confirm("Delete this campaign?")) return;

    try {
      await authFetch(`/campaigns/${id}`, {
        method: "DELETE",
      });

      loadCampaigns();

    } catch (error) {
      console.error(error);
    }
  };

  const filtered = campaigns.filter(
    (campaign) =>
      campaign.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      campaign.partnerName
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

      <div className="p-5 border-b">

        <input
          placeholder="Search Campaign..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 border rounded-xl px-4"
        />

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr className="border-b">

              <th className="text-left p-4">
                Campaign
              </th>

              {!partnerId && (
                <th className="text-left p-4">
                  Partner
                </th>
              )}

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
                <th className="text-center p-4">
                  Actions
                </th>
              )}

            </tr>

          </thead>

          <tbody>

            {filtered.length === 0 && (

              <tr>

                <td
                  colSpan={
                    allowDelete
                      ? partnerId
                        ? 5
                        : 6
                      : partnerId
                      ? 4
                      : 5
                  }
                  className="text-center p-10 text-gray-500"
                >
                  No Campaigns Found
                </td>

              </tr>

            )}

            {filtered.map((campaign) => (

              <tr
                key={campaign.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4">

                  <div className="font-semibold">
                    {campaign.name}
                  </div>

                  {campaign.description && (
                    <div className="text-sm text-gray-500">
                      {campaign.description}
                    </div>
                  )}

                </td>

                {!partnerId && (
                  <td className="p-4">
                    {campaign.partnerName}
                  </td>
                )}

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

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : campaign.status === "INACTIVE"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {campaign.status}
                  </span>

                </td>

                {allowDelete && (

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button
                        className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteCampaign(campaign.id)
                        }
                        className="px-3 py-2 rounded-lg bg-red-100 text-red-700"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                )}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}