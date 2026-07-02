"use client";

import { useEffect, useState } from "react";

import PartnerStatsCard from "../../partner/components/PartnerStatsCard";
import PartnerTable from "../../partner/components/PartnerTable";
import AddPartnerModal from "../../partner/components/AddPartnerModal";

export default function PartnersPage() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  const [open, setOpen] = useState(false);

  const loadStats = () => {
    fetch("https://api.gnalliances.com/api/partners/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Partners
          </h1>

          <p className="text-gray-500 mt-2">
            Manage banks, merchants and affiliate partners
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
          + Add Partner
        </button>
      </div>

      {/* Stats */}

      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-4
          md:gap-6
        "
      >
        <PartnerStatsCard
          title="Total Partners"
          value={String(stats.total)}
        />

        <PartnerStatsCard
          title="Active Partners"
          value={String(stats.active)}
        />

        <PartnerStatsCard
          title="Pending Approval"
          value="0"
        />

        <PartnerStatsCard
          title="Inactive"
          value={String(stats.inactive)}
        />
      </div>

      {/* Table */}

      <PartnerTable />

      {/* Modal */}

      <AddPartnerModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onCreated={() => {
          loadStats();
          window.location.reload();
        }}
      />
    </div>
  );
}