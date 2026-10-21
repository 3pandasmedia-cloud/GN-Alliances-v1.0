"use client";
import { useWebsiteContent } from "@/components/WebsiteContent";
import Container from "@/components/common/Container/Container";
import Section from "@/components/common/Section/Section";

import ProcessCard from "./ProcessCard";


import { ChevronRight } from "lucide-react";

export default function HowItWorks() {
  const { how } = useWebsiteContent(); const processSteps = how.items.map((item, index) => ({ ...item, id: index + 1 }));
  return (
    <Section>
      <Container>

        <div
          className="
            bg-white
            rounded-[32px]
            border
            border-gray-200
            shadow-sm
            px-4
            lg:px-10
            py-12
            lg:py-16
          "
        >

          {/* Heading */}
          <div className="text-center mb-10">

            <p
              className="
                text-[#F2A900]
                font-bold
                uppercase
                tracking-wider
              "
            >
              {how.eyebrow}
            </p>

            <h2
              className="
                text-[32px]
                lg:text-[56px]
                font-bold
                text-[#0B2E83]
                leading-tight
                mt-4
              "
            >
              <span className="whitespace-pre-line">{how.title}</span>
            </h2>

          </div>

          {/* Desktop */}
          <div className="hidden lg:flex items-start justify-center">

            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-start"
              >
                <ProcessCard
                  number={step.id}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />

                {index !== processSteps.length - 1 && (
                  <div
                    className="
                      mt-24
                      mx-3
                      text-gray-300
                    "
                  >
                    <ChevronRight
                      size={44}
                      strokeWidth={1.5}
                    />
                  </div>
                )}
              </div>
            ))}

          </div>

          {/* Mobile */}
          <div className="lg:hidden mt-8">

            {/* Row 1 : 1 2 3 4 */}
            <div className="grid grid-cols-4 gap-2">
              {processSteps.slice(0, 4).map((step) => (
                <ProcessCard
                  key={step.id}
                  number={step.id}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>

            {/* Row 2 : 5 6 7 */}
            <div className="grid grid-cols-3 gap-2 mt-6">
              {processSteps.slice(4).map((step) => (
                <ProcessCard
                  key={step.id}
                  number={step.id}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>

          </div>

        </div>

      </Container>
    </Section>
  );
}