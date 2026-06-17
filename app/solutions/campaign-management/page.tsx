import SolutionTemplate from "@/components/solutions/SolutionTemplate";

export default function CampaignManagementPage() {
  return (
    <SolutionTemplate
      title="Campaign Management"
      image="/images/solutions/campaign-management.png"

      overviewTitle="Launch Campaigns With Confidence"
      overviewText="Plan, execute and optimize marketing campaigns from one centralized platform. GN Alliances enables brands to create targeted campaigns, monitor engagement and measure ROI through real-time reporting and automation."

      description="Manage loyalty campaigns, promotions and customer engagement initiatives seamlessly."

      features={[
        {
          title: "Campaign Builder",
          text: "Create campaigns quickly.",
        },
        {
          title: "Audience Targeting",
          text: "Reach the right customers.",
        },
        {
          title: "Automation",
          text: "Reduce manual processes.",
        },
        {
          title: "Performance Insights",
          text: "Track campaign success.",
        },
      ]}

      benefits={[
        "Increase campaign effectiveness",
        "Improve customer engagement",
        "Automate marketing operations",
        "Measure campaign ROI accurately",
      ]}
    />
  );
}