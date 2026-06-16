import RedemptionStatsCard from "../../partner//components/RedemptionStatsCard";
import RedemptionTable from "../../partner/components/RedemptionTable";

export default function RedemptionsPage() {
  return (
    <div className="space-y-6 md:space-y-8">

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Redemptions
        </h1>

        <p className="text-gray-500 mt-2">
          Track customer offer usage
        </p>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <RedemptionStatsCard
          title="Total Redemptions"
          value="12,845"
        />

        <RedemptionStatsCard
          title="Approved"
          value="11,732"
        />

        <RedemptionStatsCard
          title="Pending"
          value="864"
        />

        <RedemptionStatsCard
          title="Rejected"
          value="249"
        />

      </div>

      <RedemptionTable />

    </div>
  );
}