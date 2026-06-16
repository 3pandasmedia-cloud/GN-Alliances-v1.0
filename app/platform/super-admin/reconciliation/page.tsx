import ReconciliationStatsCard from "../../partner/components/ReconciliationStatsCard";
import ReconciliationTable from "../../partner/components/ReconciliationTable";

export default function ReconciliationPage() {
  return (
    <div className="space-y-6 md:space-y-8">

      <div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Reconciliation
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor settlements and payouts
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        <ReconciliationStatsCard
          title="Total Transactions"
          value="18,245"
        />

        <ReconciliationStatsCard
          title="Matched"
          value="16,932"
        />

        <ReconciliationStatsCard
          title="Pending"
          value="987"
        />

        <ReconciliationStatsCard
          title="Failed"
          value="326"
        />

      </div>

      <ReconciliationTable />

    </div>
  );
}