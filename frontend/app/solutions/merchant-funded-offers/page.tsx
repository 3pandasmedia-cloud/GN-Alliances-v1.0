import SolutionTemplate from "@/components/solutions/SolutionTemplate";

export default function MerchantFundedOffersPage() {
return (
<SolutionTemplate
title="Merchant Funded Offers"
image="/images/solutions/merchant-funded-offers.png"

  overviewTitle="Drive Customer Spending Through Partner Offers"

  overviewText="Merchant Funded Offers enable banks, card issuers and fintechs to connect customers with exclusive discounts, cashback rewards and promotional campaigns from a nationwide merchant network. GN Alliances manages merchant onboarding, campaign creation, redemption tracking and settlement reconciliation through one unified platform."

  description="Launch merchant-funded offer campaigns across a nationwide partner network with real-time tracking, redemption visibility and automated settlements."

  features={[
    {
      title: "Merchant Network",
      text: "Access verified merchants across multiple industries.",
    },
    {
      title: "Offer Management",
      text: "Create and manage targeted offers instantly.",
    },
    {
      title: "Redemption Tracking",
      text: "Monitor customer usage in real-time.",
    },
    {
      title: "Settlement Automation",
      text: "Automate merchant reimbursements.",
    },
  ]}

  benefits={[
    "Increase cardholder engagement",
    "Expand merchant participation",
    "Boost redemption rates",
    "Automate operational workflows",
  ]}
/>
);
}
