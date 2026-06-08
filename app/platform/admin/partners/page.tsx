import PartnerStatsCard from "../../partner/components/PartnerStatsCard";
import PartnerTable from "../../partner/components/PartnerTable";

export default function PartnersPage() {
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
          className="
            h-12
            px-6
            rounded-xl
            bg-[#0B2E83]
            text-white
            font-medium
            hover:bg-[#08256B]
            transition
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
          value="128"
        />

        <PartnerStatsCard
          title="Active Partners"
          value="115"
        />

        <PartnerStatsCard
          title="Pending Approval"
          value="9"
        />

        <PartnerStatsCard
          title="Inactive"
          value="4"
        />
      </div>

      {/* Table */}

      <PartnerTable />

    </div>
  );
}