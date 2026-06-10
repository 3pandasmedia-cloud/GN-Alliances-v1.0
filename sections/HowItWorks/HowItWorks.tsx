import Container from "@/components/common/Container/Container";
import Section from "@/components/common/Section/Section";

import ProcessCard from "./ProcessCard";
import { processSteps } from "./processData";

import { ChevronRight } from "lucide-react";

export default function HowItWorks() {
  return (
    <Section>
      <Container>

        {/* White Card */}

        <div
          className="
            bg-white
            rounded-[32px]
            border
            border-gray-200
            shadow-sm
            px-10
            py-16
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
              HOW GN WORKS
            </p>

            <h2
              className="
                text-[36px]
                lg:text-[56px]
                font-bold
                text-[#0B2E83]
                leading-tight
                mt-4
              "
            >
              One Partner. Complete Loyalty Ecosystem.
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

          <div
            className="
    lg:hidden
    grid
    grid-cols-3
    gap-6
    mt-8
  "
          >

            {processSteps.map((step) => (
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

      </Container>
    </Section>
  );
}