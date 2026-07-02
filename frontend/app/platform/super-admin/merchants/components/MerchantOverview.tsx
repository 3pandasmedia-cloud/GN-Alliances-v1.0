"use client";

import {
  useEffect,
  useState,
} from "react";

import { authFetch } from "@/lib/api";

type Props = {
  merchantId: string;
};

export default function MerchantOverview({
  merchantId,
}: Props) {
  const [stats, setStats] =
    useState({
      campaigns: 0,
      offers: 0,
      redemptions: 0,
      revenue: 0,
    });

  useEffect(() => {
    if (merchantId) {
      loadStats();
    }
  }, [merchantId]);

  const loadStats =
    async () => {
      try {
        const response =
          await authFetch(
            `/dashboard/merchant/${merchantId}`
          );

        const data =
          await response.json();

        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div
      className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-6
      "
    >
      <div className="bg-white rounded-3xl border p-6">
        <p>Campaigns</p>

        <h2 className="text-3xl font-bold">
          {stats.campaigns}
        </h2>
      </div>

      <div className="bg-white rounded-3xl border p-6">
        <p>Offers</p>

        <h2 className="text-3xl font-bold">
          {stats.offers}
        </h2>
      </div>

      <div className="bg-white rounded-3xl border p-6">
        <p>Redemptions</p>

        <h2 className="text-3xl font-bold">
          {stats.redemptions}
        </h2>
      </div>

      <div className="bg-white rounded-3xl border p-6">
        <p>Revenue</p>

        <h2 className="text-3xl font-bold">
          ₹{stats.revenue}
        </h2>
      </div>
    </div>
  );
}