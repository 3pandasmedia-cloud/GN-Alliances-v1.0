"use client";

import { useState } from "react";

import OfferStatsCard from "../../partner/components/OfferStatsCard";
import OfferTable from "../../partner/components/OfferTable";
import CreateOfferModal from "../../partner/components/CreateOfferModal";

export default function OffersPage() {
  const [open, setOpen] = useState(false);

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
          value="248"
        />

        <OfferStatsCard
          title="Active Offers"
          value="121"
        />

        <OfferStatsCard
          title="Expired"
          value="78"
        />

        <OfferStatsCard
          title="Draft"
          value="49"
        />

      </div>

      <OfferTable />

      <CreateOfferModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

    </div>
  );
}