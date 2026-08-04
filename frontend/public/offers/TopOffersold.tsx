"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import {
    EffectCoverflow,
    Pagination,
    Autoplay,
} from "swiper/modules";

import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import OfferCard from "./OfferCard";
import { offers } from "./offers";

export default function TopOffers() {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="relative bg-white py-16 overflow-hidden">

            <div className="mx-auto max-w-[1800px] px-4 lg:px-10">

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

                <div className="relative">

                    {/* Left */}

                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute left-2 lg:left-6 top-1/2 z-30 hidden lg:flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white border border-slate-200 shadow-xl transition hover:bg-[#0A2E8A] hover:text-white"
                    >
                        <ChevronLeft />
                    </button>

                    {/* Right */}

                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute right-2 lg:right-6 top-1/2 z-30 hidden lg:flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white border border-slate-200 shadow-xl transition hover:bg-[#0A2E8A] hover:text-white"
                    >
                        <ChevronRight />
                    </button>

                    <Swiper
                        modules={[
                            EffectCoverflow,
                            Pagination,
                            Autoplay,
                        ]}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        className="!overflow-visible"
                        effect="coverflow"
                        centeredSlides
                        grabCursor
                        watchSlidesProgress

                        loop={offers.length >= 5}

                        speed={700}

                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}

                        pagination={{
                            clickable: true,
                        }}

                        coverflowEffect={{
                            rotate: 0,
                            stretch: -120,
                            depth: 80,
                            modifier: 1,
                            scale: 0.65,
                            slideShadows: false,
                        }}

                        breakpoints={{
                            320: {
                                slidesPerView: 1.05,
                                spaceBetween: 10,
                            },

                            768: {
                                slidesPerView: 1.3,
                                spaceBetween: 20,
                            },

                            1024: {
                                slidesPerView: 1.6,
                                spaceBetween: 0,
                            },

                            1440: {
                                slidesPerView: 1.8,
                                spaceBetween: 0,
                            },

                            1700: {
                                slidesPerView: 2,
                                spaceBetween: 0,
                            },
                        }}
                    >
                        {offers.map((offer, index) => (
                            <SwiperSlide
                                key={`${offer.id}-${index}`}
                            >
                                <div className="mx-auto max-w-[760px] lg:max-w-[820px]">
                                    <OfferCard offer={offer} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>

            </div>

            <style jsx global>{`
  .swiper {
    overflow: visible !important;
    perspective: 1800px;
  }

  .swiper-wrapper {
    overflow: visible !important;
    align-items: center;
  }

  .swiper-slide {
    overflow: visible !important;
    transition: all 0.5s ease;
  }

  .swiper-slide-prev {
    transform: perspective(1800px) rotateY(28deg) scale(0.82) !important;
    opacity: 0.65;
  }

  .swiper-slide-next {
    transform: perspective(1800px) rotateY(-28deg) scale(0.82) !important;
    opacity: 0.65;
  }

  .swiper-slide-active {
    transform: perspective(1800px) rotateY(0deg) scale(1) !important;
    opacity: 1;
  }

  .swiper-pagination {
    margin-top: 28px;
    position: relative;
  }

  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: #d1d5db;
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    width: 34px;
    border-radius: 9999px;
    background: #f2a900;
  }
`}</style>

        </section>
    );
}