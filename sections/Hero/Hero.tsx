"use client";

import { useState } from "react";
import RequestDemoModal from "@/components/modals/RequestDemoModal";
import Container from "@/components/common/Container/Container";
import Section from "@/components/common/Section/Section";

import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden">
        <Section>
          {/* Background Image with Bottom Fade */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/rewards-bg.png')",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
            }}
          />

          {/* Soft White Overlay */}
          <div className="absolute inset-0 bg-white/60 z-[1]" />

          {/* Extra Bottom Blend */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white z-[2]" />

          {/* Content */}
          <div className="relative z-10">
            <Container>
              <div className="pt-[160px] lg:pt-[220px]" />

              <div
                className="
                  grid
                  grid-cols-1
                  lg:grid-cols-2
                  gap-10
                  lg:gap-12
                  items-center
                "
              >
                {/* Content */}
                <div
                  className="
                    mt-0
                    ml-0
                    lg:-mt-50
                    lg:-ml-30
                  "
                >
                  <HeroContent
                    onRequestDemo={() => setIsModalOpen(true)}
                  />
                </div>

                {/* Desktop Visual */}
                <div
                  className="
                    hidden
                    lg:block
                    lg:-mt-20
                    relative
                    lg:left-[80px]
                  "
                >
                  <HeroVisual />
                </div>
              </div>
            </Container>
          </div>
        </Section>
      </div>

      {/* Modal OUTSIDE Section */}
      <RequestDemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}