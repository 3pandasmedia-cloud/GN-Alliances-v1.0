"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import OfferCard from "./OfferCard";
import { offers } from "./offers";

export default function TopOffers() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % offers.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const prevOffer =
    offers[(activeIndex - 1 + offers.length) % offers.length];

  const nextOffer =
    offers[(activeIndex + 1) % offers.length];

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

        <div className="relative hidden h-[540px] lg:flex items-center justify-center">

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
              <OfferCard offer={prevOffer} />
            </div>
          </div>

          {/* Center */}

          <div className="relative z-30 w-[980px] transition-all duration-500">
            <OfferCard offer={offers[activeIndex]} />
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
              <OfferCard offer={nextOffer} />
            </div>
          </div>

        </div>

        {/* DOTS */}

        <div className="mt-8 flex justify-center gap-3">

          {offers.map((_, index) => (

            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`transition-all duration-300 ${
                activeIndex === index
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