import Container from "@/components/common/Container/Container";
import Section from "@/components/common/Section/Section";

import IndustryCard from "./IndustryCard";
import { industriesData } from "./industriesData";

export default function Industries() {
  return (
    <Section>
      <Container>

        <div className="text-center mb-12">

          <p className="text-[#F2A900] font-semibold">
            WHO WE WORK WITH
          </p>

        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

          {industriesData.map((item) => (
            <IndustryCard
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}

        </div>

      </Container>
    </Section>
  );
}