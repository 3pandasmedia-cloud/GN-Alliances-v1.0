"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Offer } from "./offers";

interface OfferCardProps {
  offer: Offer;
}

export default function OfferCard({ offer }: OfferCardProps) {
  const hasLink =
    !!offer.destinationUrl &&
    offer.destinationUrl.trim() !== "";

  const openOffer = async () => {
    if (!hasLink) return;

    try {
      // Record click
      await fetch(`/api/landing-offers/${offer.id}/click`, {
        method: "POST",
      });

      // Open merchant link
      window.open(
        offer.destinationUrl,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (err) {
      console.error(err);

      // Fallback
      window.open(
        offer.destinationUrl,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <motion.div
      whileHover={hasLink ? { scale: 1.01 } : undefined}
      transition={{ duration: 0.3 }}
      className={`rounded-[28px] ${
        hasLink ? "cursor-pointer" : "cursor-default"
      }`}
      onClick={openOffer}
    >
      <div className="relative w-full">

        <Image
          src={offer.image}
          alt={offer.merchant}
          width={1100}
          height={620}
          className="w-full rounded-3xl"
          priority
          unoptimized
        />

        {!hasLink && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/20">
            <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-700">
              Coming Soon
            </span>
          </div>
        )}

      </div>
    </motion.div>
  );
}