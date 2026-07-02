"use client";

import Link from "next/link";
import Container from "@/components/common/Container/Container";
import Section from "@/components/common/Section/Section";
import HeroVisual from "@/sections/Hero/HeroVisual";

export default function AboutHero() {
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
                            <div className="block lg:hidden">
                                <HeroVisual />
                            </div>

                            {/* Content */}
                            <div className="text-center lg:text-left">

                                <p className="text-[#F2A900] font-semibold tracking-[4px] uppercase">
                                    About GN Alliances
                                </p>

                                <h1
                                    className="
    mt-4
    text-[52px]
    md:text-[64px]
    lg:text-7xl
    font-bold
    leading-[1.05]
  "
                                >
                                    <span className="text-[#0A2E8A]">
                                        Building
                                    </span>

                                    <br />

                                    Stronger Loyalty
                                    Ecosystems
                                </h1>

                                <div
                                    className="
    w-24
    h-1
    bg-[#F2A900]
    rounded-full
    mt-6
    mx-auto
    lg:mx-0
  "
                                />

                                <p
                                    className="
    mt-6
    text-lg
    text-slate-700
    leading-relaxed
    max-w-xl
    mx-auto
    lg:mx-0
  "
                                >
                                    GN Alliances was founded by Gulnaz Kaur and
                                    Niroshini Sainath to simplify loyalty operations,
                                    merchant partnerships and customer engagement.
                                </p>

                                <Link
                                    href="/contact"
                                    className="
                    inline-flex
                    mt-8
                    px-8
                    py-4
                    rounded-xl
                    bg-[#0A2E8A]
                    text-white
                    font-semibold
                  "
                                >
                                    Contact Us
                                </Link>

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