import Container from "@/components/common/Container/Container";
import Section from "@/components/common/Section/Section";

import BenefitCard from "./BenefitCard";
import { benefitsData } from "./benefitsData";

export default function Benefits() {
  return (
    <Section id="solutions">
      {/* Adjust these values as needed */}
      <div className="lg:-mt-[90px] -mt-[40px]">
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

            <div className="lg:hidden">

              {/* First Row */}
              <div className="grid grid-cols-3 gap-4">
                {benefitsData.slice(0, 3).map((benefit) => (
                  <BenefitCard
                    key={benefit.title}
                    title={benefit.title}
                    description={benefit.description}
                    icon={benefit.icon}
                  />
                ))}
              </div>

              {/* Second Row Centered */}
              <div className="grid grid-cols-2 gap-4 mt-6 max-w-[280px] mx-auto">
                {benefitsData.slice(3).map((benefit) => (
                  <BenefitCard
                    key={benefit.title}
                    title={benefit.title}
                    description={benefit.description}
                    icon={benefit.icon}
                  />
                ))}
              </div>

            </div>

            {/* Desktop */}
            <div className="hidden lg:flex gap-6">
              {benefitsData.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className={`
        flex justify-center items-center relative
        ${index !== benefitsData.length - 1
                      ? "after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[70px] after:w-px after:bg-white/20"
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