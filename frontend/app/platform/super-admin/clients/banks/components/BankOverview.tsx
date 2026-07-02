"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";

type Props = {
  bankId: string;
};

type Overview = {
  activeCampaigns: number;
  connectedMerchants: number;
  activeOffers: number;
  transactionsToday: number;

  recentCampaigns: {
    id: string;
    name: string;
    status: string;
  }[];

  merchantActivity: {
    id: string;
    merchant: string;
    action: string;
    time: string;
  }[];

  apiStatus: string;
  lastSync: string;
  webhook: string;
  merchantApis: number;
};

export default function BankOverview({
  bankId,
}: Props) {
  const [overview, setOverview] =
    useState<Overview>({
      activeCampaigns: 0,
      connectedMerchants: 0,
      activeOffers: 0,
      transactionsToday: 0,

      recentCampaigns: [],
      merchantActivity: [],

      apiStatus: "Connected",
      lastSync: "-",
      webhook: "Configured",
      merchantApis: 0,
    });

  const loadOverview = async () => {
    try {
      const response = await authFetch(
        `/partners/bank/${bankId}/overview`
      );

      if (!response.ok) return;

      const data = await response.json();

      setOverview(data);

    } catch (error) {
      console.log(
        "Overview API not available yet."
      );
    }
  };

  useEffect(() => {
    if (bankId) {
      loadOverview();
    }
  }, [bankId]);

  return (
    <div className="space-y-8">

      {/* KPI */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl border p-6">
          <p className="text-gray-500">
            Active Campaigns
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {overview.activeCampaigns}
          </h2>
        </div>

        <div className="bg-white rounded-3xl border p-6">
          <p className="text-gray-500">
            Connected Merchants
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {overview.connectedMerchants}
          </h2>
        </div>

        <div className="bg-white rounded-3xl border p-6">
          <p className="text-gray-500">
            Active Offers
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {overview.activeOffers}
          </h2>
        </div>

        <div className="bg-white rounded-3xl border p-6">
          <p className="text-gray-500">
            Transactions Today
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {overview.transactionsToday}
          </h2>
        </div>

      </div>

      {/* Recent Campaigns */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl border p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Campaigns
          </h2>

          {overview.recentCampaigns.length === 0 ? (

            <div className="text-gray-500">
              No Campaigns Yet
            </div>

          ) : (

            <div className="space-y-4">

              {overview.recentCampaigns.map(
                (campaign) => (

                  <div
                    key={campaign.id}
                    className="flex justify-between border-b pb-3"
                  >

                    <div>

                      <p className="font-semibold">
                        {campaign.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {campaign.status}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

        {/* Merchant Activity */}

        <div className="bg-white rounded-3xl border p-6">

          <h2 className="text-2xl font-bold mb-6">
            Merchant Activity
          </h2>

          {overview.merchantActivity.length === 0 ? (

            <div className="text-gray-500">
              No Activity
            </div>

          ) : (

            <div className="space-y-4">

              {overview.merchantActivity.map(
                (activity) => (

                  <div
                    key={activity.id}
                    className="flex justify-between border-b pb-3"
                  >

                    <div>

                      <p className="font-semibold">
                        {activity.merchant}
                      </p>

                      <p className="text-sm text-gray-500">
                        {activity.action}
                      </p>

                    </div>

                    <span className="text-gray-400 text-sm">
                      {activity.time}
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

      {/* API */}

      <div className="bg-white rounded-3xl border p-6">

        <h2 className="text-2xl font-bold mb-6">
          API Status
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div>

            <p className="text-gray-500">
              API Status
            </p>

            <p className="font-semibold text-green-600 mt-2">
              {overview.apiStatus}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Last Sync
            </p>

            <p className="font-semibold mt-2">
              {overview.lastSync}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Webhook
            </p>

            <p className="font-semibold mt-2">
              {overview.webhook}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Merchant APIs
            </p>

            <p className="font-semibold mt-2">
              {overview.merchantApis} Connected
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}