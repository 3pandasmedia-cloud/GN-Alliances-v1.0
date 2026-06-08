import Container from "@/components/common/Container/Container";
import Section from "@/components/common/Section/Section";

import BenefitCard from "./BenefitCard";
import { benefitsData } from "./benefitsData";

export default function Benefits() {
  return (
    <Section>
      {/* Adjust these values as needed */}
      <div className="lg:-mt-[90px] -mt-[20px]">
        <Container>
          <div
            className="
              bg-gradient-to-r from-[#06246F] to-[#0B2E83]
              rounded-[28px]
              px-1 py-2
              md:px-8 md:py-8
              lg:px-8 lg:py-8
              shadow-xl
            "
          >
            <div className="text-center mb-6">
              <p className="text-[#F2A900] text-xs lg:text-sm font-bold tracking-[3px] uppercase">
                WHAT YOU GET
              </p>
            </div>

            <div className="grid grid-cols-3 lg:flex lg:grid-cols-5 gap-4 lg:gap-6">
              {benefitsData.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className={`
    flex justify-center items-center
    relative
    ${index !== benefitsData.length - 1
                      ? "lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:h-[70px] lg:after:w-px lg:after:bg-white/20"
                      : ""
                    }
  `}
                >
                  <BenefitCard
                    title={benefit.title}
                    description={benefit.description}
                    icon={benefit.icon}
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}