import SolutionTemplate from "@/components/solutions/SolutionTemplate";

export default function LoyaltyOperationsPage() {
  return (
    <SolutionTemplate
      title="Loyalty Operations"
      image="/images/solutions/loyalty-operations.png"

      overviewTitle="Simplify Loyalty Program Operations"
      overviewText="GN Alliances removes operational complexity by managing merchant onboarding, offer governance, redemption validation, settlement workflows and reporting through one unified loyalty operations platform."

      description="Streamline loyalty program administration and operational execution."

      features={[
        {
          title: "Program Governance",
          text: "Manage loyalty program rules.",
        },
        {
          title: "Merchant Onboarding",
          text: "Scale partner acquisition.",
        },
        {
          title: "Offer Administration",
          text: "Control offer lifecycles.",
        },
        {
          title: "Operations Dashboard",
          text: "Monitor activity in real-time.",
        },
      ]}

      benefits={[
        "Reduce operational workload",
        "Improve program scalability",
        "Ensure governance compliance",
        "Increase efficiency",
      ]}
    />
  );
}