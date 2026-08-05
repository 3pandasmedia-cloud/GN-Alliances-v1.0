"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";


import OfferCard from "./OfferCard";
import { Offer } from "./offers";

export default function TopOffers() {
    const [activeIndex, setActiveIndex] = useState(0);

    const [offers, setOffers] = useState<Offer[]>([]);

    const touchStartX = useRef(0);

    useEffect(() => {
        loadOffers();
    }, []);

    const loadOffers = async () => {
        try {
            const res = await fetch("/api/landing-offers/public");

            const data = await res.json();

            const formatted: Offer[] = data.map((item: any) => ({
                id: item.id,
                title: item.title,
                subtitle: item.description || "",
                merchant: item.merchantName,
                image: `http://localhost:5000${item.banner}`,
                destinationUrl: item.destinationUrl,
                cta: "Unlock Offer",
            }));

            setOffers(formatted);

        } catch (err) {
            console.error(err);
        }
    };

    const prev = () => {
        setActiveIndex((prev) => (prev - 1 + offers.length) % offers.length);
    };

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % offers.length);
    };

    useEffect(() => {
        if (offers.length <= 1) return;

        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % offers.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [offers.length]);

    const safeIndex =
        activeIndex >= offers.length ? 0 : activeIndex;

    const prevOffer =
        offers.length > 0
            ? offers[(activeIndex - 1 + offers.length) % offers.length]
            : null;

    const currentOffer =
        offers.length > 0
            ? offers[safeIndex]
            : null;

    const nextOffer =
        offers.length > 0
            ? offers[(activeIndex + 1) % offers.length]
            : null;

    return (
        <section className="relative bg-white py-16 overflow-hidden">

            <div className="mx-auto max-w-[1800px] px-4">

                <div className="mb-12 text-center">

                    <span className="inline-flex rounded-full border border-[#F2A900]/30 bg-[#F2A900]/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.35em] text-[#F2A900]">
                        FEATURED DEALS
                    </span>

                    <h2 className="mt-5 text-5xl lg:text-6xl font-bold text-[#0A2E8A]">
                        Top Offers of the Day
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                        Unlock exclusive savings from our premium merchant partners.
                    </p>

                </div>

                <div className="relative hidden h-[540px] lg:flex items-center justify-center overflow-visible">

                    {/* Premium Background */}
                    <div
                        className="absolute inset-0 pointer-events-none animate-pulse"
                        style={{
                            animationDuration: "6s",
                            background: `
      radial-gradient(circle,
      rgba(10,46,138,.16) 50%,
      rgba(10,46,138,.08) 10%,
      transparent 65%)
    `,
                            filter: "blur(60px)",
                            transform: "scale(1.6)",
                        }}
                    />

                    {/* Left Arrow */}

                    <button
                        onClick={prev}
                        className="absolute left-10 z-50 flex h-14 w-14 items-center justify-center rounded-full border bg-white shadow-xl transition hover:bg-[#0A2E8A] hover:text-white"
                    >
                        <ChevronLeft size={26} />
                    </button>

                    {/* Right Arrow */}

                    <button
                        onClick={next}
                        className="absolute right-10 z-50 flex h-14 w-14 items-center justify-center rounded-full border bg-white shadow-xl transition hover:bg-[#0A2E8A] hover:text-white"
                    >
                        <ChevronRight size={26} />
                    </button>

                    {/* Left Card */}

                    <div
                        onClick={prev}
                        className="absolute left-[-120px] z-10 cursor-pointer transition-all duration-500"
                    >
                        <div
                            className="w-[700px] opacity-55"
                            style={{
                                transform:
                                    "perspective(2200px) rotateY(48deg) scale(.74) translateX(80px)",
                                transformOrigin: "right center",
                                filter: "blur(.4px)",
                            }}
                        >
                            {prevOffer && <OfferCard offer={prevOffer} />}
                        </div>
                    </div>

                    {/* Center */}

                    <div className="relative z-30 w-[980px] transition-all duration-500">
                        {currentOffer && <OfferCard offer={currentOffer} />}
                    </div>

                    {/* Right Card */}

                    <div
                        onClick={next}
                        className="absolute right-[-120px] z-10 cursor-pointer transition-all duration-500"
                    >
                        <div
                            className="w-[700px] opacity-55"
                            style={{
                                transform:
                                    "perspective(2200px) rotateY(-48deg) scale(.74) translateX(-80px)",
                                transformOrigin: "left center",
                                filter: "blur(.4px)",
                            }}
                        >
                            {nextOffer && <OfferCard offer={nextOffer} />}
                        </div>
                    </div>

                </div>

                {/* Mobile 3D Carousel */}

                <div
                    className="lg:hidden relative overflow-hidden"

                    onTouchStart={(e) => {
                        touchStartX.current = e.touches[0].clientX;
                    }}

                    onTouchEnd={(e) => {
                        const diff =
                            touchStartX.current - e.changedTouches[0].clientX;

                        if (diff > 60) next();
                        if (diff < -60) prev();
                    }}
                >

                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(-${activeIndex * 100}%)`,
                        }}
                    >
                        {offers.map((offer, index) => (
                            <div
                                key={offer.id}
                                className="relative min-w-full flex justify-center px-6"
                            >
                                {/* Left Preview */}
                                <div
                                    className="absolute left-[-38%] top-1/2 -translate-y-1/2
          w-[68%] opacity-40 pointer-events-none"
                                    style={{
                                        transform:
                                            "perspective(1800px) rotateY(48deg) scale(.78)",
                                        transformOrigin: "right center",
                                    }}
                                >
                                    <OfferCard
                                        offer={
                                            offers[
                                            (index - 1 + offers.length) %
                                            offers.length
                                            ]
                                        }
                                    />
                                </div>

                                {/* Center */}
                                <div className="relative z-20 w-full max-w-sm">
                                    <OfferCard offer={offer} />
                                </div>

                                {/* Right Preview */}
                                <div
                                    className="absolute right-[-38%] top-1/2 -translate-y-1/2
          w-[68%] opacity-40 pointer-events-none"
                                    style={{
                                        transform:
                                            "perspective(1800px) rotateY(-48deg) scale(.78)",
                                        transformOrigin: "left center",
                                    }}
                                >
                                    <OfferCard
                                        offer={
                                            offers[
                                            (index + 1) %
                                            offers.length
                                            ]
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* DOTS */}

                <div className="mt-8 flex justify-center gap-3">

                    {offers.map((_, index) => (

                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`transition-all duration-300 ${activeIndex === index
                                ? "h-3 w-10 rounded-full bg-[#F2A900]"
                                : "h-3 w-3 rounded-full bg-gray-300 hover:bg-gray-400"
                                }`}
                        />

                    ))}

                </div>

            </div>

        </section>
    );
}