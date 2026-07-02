import Container from "@/components/common/Container/Container";
import Section from "@/components/common/Section/Section";

import MetricCard from "./MetricCard";
import { metricsData } from "./metricsData";

export default function Metrics() {
  return (
    <Section>
      <Container>
        <div className="-mt-20"></div>
        <div className="bg-[#F7F8FA] border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-4">
            {metricsData.map((item, index) => (
              <div
                key={item.label}
                className="relative"
              >
                <MetricCard {...item} />

                {index !== metricsData.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-24 w-px bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}