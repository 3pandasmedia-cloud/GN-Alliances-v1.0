"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";

type Props = {
  merchantId: string;
};

type Campaign = {
  id: string;
  name: string;
  description?: string;
  status: string;
  startDate: string;
  endDate: string;
};

export default function MerchantCampaigns({
  merchantId,
}: Props) {
  const [campaigns, setCampaigns] =
    useState<Campaign[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadCampaigns = async () => {
    try {
      setLoading(true);

      const response = await authFetch(
        `/campaigns/merchant/${merchantId}`
      );

      const data = await response.json();

      setCampaigns(
        Array.isArray(data) ? data : []
      );

    } catch (error) {
      console.error(error);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (merchantId) {
      loadCampaigns();
    }
  }, [merchantId]);

  return (
    <div
      className="
        bg-white
        border
        rounded-3xl
        p-6
      "
    >
      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Campaigns
        </h2>

        <p className="text-gray-500 mt-2">
          Campaigns assigned to this merchant.
        </p>

      </div>

      {loading ? (

        <div className="py-10 text-center text-gray-500">
          Loading campaigns...
        </div>

      ) : campaigns.length === 0 ? (

        <div className="py-10 text-center text-gray-500">
          No campaigns found.
        </div>

      ) : (

        <div className="space-y-4">

          {campaigns.map((campaign) => (

            <div
              key={campaign.id}
              className="
                border
                rounded-2xl
                p-5
              "
            >

              <div className="flex justify-between items-start gap-6">

                <div className="flex-1">

                  <h3 className="text-lg font-bold">
                    {campaign.name}
                  </h3>

                  {campaign.description && (
                    <p className="text-gray-500 mt-2">
                      {campaign.description}
                    </p>
                  )}

                  <p className="text-sm text-gray-500 mt-4">
                    {new Date(
                      campaign.startDate
                    ).toLocaleDateString()}
                    {"  —  "}
                    {new Date(
                      campaign.endDate
                    ).toLocaleDateString()}
                  </p>

                </div>

                <div className="text-right">

                  <span
                    className={`
                      inline-flex
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${
                        campaign.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : campaign.status === "DRAFT"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {campaign.status}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}