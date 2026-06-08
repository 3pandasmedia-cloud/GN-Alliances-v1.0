import Container from "@/components/common/Container/Container";
import Section from "@/components/common/Section/Section";

import DashboardShowcase from "./DashboardShowcase";
import MerchantManagementShowcase from "./MerchantManagementShowcase";
import OfferManagementShowcase from "./OfferManagementShowcase";
import CampaignManagementShowcase from "./CampaignManagementShowcase";
import AnalyticsReportsShowcase from "./AnalyticsReportsShowcase";
import ReconciliationPayoutsShowcase from "./ReconciliationPayoutsShowcase";

export default function PlatformCapabilities() {
  return (
    <Section>
      <Container>
        <div className="-mt-20"></div>
        <div className="text-center mb-20">
          <p className="text-[#F2A900] font-semibold uppercase tracking-[3px]">
            OUR PLATFORM
          </p>

          <h2 className="text-4xl lg:text-6xl font-bold mt-4">
            Powerful Platform For Loyalty Operations
          </h2>
        </div>

        <DashboardShowcase />

        <div className="mt-24 lg:mt-28">
          <MerchantManagementShowcase />
        </div>

        <div className="mt-24 lg:mt-28">
          <OfferManagementShowcase />
        </div>

        <div className="mt-24 lg:mt-28">
          <CampaignManagementShowcase />
        </div>

        <div className="mt-24 lg:mt-28">
          <AnalyticsReportsShowcase />
        </div>

        <div className="mt-24 lg:mt-28">
          <ReconciliationPayoutsShowcase />
        </div>
      </Container>
    </Section>
  );
}