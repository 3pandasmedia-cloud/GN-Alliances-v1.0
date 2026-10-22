"use client";

import { useWebsiteContent } from "@/components/WebsiteContent";
import { whatsappLink } from "@/lib/whatsapp";
import { useState } from "react";

import Container from "@/components/common/Container/Container";
import Section from "@/components/common/Section/Section";
import RequestDemoModal from "@/components/modals/RequestDemoModal";

export default function CTA() {
  const { cta, whatsapp } = useWebsiteContent();
  const chatHref = whatsappLink(whatsapp.number, whatsapp.message);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Section>
        <Container>
          <div className="mt-0 lg:-mt-12">
            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                p-8
                lg:p-12
                bg-gradient-to-r
                from-[#08266F]
                via-[#0B2E83]
                to-[#061F5A]
              "
            >
              {/* Left Wave Pattern */}
              <div className="absolute bottom-0 left-0 opacity-20">
                <svg
                  width="320"
                  height="140"
                  viewBox="0 0 320 140"
                  fill="none"
                >
                  <path
                    d="M0 140C40 90 90 60 180 40C250 25 290 15 320 0"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M0 140C60 110 120 80 210 60C270 45 300 35 320 25"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M0 140C80 125 150 105 240 90C280 82 305 75 320 70"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Right Dot Pattern */}
              <div className="absolute top-8 right-8 opacity-20">
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white"
                    />
                  ))}
                </div>
              </div>

              <div
                className="
                  relative
                  z-10
                  flex
                  flex-col
                  lg:flex-row
                  items-center
                  justify-between
                  gap-8
                "
              >
                {/* Content */}
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {cta.title}
                  </h2>

                  <p className="text-blue-100 text-lg max-w-xl">
                    {cta.description}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
                  {cta.demoLabel && <button
                    onClick={() => setIsModalOpen(true)}
                    className="
                      bg-[#F2A900]
                      hover:bg-[#d99900]
                      text-white
                      font-semibold
                      px-8
                      py-4
                      rounded-xl
                      transition-all
                      duration-300
                    "
                  >
                    {cta.demoLabel} →
                  </button>}

                  {cta.chatLabel && <a
                    href={chatHref || "/contact"}
                    target={chatHref ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="
                      border
                      border-white/60
                      hover:border-white
                      hover:bg-white/10
                      text-white
                      font-semibold
                      px-8
                      py-4
                      rounded-xl
                      transition-all
                      duration-300
                    "
                  >
                    {cta.chatLabel} →
                  </a>}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <RequestDemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
