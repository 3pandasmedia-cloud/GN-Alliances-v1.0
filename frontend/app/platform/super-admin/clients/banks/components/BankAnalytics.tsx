"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";

type Props = {
  bankId: string;
};

type Analytics = {
  campaigns: number;
  merchants: number;
  clients: number;
  offers: number;
  impressions: number;
  clicks: number;
};

export default function BankAnalytics({
  bankId,
}: Props) {
  const [analytics, setAnalytics] =
    useState<Analytics>({
      campaigns: 0,
      merchants: 0,
      clients: 0,
      offers: 0,
      impressions: 0,
      clicks: 0,
    });

  const loadAnalytics = async () => {
    try {
      const response = await authFetch(
        `/banks/${bankId}/analytics`
      );

      if (!response.ok) return;

      const data = await response.json();

      setAnalytics(data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (bankId) {
      loadAnalytics();
    }
  }, [bankId]);

  return (
    <div className="space-y-8">

      {/* Cards */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">
            Campaigns
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {analytics.campaigns}
          </h2>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">
            Merchants
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {analytics.merchants}
          </h2>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">
            Clients
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {analytics.clients}
          </h2>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">
            Offers
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {analytics.offers}
          </h2>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">
            Impressions
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {analytics.impressions.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">
            Clicks
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {analytics.clicks.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Summary */}

      <div className="bg-white border rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Analytics Summary
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>Total Campaigns</span>
            <strong>{analytics.campaigns}</strong>
          </div>

          <div className="flex justify-between">
            <span>Total Merchants</span>
            <strong>{analytics.merchants}</strong>
          </div>

          <div className="flex justify-between">
            <span>Total Clients</span>
            <strong>{analytics.clients}</strong>
          </div>

          <div className="flex justify-between">
            <span>Total Offers</span>
            <strong>{analytics.offers}</strong>
          </div>

          <div className="flex justify-between">
            <span>Total Impressions</span>
            <strong>
              {analytics.impressions.toLocaleString()}
            </strong>
          </div>

          <div className="flex justify-between">
            <span>Total Clicks</span>
            <strong>
              {analytics.clicks.toLocaleString()}
            </strong>
          </div>

        </div>

      </div>

      {/* Placeholder */}

      <div
        className="
          bg-white
          border
          rounded-3xl
          p-16
          text-center
        "
      >
        <h2 className="text-2xl font-bold">
          Interactive Charts
        </h2>

        <p className="text-gray-500 mt-3">
          Campaign performance, merchant growth,
          impressions, clicks and ROI charts
          will appear here.
        </p>

        <div
          className="
            mt-8
            inline-block
            px-5
            py-2
            rounded-full
            bg-blue-100
            text-[#0B2E83]
            font-semibold
          "
        >
          Coming Soon
        </div>

      </div>

    </div>
  );
}