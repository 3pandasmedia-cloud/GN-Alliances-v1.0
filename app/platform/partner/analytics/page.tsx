import PerformanceChart from "../../PerformanceChart";

export default function PartnerAnalyticsPage() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Campaign performance insights
        </p>

      </div>

      <PerformanceChart />

    </div>
  );
}