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

  const loadCampaigns = async () => {
    try {
      const response = await authFetch(
        `/campaigns/merchant/${merchantId}`
      );

      const data = await response.json();

      setCampaigns(
        Array.isArray(data) ? data : []
      );

    } catch (error) {
      console.error(error);
    }
  };

  const deleteCampaign = async (
    id: string
  ) => {
    try {
      await authFetch(
        `/campaigns/${id}`,
        {
          method: "DELETE",
        }
      );

      loadCampaigns();

    } catch (error) {
      console.error(error);
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
          Campaigns assigned to your merchant.
        </p>

      </div>

      {campaigns.length === 0 ? (

        <p className="text-gray-500">
          No campaigns found.
        </p>

      ) : (

        <div className="space-y-4">

          {campaigns.map((campaign) => (

            <div
              key={campaign.id}
              className="
                border
                rounded-2xl
                p-4
              "
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="font-bold text-lg">
                    {campaign.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {campaign.description}
                  </p>

                  <p className="text-sm text-gray-500 mt-3">
                    {new Date(
                      campaign.startDate
                    ).toLocaleDateString()}
                    {" - "}
                    {new Date(
                      campaign.endDate
                    ).toLocaleDateString()}
                  </p>

                  <span
                    className="
                      inline-block
                      mt-3
                      px-3
                      py-1
                      rounded-full
                      bg-green-100
                      text-green-700
                      text-xs
                    "
                  >
                    {campaign.status}
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <button
                    className="
                      px-4
                      py-2
                      rounded-xl
                      bg-blue-100
                      text-blue-700
                    "
                  >
                    View
                  </button>

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

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}