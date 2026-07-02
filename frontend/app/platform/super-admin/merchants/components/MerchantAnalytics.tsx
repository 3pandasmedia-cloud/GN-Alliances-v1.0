"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";

type Props = {
  merchantId: string;
};

type AnalyticsStats = {
  campaigns: number;
  offers: number;
  views: number;
  redemptions: number;
};

export default function MerchantAnalytics({
  merchantId,
}: Props) {
  const [stats, setStats] =
    useState<AnalyticsStats>({
      campaigns: 0,
      offers: 0,
      views: 0,
      redemptions: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const loadAnalytics =
    async () => {
      try {
        const response =
          await authFetch(
            `/analytics/merchant/${merchantId}`
          );

        const data =
          await response.json();

        setStats(data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (merchantId) {
      loadAnalytics();
    }
  }, [merchantId]);

  if (loading) {
    return (
      <div className="bg-white border rounded-3xl p-6">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-5
        "
      >

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">
            Campaigns
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.campaigns}
          </h2>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">
            Offers
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.offers}
          </h2>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">
            Views
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.views}
          </h2>
        </div>

        <div className="bg-white border rounded-3xl p-6">
          <p className="text-gray-500">
            Redemptions
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.redemptions}
          </h2>
        </div>

      </div>

      <div className="bg-white border rounded-3xl p-6">

        <h2 className="text-xl font-bold mb-4">
          Performance Summary
        </h2>

        <div className="space-y-3">

          <div className="flex justify-between">
            <span>Total Campaigns</span>
            <span>{stats.campaigns}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Offers</span>
            <span>{stats.offers}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Views</span>
            <span>{stats.views}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Redemptions</span>
            <span>{stats.redemptions}</span>
          </div>

        </div>

      </div>

    </div>
  );
}