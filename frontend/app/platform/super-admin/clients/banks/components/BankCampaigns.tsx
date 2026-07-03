"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";
import CreateCampaignModal from "../modals/CreateCampaignModal";

type Props = {
  bankId: string;
  bankName: string;
};

type Campaign = {
  id: string;
  name: string;
  description?: string;
  merchantName: string;
  budget?: number;
  priority: number;
  status: string;
  startDate: string;
  endDate: string;
};

export default function BankCampaigns({
  bankId,
  bankName,
}: Props) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const loadCampaigns = async () => {
    try {
      setLoading(true);

      const response = await authFetch(
        `/campaigns/bank/${bankId}`
      );

      const data = await response.json();

      setCampaigns(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bankId) {
      loadCampaigns();
    }
  }, [bankId]);

  const deleteCampaign = async (
    id: string
  ) => {
    if (
      !confirm(
        "Delete this campaign?"
      )
    )
      return;

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

  const active =
    campaigns.filter(
      (c) => c.status === "ACTIVE"
    ).length;

  const draft =
    campaigns.filter(
      (c) => c.status === "DRAFT"
    ).length;

  const inactive =
    campaigns.filter(
      (c) => c.status === "INACTIVE"
    ).length;

  return (
    <>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold">
              Campaigns
            </h2>

            <p className="text-gray-500 mt-2">
              Manage all campaigns for {bankName}
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
            "
          >
            + Create Campaign
          </button>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white border rounded-3xl p-6">
            <p className="text-gray-500">
              Total
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {campaigns.length}
            </h2>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <p className="text-gray-500">
              Active
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">
              {active}
            </h2>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <p className="text-gray-500">
              Draft
            </p>

            <h2 className="text-4xl font-bold text-yellow-600 mt-3">
              {draft}
            </h2>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <p className="text-gray-500">
              Inactive
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-3">
              {inactive}
            </h2>
          </div>

        </div>

        {/* Loading */}

        {loading && (
          <div className="bg-white rounded-3xl border p-10 text-center">
            Loading campaigns...
          </div>
        )}

        {!loading &&
          campaigns.length === 0 && (
            <div className="bg-white rounded-3xl border p-10 text-center text-gray-500">
              No campaigns found.
            </div>
          )}

        {!loading &&
          campaigns.length > 0 && (
            <div className="space-y-5">

              {campaigns.map(
                (campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-white border rounded-3xl p-6"
                  >

                    <div className="flex justify-between">

                      <div>

                        <h3 className="text-2xl font-bold">
                          {campaign.name}
                        </h3>

                        <p className="text-gray-500 mt-2">
                          {campaign.description}
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-6 text-sm">

                          <div>
                            <strong>
                              Merchant
                            </strong>

                            <br />

                            {campaign.merchantName}
                          </div>

                          <div>
                            <strong>
                              Budget
                            </strong>

                            <br />

                            ₹
                            {campaign.budget ??
                              0}
                          </div>

                          <div>
                            <strong>
                              Priority
                            </strong>

                            <br />

                            {campaign.priority}
                          </div>

                          <div>
                            <strong>
                              Status
                            </strong>

                            <br />

                            {campaign.status}
                          </div>

                        </div>

                        <p className="mt-5 text-gray-500">
                          {new Date(
                            campaign.startDate
                          ).toLocaleDateString()}
                          {" - "}
                          {new Date(
                            campaign.endDate
                          ).toLocaleDateString()}
                        </p>

                      </div>

                      <div className="flex flex-col gap-3">

                        <button
                          className="px-5 py-2 rounded-xl bg-blue-100 text-blue-700"
                        >
                          Edit
                        </button>

                        <button
                          className="px-5 py-2 rounded-xl bg-yellow-100 text-yellow-700"
                        >
                          Pause
                        </button>

                        <button
                          onClick={() =>
                            deleteCampaign(						
                              campaign.id
                            )
                          }
                          className="px-5 py-2 rounded-xl bg-red-100 text-red-700"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

      </div>

     <CreateCampaignModal
  isOpen={open}
  onClose={() => setOpen(false)}
  onCreated={loadCampaigns}
  bankId={bankId}
/>
    </>
  );
}
