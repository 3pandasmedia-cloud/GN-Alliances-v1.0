import AnalyticsStatsCard from "../../partner//components/AnalyticsStatsCard";
import RevenueChart from "../../partner//components/RevenueChart";
import CategoryAnalytics from "../../partner//components/CategoryAnalytics";
import TopPartnersTable from "../../partner/components/TopPartnersTable";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Platform performance insights
        </p>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        <AnalyticsStatsCard
          title="Revenue"
          value="₹2.4Cr"
        />

        <AnalyticsStatsCard
          title="Campaigns"
          value="84"
        />

        <AnalyticsStatsCard
          title="Offers"
          value="248"
        />

        <AnalyticsStatsCard
          title="Redemptions"
          value="12.8K"
        />

      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">

        <RevenueChart />

        <CategoryAnalytics />

      </div>

      <TopPartnersTable />

    </div>
  );
}