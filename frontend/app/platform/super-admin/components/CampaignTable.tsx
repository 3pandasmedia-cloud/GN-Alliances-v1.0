"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";

type Campaign = {
  id: string;
  name: string;
  bankName: string;
  merchantName: string;
  campaignType: string;
  status: string;
  startDate: string;
  endDate: string;
};

type Props = {
  refreshKey?: number;
};

export default function CampaignTable({
  refreshKey = 0,
}: Props) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCampaigns = async () => {
    try {
      setLoading(true);

      const response = await authFetch("/campaigns");

      const data = await response.json();

      if (Array.isArray(data)) {
        setCampaigns(data);
      } else {
        setCampaigns([]);
      }
    } catch (error) {
      console.error(error);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, [refreshKey]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";

      case "DRAFT":
        return "bg-yellow-100 text-yellow-700";

      case "INACTIVE":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          Campaigns
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left p-4">
                Campaign
              </th>

              <th className="text-left p-4">
                Bank
              </th>

              <th className="text-left p-4">
                Merchant
              </th>

              <th className="text-left p-4">
                Type
              </th>

              <th className="text-left p-4">
                Duration
              </th>

              <th className="text-left p-4">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  Loading campaigns...
                </td>
              </tr>

            ) : campaigns.length === 0 ? (

              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  No campaigns found.
                </td>
              </tr>

            ) : (

              campaigns.map((campaign) => (

                <tr
                  key={campaign.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4 font-medium">
                    {campaign.name}
                  </td>

                  <td className="p-4">
                    {campaign.bankName}
                  </td>

                  <td className="p-4">
                    {campaign.merchantName}
                  </td>

                  <td className="p-4">
                    {campaign.campaignType}
                  </td>

                  <td className="p-4">
                    {new Date(
                      campaign.startDate
                    ).toLocaleDateString()}
                    {" - "}
                    {new Date(
                      campaign.endDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {campaign.status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}