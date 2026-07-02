"use client";

import { useEffect, useState } from "react";

import OfferStatsCard from "../../partner/components/OfferStatsCard";
import OfferTable from "../../partner/components/OfferTable";
import CreateOfferModal from "../../partner/components/CreateOfferModal";

export default function OffersPage() {
  const [open, setOpen] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
  });

  const loadStats = () => {
    fetch(
      "https://api.gnalliances.com/api/offers/stats"
    )
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Offers Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all platform offers
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
            font-medium
          "
        >
          + Create Offer
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <OfferStatsCard
          title="Total Offers"
          value={String(stats.total)}
        />

        <OfferStatsCard
          title="Active Offers"
          value={String(stats.active)}
        />

        <OfferStatsCard
          title="Expired"
          value="0"
        />

        <OfferStatsCard
          title="Draft"
          value="0"
        />
      </div>

      <OfferTable />

      <CreateOfferModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setTimeout(loadStats, 500);
        }}
      />
    </div>
  );
}