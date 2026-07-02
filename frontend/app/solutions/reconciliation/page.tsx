import SolutionTemplate from "@/components/solutions/SolutionTemplate";

export default function ReconciliationPage() {
  return (
    <SolutionTemplate
      title="Reconciliation & Settlements"
      image="/images/solutions/reconciliation.png"

      overviewTitle="Automate Financial Reconciliation"
      overviewText="Our reconciliation engine validates transactions, calculates merchant liabilities, automates settlements and provides complete transparency into financial workflows. Reduce errors and improve operational efficiency."

      description="Automate transaction validation, merchant payouts and financial settlements."

      features={[
        {
          title: "Transaction Validation",
          text: "Verify redemptions automatically.",
        },
        {
          title: "Settlement Engine",
          text: "Automate merchant payouts.",
        },
        {
          title: "Financial Reporting",
          text: "Generate accurate reports.",
        },
        {
          title: "Audit Trails",
          text: "Maintain compliance records.",
        },
      ]}

      benefits={[
        "Reduce settlement errors",
        "Improve financial accuracy",
        "Automate reconciliation workflows",
        "Enhance operational transparency",
      ]}
    />
  );
}