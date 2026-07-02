import Container from "@/components/common/Container/Container";
import Section from "@/components/common/Section/Section";

import WhyGNCard from "./WhyGNCard";
import { whyGNData } from "./whyGNData";

export default function WhyGN() {
  return (
    <Section>
      <Container>
        <div className="-mt-15">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

            {/* Heading */}
            <div className="text-center pt-3 pb-1">
              <p className="text-[#F2A900] text-sm font-semibold tracking-wide uppercase">
                Why Choose GN Alliances
              </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3">
              {whyGNData.map((item, index) => (
                <div key={item.title} className="relative">
                  <WhyGNCard
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />

                  {index !== whyGNData.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-28 w-px bg-gray-200" />
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
}