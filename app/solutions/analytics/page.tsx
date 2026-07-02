import SolutionTemplate from "@/components/solutions/SolutionTemplate";

export default function AnalyticsPage() {
  return (
    <SolutionTemplate
      title="Analytics & Reporting"
      image="/images/solutions/analytics-reporting.png"

      overviewTitle="Turn Data Into Actionable Insights"
      overviewText="Monitor loyalty performance, customer behavior, merchant activity and campaign effectiveness through interactive dashboards and real-time analytics. Make data-driven decisions with confidence."

      description="Gain complete visibility into program performance through advanced reporting."

      features={[
        {
          title: "Executive Dashboards",
          text: "View KPIs instantly.",
        },
        {
          title: "Campaign Analytics",
          text: "Measure campaign outcomes.",
        },
        {
          title: "Customer Insights",
          text: "Understand customer behavior.",
        },
        {
          title: "Custom Reports",
          text: "Generate tailored analytics.",
        },
      ]}

      benefits={[
        "Improve strategic decision making",
        "Measure program performance",
        "Increase customer understanding",
        "Optimize business outcomes",
      ]}
    />
  );
}