"use client";

import Container from "@/components/common/Container/Container";
import Section from "@/components/common/Section/Section";
import HeroVisual from "@/sections/Hero/HeroVisual";

export default function ContactHero() {
  return (
    <div className="relative overflow-hidden">
      <Section>
        {/* Same Background as Home Hero */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/rewards-bg.png')",
          }}
        />

        <div className="absolute inset-0 bg-white/60 z-[1]" />

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white z-[2]" />

        <div className="relative z-10">
          <Container>

            <div className="pt-[100px] lg:pt-[160px]" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

              {/* Mobile Visual */}
              <div className="block lg:hidden mb-8">
                <HeroVisual />
              </div>

              {/* Content */}
              <div className="text-center lg:text-left">

                <p className="text-[#F2A900] font-semibold uppercase tracking-[4px]">
                  CONTACT GN ALLIANCES
                </p>

                <h1 className="mt-6 leading-[1]">
                  <span className="block text-[48px] lg:text-[82px] font-bold text-[#0B2E83]">
                    Let's Build
                  </span>

                  <span className="block text-[42px] lg:text-[72px] font-bold text-black">
                    Loyalty Together
                  </span>
                </h1>

                <div className="w-20 h-[3px] bg-[#F2A900] rounded-full mx-auto lg:mx-0 mt-8" />

                <p className="mt-8 text-lg text-slate-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Connect with our team to discuss merchant-funded offers,
                  loyalty programs, customer engagement initiatives and
                  partnership opportunities.
                </p>

                <div className="mt-8 space-y-3 text-slate-700">
                  <p>📧 info@gnalliances.com</p>
                  <p>📞 +91 XXXXX XXXXX</p>
                  <p>📍 Bengaluru, India</p>
                </div>

              </div>

              {/* Desktop Visual */}
              <div className="hidden lg:block">
                <HeroVisual />
              </div>

            </div>

          </Container>
        </div>

      </Section>
    </div>
  );
}