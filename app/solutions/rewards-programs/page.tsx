import SolutionTemplate from "@/components/solutions/SolutionTemplate";

export default function RewardsProgramsPage() {
  return (
    <SolutionTemplate
      title="Rewards Programs"
      image="/images/solutions/rewards-programs.png"

      overviewTitle="Create Meaningful Customer Rewards"
      overviewText="GN Alliances helps banks, fintechs and enterprises design, launch and manage scalable rewards programs that increase customer retention, engagement and lifetime value. From points-based systems to instant rewards, our platform handles the entire lifecycle."

      description="Build personalized reward experiences that drive customer loyalty and repeat engagement."

      features={[
        {
          title: "Points Engine",
          text: "Flexible earning and redemption rules.",
        },
        {
          title: "Reward Catalog",
          text: "Curated offers and redemption options.",
        },
        {
          title: "Customer Segmentation",
          text: "Target rewards to specific audiences.",
        },
        {
          title: "Real-Time Tracking",
          text: "Monitor reward performance instantly.",
        },
      ]}

      benefits={[
        "Increase customer retention",
        "Improve customer lifetime value",
        "Boost engagement rates",
        "Deliver personalized experiences",
      ]}
    />
  );
}